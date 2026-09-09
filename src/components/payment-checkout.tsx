import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CircleAlert,
  Clipboard,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useParams } from "@tanstack/react-router";

const API_URL = import.meta.env.VITE_API_URL ?? "https://shuvopaycom-production.up.railway.app/api/v1";

type Tab = "mobile" | "international";
type ProviderId = "bkash" | "nagad";
type Status = "idle" | "loading" | "success" | "error";

type Provider = {
  id: ProviderId;
  name: string;
  logo: string;
  accent: string;
};

type InvoiceData = {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  provider: string;
  receiver_account: string | null;
  status: string;
  expires_at: string;
};

const allProviders: Provider[] = [
  { id: "bkash", name: "bKash", logo: "/bkash.svg", accent: "provider-bkash" },
  { id: "nagad", name: "Nagad", logo: "/nagad.svg", accent: "provider-nagad" },
];

const internationalOptions = [
  { name: "Binance", initials: "B", address: "TRC20: TXxxxxxxxxxxxxxxxxxxxxxx", network: "Binance Pay / USDT TRC20" },
];

export function PaymentCheckout() {
  const [tab, setTab] = useState<Tab>("mobile");
  const [selected, setSelected] = useState<ProviderId | null>(null);
  const [screen, setScreen] = useState<"methods" | "instruction">("methods");
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [invoiceError, setInvoiceError] = useState("");

  const { invoiceId } = useParams({ strict: false });

  useEffect(() => {
    if (!invoiceId) { setLoading(false); return; }
    fetch(`${API_URL}/invoice/public/${invoiceId}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("Invoice not found");
        return r.json();
      })
      .then((data) => {
        setInvoice(data);
        if (data.provider) {
          const p = allProviders.find((x) => x.id === data.provider.toLowerCase());
          if (p) setSelected(p.id);
        }
      })
      .catch((e) => setInvoiceError(e.message))
      .finally(() => setLoading(false));
  }, [invoiceId]);

  const providers = invoice?.provider
    ? allProviders.filter((p) => p.id === invoice.provider.toLowerCase())
    : allProviders;

  const provider = allProviders.find((item) => item.id === selected);

  if (loading) {
    return (
      <main className="checkout-canvas min-h-dvh flex items-center justify-center">
        <LoaderCircle className="size-10 animate-spin text-primary" />
      </main>
    );
  }

  if (invoiceError || !invoice) {
    return (
      <main className="checkout-canvas min-h-dvh flex items-center justify-center px-4">
        <div className="glass-panel px-6 py-10 text-center max-w-sm w-full">
          <CircleAlert className="size-12 mx-auto text-error mb-3" />
          <h2 className="text-xl font-bold text-foreground">Invoice পাওয়া যায়নি</h2>
          <p className="text-sm text-muted-foreground mt-2">{invoiceError || "Invalid invoice link."}</p>
        </div>
      </main>
    );
  }

  if (invoice.status === "paid") {
    return (
      <main className="checkout-canvas min-h-dvh flex items-center justify-center px-4">
        <SuccessState invoiceNumber={invoice.invoice_number} onDone={() => window.close()} />
      </main>
    );
  }

  return (
    <main className="checkout-canvas min-h-dvh px-3 pb-32 pt-3 sm:px-6 sm:pt-6 md:pb-10">
      <div className="mx-auto w-full max-w-[780px]">
        {screen === "methods" ? (
          <div className="animate-page-in">
            <PaymentHeader />
            <MerchantCard invoice={invoice} />
            <PaymentTabs value={tab} onChange={setTab} />

            <section className="mt-6">
              <div className="mb-3 flex items-end justify-between px-1">
                <div>
                  <p className="text-xs font-bold uppercase text-primary">Choose a method</p>
                  <h2 className="mt-1 text-lg font-bold text-foreground">
                    {tab === "mobile" ? "Mobile banking" : "International Transfer"}
                  </h2>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <LockKeyhole className="size-3.5" /> Secure
                </span>
              </div>

              {tab === "mobile" ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {providers.map((item) => (
                    <PaymentMethodCard
                      key={item.id}
                      provider={item}
                      selected={selected === item.id}
                      onSelect={() => setSelected(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {internationalOptions.map((opt) => <InternationalCard key={opt.name} {...opt} />)}
                </div>
              )}
            </section>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-success" /> Your payment details stay protected
            </div>

            {tab === "mobile" && (
              <BottomPayBar
                enabled={selected !== null}
                amount={invoice.amount}
                onPay={() => selected && setScreen("instruction")}
              />
            )}
          </div>
        ) : (
          provider ? (
            <PaymentInstructionScreen
              provider={provider}
              invoice={invoice}
              onBack={() => setScreen("methods")}
            />
          ) : null
        )}
      </div>
    </main>
  );
}

function PaymentHeader({ instruction = false, onBack }: { instruction?: boolean; onBack?: () => void }) {
  return (
    <header className="glass-panel grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center px-3 sm:px-4">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <LockKeyhole className="size-3.5 text-success" /> Secure checkout
      </div>
      <Button variant="ghost" size="icon" onClick={onBack} className="icon-control">
        {instruction ? <ArrowLeft /> : <X />}
      </Button>
    </header>
  );
}

function MerchantCard({ invoice }: { invoice: InvoiceData }) {
  return (
    <section className="py-6 text-center sm:py-8">
      <img src="/shuvopay-logo.png" alt="ShuvoPay" className="mx-auto h-16 w-auto object-contain" />
      <div className="mx-auto mt-4 w-fit rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-soft">
        Invoice ID: <span className="text-foreground">{invoice.invoice_number}</span>
      </div>
    </section>
  );
}

function PaymentTabs({ value, onChange }: { value: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div className="grid grid-cols-2 rounded-2xl bg-secondary p-1.5" role="tablist">
      <Button role="tab" aria-selected={value === "mobile"} variant={value === "mobile" ? "tabActive" : "tab"} onClick={() => onChange("mobile")}>Mobile Banking</Button>
      <Button role="tab" aria-selected={value === "international"} variant={value === "international" ? "tabActive" : "tab"} onClick={() => onChange("international")}>International</Button>
    </div>
  );
}

function PaymentMethodCard({ provider, selected, onSelect }: { provider: Provider; selected: boolean; onSelect: () => void }) {
  return (
    <Button
      variant="paymentCard"
      className={cn("relative h-32 w-full flex-col overflow-hidden", selected && "payment-card-selected")}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="absolute right-2.5 top-2.5 rounded-full bg-secondary px-2 py-1 text-[9px] font-extrabold uppercase text-muted-foreground">Personal</span>
      {selected && (
        <span className="absolute left-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      )}
      <img src={provider.logo} alt={provider.name} className="mt-4 h-10 w-auto object-contain" />
    </Button>
  );
}

function InternationalCard({ name, initials, address, network }: (typeof internationalOptions)[number]) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border pb-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-yellow-400 text-xs font-black text-yellow-900">{initials}</span>
        <div><h3 className="truncate font-bold text-foreground">{name}</h3><p className="text-xs text-muted-foreground">{network}</p></div>
      </div>
      <dl className="mt-3 grid gap-2 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Address</dt>
          <dd className="mt-0.5 flex items-center justify-between gap-2 font-bold text-foreground break-all">
            <span className="text-xs">{address}</span>
            <Button variant="copy" size="icon" onClick={copy} className="shrink-0">
              {copied ? <Check /> : <Clipboard />}
            </Button>
          </dd>
        </div>
      </dl>
    </article>
  );
}

function BottomPayBar({ enabled, amount, onPay }: { enabled: boolean; amount: number; onPay: () => void }) {
  return (
    <div className="bottom-pay-shell fixed inset-x-0 bottom-0 z-20 border-t border-border p-3 sm:p-4 md:sticky md:mt-7 md:rounded-2xl md:border">
      <Button variant="pay" className="mx-auto h-14 w-full max-w-[748px]" disabled={!enabled} onClick={onPay}>
        <span>{enabled ? `Pay ৳${amount.toFixed(2)}` : "Select a payment method"}</span>
        {enabled && <ArrowLeft className="rotate-180" />}
      </Button>
    </div>
  );
}

function PaymentInstructionScreen({ provider, invoice, onBack }: { provider: Provider; invoice: InvoiceData; onBack: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [transactionId, setTransactionId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const verify = async () => {
    if (transactionId.trim().length < 6) { setStatus("error"); setErrorMsg("Transaction ID কমপক্ষে ৬ অক্ষরের হতে হবে।"); return; }
    setStatus("loading"); setErrorMsg("");
    try {
      const resp = await fetch(`${API_URL}/payment/verify-trx`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoice_id: invoice.id, transaction_id: transactionId.trim() }),
      });
      const data = await resp.json();
      if (data.status === "paid") { setStatus("success"); }
      else { setStatus("error"); setErrorMsg(data.message ?? "Transaction ID verify করা যায়নি।"); }
    } catch {
      setStatus("error"); setErrorMsg("সার্ভার error। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="animate-slide-in">
      <PaymentHeader instruction onBack={onBack} />
      <MerchantCard invoice={invoice} />
      {status === "success" ? (
        <SuccessState invoiceNumber={invoice.invoice_number} onDone={onBack} />
      ) : (
        <>
          <section className="mb-5 flex justify-center">
            <img src={provider.logo} alt={provider.name} className="h-12 w-auto object-contain" />
          </section>

          <section className={cn("instruction-card overflow-hidden rounded-3xl border border-border shadow-elevated", provider.accent)}>
            <div className="instruction-head px-5 py-5 text-center sm:px-7">
              <p className="text-xs font-bold uppercase opacity-75">শেষ ধাপ</p>
              <h2 className="mt-1 text-xl font-extrabold">পেমেন্ট তথ্য দিন</h2>
            </div>
            <div className="bg-card p-4 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {invoice.receiver_account && <AccountNumberRow number={invoice.receiver_account} />}
                <AmountSummary amount={`৳${invoice.amount.toFixed(2)}`} />
              </div>
              <ol className="mt-5 grid gap-3 text-sm text-foreground">
                {[
                  <span>আপনার <strong>{provider.name} App</strong> খুলুন</span>,
                  <span><strong>Send Money</strong> নির্বাচন করুন</span>,
                  <span>উপরে দেওয়া প্রাপক নম্বরটি ব্যবহার করুন</span>,
                  <span><strong>৳{invoice.amount.toFixed(2)}</strong> পেমেন্ট করুন</span>,
                  <span>পেমেন্ট শেষে <strong>Transaction ID</strong> দিন</span>,
                ].map((text, i) => (
                  <li key={i} className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-secondary text-[11px] font-black text-primary">{i + 1}</span>
                    <span className="pt-0.5 leading-5">{text}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5">
                <label htmlFor="transaction" className="mb-2 block text-sm font-bold text-foreground">ট্রানজেকশন আইডি দিন</label>
                <Input id="transaction" value={transactionId} onChange={(e) => { setTransactionId(e.target.value); if (status === "error") setStatus("idle"); }} placeholder="যেমন: 8N7A2C91XZ" autoComplete="off" className="h-14 rounded-xl bg-background px-4 font-semibold uppercase" />
              </div>
            </div>
          </section>

          {status === "error" && (
            <div role="alert" className="mt-3 flex items-center gap-2 rounded-xl border border-error/20 bg-error-soft px-4 py-3 text-sm font-semibold text-error">
              <CircleAlert className="size-4 shrink-0" /> {errorMsg}
            </div>
          )}

          <Button variant="verify" className="mt-4 h-14 w-full" disabled={status === "loading"} onClick={verify}>
            {status === "loading" ? <><LoaderCircle className="animate-spin" /> Checking…</> : <><BadgeCheck /> Verify</>}
          </Button>
        </>
      )}
    </div>
  );
}

function AccountNumberRow({ number }: { number: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard?.writeText(number.replaceAll(" ", "")); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  return (
    <div className="summary-box">
      <span className="text-xs text-muted-foreground">প্রাপক</span>
      <div className="mt-1 flex items-center justify-between gap-2">
        <strong className="text-base text-foreground">{number}</strong>
        <Button variant="copy" size="icon" onClick={copy}>{copied ? <Check /> : <Clipboard />}</Button>
      </div>
    </div>
  );
}

function AmountSummary({ amount }: { amount: string }) {
  return (
    <div className="summary-box">
      <span className="text-xs text-muted-foreground">Amount</span>
      <strong className="mt-1 block text-xl text-foreground">{amount}</strong>
    </div>
  );
}

function SuccessState({ invoiceNumber, onDone }: { invoiceNumber: string; onDone: () => void }) {
  return (
    <section className="glass-panel animate-page-in px-5 py-12 text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-full bg-success-soft text-success">
        <BadgeCheck className="size-10" />
      </span>
      <h2 className="mt-5 text-2xl font-extrabold text-foreground">Payment সফল!</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Invoice <strong>{invoiceNumber}</strong> এর payment সফলভাবে verify হয়েছে।
      </p>
      <Button variant="pay" className="mt-7 h-12 w-full sm:w-auto sm:px-12" onClick={onDone}>Done</Button>
    </section>
  );
}