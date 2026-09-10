import { useState, type ReactNode } from "react";
import {
  Activity as ActivityIcon,
  ArrowRight,
  BadgeCheck,
  Banknote,
  BellRing,
  Bot,
  Braces,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  CreditCard,
  FileCheck2,
  FilePlus2,
  Fingerprint,
  FolderKanban,
  Gauge,
  KeyRound,
  Landmark,
  LockKeyhole,
  Menu,
  PanelsTopLeft,
  RadioTower,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = ["Home", "Payments", "Transactions", "Invoices", "API", "Settings"];

const overviewStats = [
  { label: "Total Balance", value: "৳ 24,850.00", detail: "Available across projects", icon: WalletCards, tone: "primary" },
  { label: "Today's Received", value: "৳ 5,420.00", detail: "+12.8% from yesterday", icon: CircleDollarSign, tone: "success" },
  { label: "Verified Transactions", value: "128", detail: "All checks completed", icon: BadgeCheck, tone: "cyan" },
  { label: "Pending Payments", value: "07", detail: "Waiting for verification", icon: Clock3, tone: "warning" },
];

const workflow = [
  { label: "Payment Request", icon: CreditCard },
  { label: "Invoice Generated", icon: FilePlus2 },
  { label: "Customer Payment", icon: Smartphone },
  { label: "Transaction Detected", icon: RadioTower },
  { label: "Automatic Verification", icon: ShieldCheck },
  { label: "Balance Updated", icon: RefreshCcw },
];

const transactions = [
  { title: "Payment Received", amount: "৳500.00", provider: "bKash", status: "Verified", time: "10:38 PM", pending: false },
  { title: "Payment Received", amount: "৳1,200.00", provider: "Nagad", status: "Verified", time: "09:52 PM", pending: false },
  { title: "Payment Pending", amount: "৳850.00", provider: "Rocket", status: "Pending", time: "09:16 PM", pending: true },
];

const securityItems = [
  { label: "Secure Authentication", icon: LockKeyhole },
  { label: "Transaction Verification", icon: BadgeCheck },
  { label: "Protected API", icon: KeyRound },
  { label: "Real-Time Processing", icon: Zap },
  { label: "Private Access", icon: ShieldCheck },
];

const projects = [
  { title: "SMM Platform", description: "Payment & balance automation", icon: PanelsTopLeft },
  { title: "Telegram Bots", description: "Automated payment collection", icon: Bot },
  { title: "Digital Services", description: "Invoice and transaction management", icon: FolderKanban },
  { title: "Personal Projects", description: "Private payment workflows", icon: Braces },
];

const activities = [
  { title: "Payment received", time: "2 minutes ago", icon: Banknote },
  { title: "Invoice verified", time: "8 minutes ago", icon: FileCheck2 },
  { title: "Balance updated", time: "15 minutes ago", icon: RefreshCcw },
  { title: "API request completed", time: "24 minutes ago", icon: Code2 },
];

const codeRequest = `POST /api/v1/payment/create

{
  "amount": 500,
  "currency": "BDT",
  "reference": "ORDER_12345"
}`;

const codeResponse = `{
  "status": "success",
  "transaction_id": "TXN_839201",
  "payment_url": "/pay/..."
}`;

function sectionId(label: string) {
  return label.toLowerCase();
}

export function PaymentCheckout() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <PaymentOverview />
      <AutomationWorkflow />
      <Transactions />
      <Invoices />
      <ApiSection />
      <Security />
      <MyProjects />
      <Activity />
      <FinalCta />
      <Footer />
    </main>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5" aria-label="ShuvoPay home">
          <BrandMark />
          <span className="text-lg font-extrabold text-foreground">ShuvoPay</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${sectionId(item)}`} className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden h-10 sm:inline-flex">
            <a href="#overview">Dashboard <ArrowRight /></a>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <div className={cn("border-t border-border bg-card px-4 transition-all duration-300 lg:hidden", open ? "max-h-96 py-3 opacity-100" : "max-h-0 overflow-hidden py-0 opacity-0")}>
        <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${sectionId(item)}`} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
              {item}
            </a>
          ))}
          <Button asChild className="mt-2 w-full"><a href="#overview" onClick={() => setOpen(false)}>Dashboard <ArrowRight /></a></Button>
        </nav>
      </div>
    </header>
  );
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className={cn("grid size-9 place-items-center rounded-md shadow-brand", dark ? "bg-api-accent text-api" : "brand-gradient text-primary-foreground")}>
      <Fingerprint className="size-5" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="hero-grid relative scroll-mt-20 pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-8 lg:pb-28">
        <div className="max-w-2xl animate-rise">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-extrabold text-primary">
            <ShieldCheck className="size-4" /> PRIVATE PAYMENT SYSTEM
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Your Payments.<br /><span className="brand-text">Your Control.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A private payment automation system for managing invoices, transactions, verification and payment workflows across my own projects.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 w-full px-6 sm:w-auto"><a href="#overview">Open Dashboard <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-12 w-full px-6 sm:w-auto"><a href="#transactions">View Transactions</a></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
            <span className="flex items-center gap-2"><span className="status-dot" /> System operational</span>
            <span className="flex items-center gap-2"><LockKeyhole className="size-4 text-primary" /> Owner access only</span>
          </div>
        </div>
        <PaymentControlVisual />
      </div>
    </section>
  );
}

function PaymentControlVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[650px] animate-rise-late" aria-label="ShuvoPay payment control preview">
      <div className="control-frame">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5"><BrandMark /><div><p className="text-sm font-extrabold">ShuvoPay</p><p className="text-[11px] text-muted-foreground">Private control</p></div></div>
          <span className="flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success"><span className="status-dot" /> Live</span>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-[0.88fr_1.12fr] sm:p-5">
          <div className="rounded-lg bg-control-dark p-4 text-control-foreground shadow-deep">
            <div className="flex items-center justify-between"><p className="text-xs text-control-muted">Payment received</p><BadgeCheck className="size-5 text-control-success" /></div>
            <p className="mt-4 text-3xl font-extrabold">৳ 500.00</p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-control-success/15 px-2 py-1 text-[10px] font-bold text-control-success"><Check className="size-3" /> VERIFIED</span>
            <dl className="mt-6 grid gap-3 text-xs">
              <DataRow label="Transaction ID" value="TXN-SHUVO-83921" />
              <DataRow label="Payment method" value="bKash" />
              <DataRow label="Time" value="10:38 PM" />
            </dl>
          </div>
          <div className="grid gap-3">
            <MiniMetric label="Balance" value="৳ 24,850.00" icon={<WalletCards />} />
            <div className="grid grid-cols-2 gap-3">
              <MiniMetric label="Verified" value="128" icon={<BadgeCheck />} />
              <MiniMetric label="Pending" value="07" icon={<Clock3 />} />
            </div>
            <div className="rounded-lg border border-border bg-secondary/60 p-3">
              <div className="mb-2 flex items-center justify-between text-[11px] font-bold"><span>Weekly flow</span><span className="text-success">+18.4%</span></div>
              <div className="flex h-14 items-end gap-1.5" aria-hidden="true">{[34, 52, 43, 69, 58, 88, 75].map((height, index) => <span key={index} className="chart-bar" style={{ height: `${height}%` }} />)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-card float-card-left"><span className="grid size-8 place-items-center rounded-full bg-success-soft text-success"><BadgeCheck /></span><div><p className="text-xs font-bold">Payment Verified</p><p className="text-sm font-extrabold">৳ 1,250.00</p></div></div>
      <div className="float-card float-card-right"><span className="grid size-8 place-items-center rounded-md bg-primary-soft text-primary"><ReceiptText /></span><div><p className="text-xs font-bold">Invoice Created</p><p className="text-[11px] text-muted-foreground">#INV-20391</p></div></div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3 border-b border-control-border pb-2 last:border-0"><dt className="text-control-muted">{label}</dt><dd className="font-bold">{value}</dd></div>;
}

function MiniMetric({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return <div className="rounded-lg border border-border bg-card p-3 shadow-soft"><div className="flex items-center justify-between text-muted-foreground"><span className="text-[11px] font-semibold">{label}</span><span className="[&_svg]:size-4 [&_svg]:text-primary">{icon}</span></div><p className="mt-2 text-base font-extrabold">{value}</p></div>;
}

function SectionHeading({ eyebrow, title, copy, centered = false, inverse = false }: { eyebrow?: string; title: string; copy: string; centered?: boolean; inverse?: boolean }) {
  return <div className={cn("max-w-2xl", centered && "mx-auto text-center")}><p className={cn("text-xs font-extrabold uppercase text-primary", inverse && "text-api-accent")}>{eyebrow}</p><h2 className={cn("mt-3 text-3xl font-extrabold sm:text-4xl", inverse ? "text-api-foreground" : "text-foreground")}>{title}</h2><p className={cn("mt-4 text-base leading-7", inverse ? "text-api-muted" : "text-muted-foreground")}>{copy}</p></div>;
}

export function PaymentOverview() {
  return (
    <section id="overview" className="section-pad scroll-mt-20 bg-card">
      <div className="section-shell"><SectionHeading eyebrow="Private overview" title="My Payment System" copy="Everything I need to monitor and control my payment workflow from one place." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{overviewStats.map(({ icon: Icon, ...item }) => <article key={item.label} className="metric-card"><div className={cn("metric-icon", `metric-${item.tone}`)}><Icon /></div><p className="mt-5 text-sm font-semibold text-muted-foreground">{item.label}</p><p className="mt-2 text-2xl font-extrabold">{item.value}</p><p className="mt-3 text-xs text-muted-foreground">{item.detail}</p></article>)}</div>
      </div>
    </section>
  );
}

export function AutomationWorkflow() {
  return (
    <section id="payments" className="section-pad scroll-mt-20"><div className="section-shell"><SectionHeading eyebrow="Automation engine" title="Automated Payment Workflow" copy="A controlled flow from payment request to a verified, updated balance." centered />
      <div className="mt-12 grid gap-3 md:grid-cols-3 xl:grid-cols-6">{workflow.map(({ label, icon: Icon }, index) => <div key={label} className="relative"><article className="workflow-step"><span>{String(index + 1).padStart(2, "0")}</span><div className="workflow-icon"><Icon /></div><h3>{label}</h3></article>{index < workflow.length - 1 && <ChevronRight className="workflow-arrow" />}</div>)}</div>
    </div></section>
  );
}

export function Transactions() {
  return (
    <section id="transactions" className="section-pad scroll-mt-20 bg-card"><div className="section-shell grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]"><div><SectionHeading eyebrow="Live ledger" title="Recent Transactions" copy="A concise view of incoming activity across my connected payment workflows." /><Button asChild variant="outline" className="mt-7"><a href="#transactions">View All Transactions <ArrowRight /></a></Button></div>
      <div className="data-panel"><div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6"><div><p className="font-bold">Transaction feed</p><p className="text-xs text-muted-foreground">Updated moments ago</p></div><Button variant="ghost" size="icon" aria-label="Refresh transactions"><RefreshCcw /></Button></div>
        <div>{transactions.map((item) => <article key={`${item.amount}-${item.provider}`} className="transaction-row"><span className={cn("transaction-status", item.pending && "is-pending")}>{item.pending ? <Clock3 /> : <Check />}</span><div className="min-w-0"><h3 className="truncate text-sm font-bold">{item.title}</h3><p className="text-xs text-muted-foreground">{item.provider} · {item.time}</p></div><div className="text-right"><p className="text-sm font-extrabold">{item.amount}</p><p className={cn("text-xs font-bold text-success", item.pending && "text-warning")}>{item.status}</p></div></article>)}</div>
      </div></div></section>
  );
}

export function Invoices() {
  return (
    <section id="invoices" className="section-pad scroll-mt-20"><div className="section-shell grid items-center gap-12 lg:grid-cols-2"><div className="invoice-stage"><div className="invoice-card"><div className="flex items-start justify-between border-b border-border pb-5"><div><div className="flex items-center gap-2"><BrandMark /><strong>SHUVOPAY</strong></div><p className="mt-3 text-xs text-muted-foreground">Private payment invoice</p></div><span className="rounded-full bg-success-soft px-3 py-1 text-xs font-extrabold text-success">PAID</span></div><dl className="mt-6 grid gap-4"><InvoiceRow label="Invoice" value="#INV-20391" /><InvoiceRow label="Amount" value="৳1,500.00" large /><InvoiceRow label="Transaction" value="TXN-849201" /><InvoiceRow label="Issued by" value="ShuvoPay" /></dl><div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Verified by private automation</div></div></div>
      <div><SectionHeading eyebrow="Invoice control" title="Simple Invoice Management" copy="Create, track and verify payment invoices from a single private workspace." /><div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold text-muted-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-success" /> Automatic status</span><span className="flex items-center gap-2"><Check className="size-4 text-success" /> Linked transactions</span></div><Button asChild className="mt-8 h-11"><a href="#invoices">Create Invoice <ArrowRight /></a></Button></div>
    </div></section>
  );
}

function InvoiceRow({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return <div className="flex items-end justify-between gap-4"><dt className="text-sm text-muted-foreground">{label}</dt><dd className={cn("text-sm font-bold", large && "text-2xl font-extrabold text-primary")}>{value}</dd></div>;
}

export function ApiSection() {
  return (
    <section id="api" className="scroll-mt-20 bg-api py-20 sm:py-28"><div className="section-shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionHeading eyebrow="Developer interface" title="Payment Automation API" copy="Connect my own projects with ShuvoPay through a simple API." inverse /><div className="mt-6 flex items-center gap-2 text-sm text-api-muted"><LockKeyhole className="size-4 text-api-accent" /> Private endpoints · authenticated access</div><Button asChild className="mt-8 bg-api-accent text-api hover:bg-api-accent/90"><a href="#api">API Documentation <ArrowRight /></a></Button></div>
      <div className="code-window"><div className="flex items-center justify-between border-b border-api-border px-4 py-3"><div className="flex gap-1.5"><span className="code-dot" /><span className="code-dot" /><span className="code-dot" /></div><span className="text-[10px] font-bold uppercase text-api-muted">Private API · v1</span></div><div className="grid gap-6 p-4 sm:p-6"><CodeBlock label="Request" code={codeRequest} /><CodeBlock label="Response" code={codeResponse} success /></div></div>
    </div></section>
  );
}

function CodeBlock({ label, code, success = false }: { label: string; code: string; success?: boolean }) {
  return <div><p className={cn("mb-2 text-[10px] font-extrabold uppercase text-api-accent", success && "text-control-success")}>{label}</p><pre className="overflow-x-auto text-xs leading-6 text-code sm:text-sm"><code>{code}</code></pre></div>;
}

export function Security() {
  return (
    <section id="settings" className="section-pad scroll-mt-20 bg-card"><div className="section-shell"><SectionHeading eyebrow="Access protection" title="Private. Secure. Controlled." copy="Designed as a private payment infrastructure for my own digital ecosystem." centered /><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{securityItems.map(({ label, icon: Icon }) => <article key={label} className="security-item"><span><Icon /></span><h3>{label}</h3></article>)}</div></div></section>
  );
}

export function MyProjects() {
  return (
    <section className="section-pad"><div className="section-shell"><SectionHeading eyebrow="Private ecosystem" title="My Projects" copy="ShuvoPay keeps payment activity organized across the digital products I operate." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{projects.map(({ title, description, icon: Icon }) => <article key={title} className="project-card"><div className="project-icon"><Icon /></div><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p><a href="#overview" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2">Open <ArrowRight className="size-4" /></a></article>)}</div></div></section>
  );
}

export function Activity() {
  return (
    <section className="section-pad bg-card"><div className="section-shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionHeading eyebrow="Private monitoring" title="System Activity" copy="A clear, real-time trail of the payment engine working across my projects." /><div className="mt-7 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-bold text-success"><ActivityIcon className="size-4" /> All systems operational</div></div><div className="activity-panel">{activities.map(({ title, time, icon: Icon }, index) => <article key={title} className="activity-row"><div className="activity-rail"><span><Icon /></span>{index < activities.length - 1 && <i />}</div><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{time}</p></div><span className="ml-auto status-dot" /></article>)}</div></div></section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24"><div className="cta-panel mx-auto max-w-7xl overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20"><div className="mx-auto grid size-12 place-items-center rounded-lg bg-primary-foreground/15 text-primary-foreground"><Gauge /></div><h2 className="mt-6 text-3xl font-extrabold text-primary-foreground sm:text-5xl">Everything Under My Control.</h2><p className="mx-auto mt-4 max-w-xl text-base leading-7 text-primary-foreground/75">One private payment system for my own projects, transactions and automation.</p><Button asChild variant="secondary" size="lg" className="mt-8 h-12 w-full sm:w-auto"><a href="#overview">Open ShuvoPay Dashboard <ArrowRight /></a></Button></div></section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card"><div className="section-shell grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-start"><div><div className="flex items-center gap-2.5"><BrandMark /><span className="text-lg font-extrabold">ShuvoPay</span></div><p className="mt-4 text-sm text-muted-foreground">Private Payment Automation System</p><p className="mt-2 text-sm font-semibold">Developed by Shuvo Ahmed</p></div><nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold text-muted-foreground sm:grid-cols-5">{["Dashboard", "Transactions", "Invoices", "API", "Settings"].map((item) => <a key={item} href={item === "Dashboard" ? "#overview" : `#${item.toLowerCase()}`} className="hover:text-primary">{item}</a>)}</nav></div><div className="border-t border-border"><div className="section-shell flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 ShuvoPay. Personal Project.</p><p className="flex items-center gap-1.5"><Fingerprint className="size-3.5" /> Private access by Shuvo Ahmed</p></div></div></footer>
  );
}