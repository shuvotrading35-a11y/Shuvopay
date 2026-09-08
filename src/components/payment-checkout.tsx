import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Check,
  CircleAlert,
  CircleHelp,
  Clipboard,
  Headphones,
  Home,
  Info,
  Landmark,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Tab = "mobile" | "bank";
type ProviderId = "bkash" | "nagad" | "cellfin" | "rocket";
type Status = "idle" | "loading" | "success" | "error";

type Provider = {
  id: ProviderId;
  name: string;
  mark: string;
  account: string;
  accent: string;
};

const providers: Provider[] = [
  { id: "bkash", name: "bKash", mark: "b", account: "01929 014 479", accent: "provider-bkash" },
  { id: "nagad", name: "Nagad", mark: "N", account: "01848 721 650", accent: "provider-nagad" },
  { id: "cellfin", name: "CellFin", mark: "C", account: "01712 880 249", accent: "provider-cellfin" },
  { id: "rocket", name: "Rocket", mark: "R", account: "01632 451 906", accent: "provider-rocket" },
];

const banks = [
  { bank: "BRAC Bank PLC", initials: "BR", name: "Orbit Digital Services", number: "1501 2088 9031", branch: "Gulshan Avenue" },
  { bank: "City Bank PLC", initials: "CB", name: "Orbit Digital Services", number: "1103 9975 4201", branch: "Banani" },
];

export function PaymentCheckout() {
  const [tab, setTab] = useState<Tab>("mobile");
  const [selected, setSelected] = useState<ProviderId | null>(null);
  const [screen, setScreen] = useState<"methods" | "instruction">("methods");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const provider = providers.find((item) => item.id === selected);

  return (
    <main className="checkout-canvas min-h-dvh px-3 pb-40 pt-3 sm:px-6 sm:pt-6 md:pb-10">
      <div className="mx-auto w-full max-w-[780px]">
        {screen === "methods" ? (
          <div className="animate-page-in">
            <PaymentHeader />
            <MerchantCard />
            <PaymentTabs value={tab} onChange={setTab} />

            <section className="mt-6" aria-labelledby="payment-options-title">
              <div className="mb-3 flex items-end justify-between px-1">
                <div>
                  <p className="text-xs font-bold uppercase text-primary">Choose a method</p>
                  <h2 id="payment-options-title" className="mt-1 text-lg font-bold text-foreground">
                    {tab === "mobile" ? "Mobile banking" : "Direct bank transfer"}
                  </h2>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <LockKeyhole className="size-3.5" /> Secure
                </span>
              </div>

              {loading ? (
                <LoadingState />
              ) : tab === "mobile" ? (
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
                  {banks.map((bank) => <BankTransferCard key={bank.number} {...bank} />)}
                </div>
              )}
            </section>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-success" /> Your payment details stay protected
            </div>

            {tab === "mobile" && (
              <BottomPayBar
                enabled={selected !== null}
                onPay={() => selected && setScreen("instruction")}
              />
            )}
          </div>
        ) : (
          provider ? <PaymentInstructionScreen provider={provider} onBack={() => setScreen("methods")} /> : null
        )}
      </div>
    </main>
  );
}

export function PaymentHeader({ instruction = false, onBack }: { instruction?: boolean; onBack?: () => void }) {
  return (
    <header className="glass-panel grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center px-3 sm:px-4">
      <Button variant="ghost" size="icon" aria-label={instruction ? "Go home" : "Home"} className="icon-control">
        <Home />
      </Button>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground sm:flex">
          <LockKeyhole className="size-3.5 text-success" /> Secure checkout
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={instruction ? "Back to payment methods" : "Close checkout"}
          onClick={onBack}
          className="icon-control"
        >
          {instruction ? <ArrowLeft /> : <X />}
        </Button>
      </div>
    </header>
  );
}

export function MerchantCard({ invoice }: { invoice?: string }) {
  return (
    <section className="py-6 text-center sm:py-8" aria-label="Merchant information">
      <div className="merchant-logo mx-auto" aria-hidden="true">
        <span>O</span><i />
      </div>
      <h1 className="mt-3 text-xl font-extrabold text-foreground sm:text-2xl">Orbit Digital</h1>
      <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">SMM Panel</p>
      {invoice ? (
        <div className="mx-auto mt-4 w-fit rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground shadow-soft">
          Invoice ID: <span className="text-foreground">{invoice}</span>
        </div>
      ) : (
        <div className="mt-5 flex justify-center gap-2">
          <SupportButton />
          <InfoButton />
        </div>
      )}
    </section>
  );
}

export function SupportButton() {
  return <Button variant="soft" size="sm"><Headphones /> Support</Button>;
}

export function InfoButton() {
  return <Button variant="soft" size="sm"><Info /> Information</Button>;
}

export function PaymentTabs({ value, onChange }: { value: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div className="grid grid-cols-2 rounded-2xl bg-secondary p-1.5" role="tablist" aria-label="Payment type">
      <Button role="tab" aria-selected={value === "mobile"} variant={value === "mobile" ? "tabActive" : "tab"} onClick={() => onChange("mobile")}>
        Mobile Banking
      </Button>
      <Button role="tab" aria-selected={value === "bank"} variant={value === "bank" ? "tabActive" : "tab"} onClick={() => onChange("bank")}>
        Bank Transfer
      </Button>
    </div>
  );
}

export function PaymentMethodCard({ provider, selected, onSelect }: { provider: Provider; selected: boolean; onSelect: () => void }) {
  return (
    <Button
      variant="paymentCard"
      className={cn("relative h-24 w-full flex-col overflow-hidden", selected && "payment-card-selected")}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="absolute right-2.5 top-2.5 rounded-full bg-secondary px-2 py-1 text-[9px] font-extrabold uppercase text-muted-foreground">Personal</span>
      {selected && <span className="absolute left-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3" /></span>}
      <ProviderLogo provider={provider} compact />
    </Button>
  );
}

function ProviderLogo({ provider, compact = false }: { provider: Provider; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", compact && "mt-4")}>
      <span className={cn("provider-mark", provider.accent, compact ? "size-10 text-xl" : "size-16 text-3xl")}>{provider.mark}</span>
      <span className={cn("font-black text-foreground", compact ? "text-lg" : "text-2xl")}>{provider.name}</span>
    </div>
  );
}

export function BankTransferCard({ bank, initials, name, number, branch }: (typeof banks)[number]) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(number.replaceAll(" ", ""));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border pb-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-xs font-black text-primary-foreground">{initials}</span>
        <div className="min-w-0"><h3 className="truncate font-bold text-foreground">{bank}</h3><p className="text-xs text-muted-foreground">Savings account</p></div>
      </div>
      <dl className="mt-3 grid gap-2 text-sm">
        <div><dt className="text-xs text-muted-foreground">Account name</dt><dd className="font-semibold text-foreground">{name}</dd></div>
        <div><dt className="text-xs text-muted-foreground">Account number</dt><dd className="mt-0.5 flex items-center justify-between gap-2 font-bold text-foreground"><span>{number}</span><Button variant="copy" size="icon" onClick={copy} aria-label="Copy account number">{copied ? <Check /> : <Clipboard />}</Button></dd></div>
        <div><dt className="text-xs text-muted-foreground">Branch</dt><dd className="font-semibold text-foreground">{branch}</dd></div>
      </dl>
    </article>
  );
}

export function BottomPayBar({ enabled, onPay }: { enabled: boolean; onPay: () => void }) {
  return (
    <div className="bottom-pay-shell fixed inset-x-0 bottom-0 z-20 border-t border-border p-3 sm:p-4 md:sticky md:mt-7 md:rounded-2xl md:border">
      <Button variant="pay" className="mx-auto h-14 w-full max-w-[748px]" disabled={!enabled} onClick={onPay}>
        <span>{enabled ? "Pay ৳405.00" : "Select a payment method"}</span>
        {enabled && <ArrowLeft className="rotate-180" />}
      </Button>
    </div>
  );
}

function PaymentInstructionScreen({ provider, onBack }: { provider: Provider; onBack: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [transactionId, setTransactionId] = useState("");

  const verify = () => {
    if (transactionId.trim().length < 6) { setStatus("error"); return; }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <div className="animate-slide-in">
      <PaymentHeader instruction onBack={onBack} />
      <MerchantCard invoice="OR8F-29K6-14" />
      {status === "success" ? <SuccessState onDone={onBack} /> : (
        <>
          <section className="mb-5 flex justify-center" aria-label={`${provider.name} payment`}><ProviderLogo provider={provider} /></section>
          <PaymentInstructionCard provider={provider} transactionId={transactionId} onTransactionChange={(value) => { setTransactionId(value); if (status === "error") setStatus("idle"); }} />
          {status === "error" && <ErrorState />}
          <VerifyButton status={status} onClick={verify} />
          <p className="mt-3 text-center text-xs text-muted-foreground">Demo only — no transaction will be processed.</p>
        </>
      )}
    </div>
  );
}

export function PaymentInstructionCard({ provider, transactionId, onTransactionChange }: { provider: Provider; transactionId: string; onTransactionChange: (value: string) => void }) {
  return (
    <section className={cn("instruction-card overflow-hidden rounded-3xl border border-border shadow-elevated", provider.accent)}>
      <div className="instruction-head px-5 py-5 text-center sm:px-7">
        <p className="text-xs font-bold uppercase opacity-75">শেষ ধাপ</p>
        <h2 className="mt-1 text-xl font-extrabold">পেমেন্ট তথ্য দিন</h2>
      </div>
      <div className="bg-card p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2"><AccountNumberRow number={provider.account} /><AmountSummary amount="৳405.00" /></div>
        <ol className="mt-5 grid gap-3 text-sm text-foreground">
          {[<>আপনার <strong>{provider.name} App</strong> খুলুন</>, <><strong>Send Money</strong> নির্বাচন করুন</>, <>উপরে দেওয়া প্রাপক নম্বরটি ব্যবহার করুন</>, <><strong>৳405.00</strong> পেমেন্ট করুন</>, <>পেমেন্ট শেষে <strong>Transaction ID</strong> দিন</>].map((text, index) => (
            <li key={index} className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-2.5"><span className="grid size-6 place-items-center rounded-full bg-secondary text-[11px] font-black text-primary">{index + 1}</span><span className="pt-0.5 leading-5">{text}</span></li>
          ))}
        </ol>
        <TransactionInput value={transactionId} onChange={onTransactionChange} />
      </div>
    </section>
  );
}

export function AccountNumberRow({ number }: { number: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard?.writeText(number.replaceAll(" ", "")); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  return (
    <div className="summary-box"><span className="text-xs text-muted-foreground">প্রাপক</span><div className="mt-1 flex items-center justify-between gap-2"><strong className="text-base text-foreground">{number}</strong><Button variant="copy" size="icon" onClick={copy} aria-label="Copy recipient number">{copied ? <Check /> : <Clipboard />}</Button></div></div>
  );
}

export function AmountSummary({ amount }: { amount: string }) {
  return <div className="summary-box"><span className="text-xs text-muted-foreground">Amount</span><strong className="mt-1 block text-xl text-foreground">{amount}</strong></div>;
}

export function TransactionInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="mt-5"><label htmlFor="transaction" className="mb-2 block text-sm font-bold text-foreground">ট্রানজেকশন আইডি দিন</label><Input id="transaction" value={value} onChange={(event) => onChange(event.target.value)} placeholder="যেমন: 8N7A2C91XZ" autoComplete="off" className="h-14 rounded-xl bg-background px-4 font-semibold uppercase" /></div>;
}

export function VerifyButton({ status, onClick }: { status: Status; onClick: () => void }) {
  return <Button variant="verify" className="mt-4 h-14 w-full" disabled={status === "loading"} onClick={onClick}>{status === "loading" ? <><LoaderCircle className="animate-spin" /> Checking…</> : <><BadgeCheck /> Verify</>}</Button>;
}

export function SuccessState({ onDone }: { onDone: () => void }) {
  return <section className="glass-panel animate-page-in px-5 py-12 text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-success-soft text-success"><BadgeCheck className="size-10" /></span><h2 className="mt-5 text-2xl font-extrabold text-foreground">Payment submitted</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Your demo payment details have been received successfully.</p><Button variant="pay" className="mt-7 h-12 w-full sm:w-auto sm:px-12" onClick={onDone}>Done</Button></section>;
}

export function ErrorState() {
  return <div role="alert" className="mt-3 flex items-center gap-2 rounded-xl border border-error/20 bg-error-soft px-4 py-3 text-sm font-semibold text-error"><CircleAlert className="size-4 shrink-0" /> Enter at least 6 characters to continue.</div>;
}

export function LoadingState() {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Loading payment methods">{[0,1,2,3].map((item) => <div key={item} className="h-32 rounded-2xl border border-border bg-card p-4"><Skeleton className="ml-auto h-4 w-14" /><div className="mt-7 flex items-center justify-center gap-2"><Skeleton className="size-10 rounded-xl" /><Skeleton className="h-5 w-16" /></div></div>)}</div>;
}
