import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, ArrowLeftRight, BookOpen, FileText, Receipt,
  Users, AlertTriangle, BarChart3, Settings, Mountain, Plus,
  Search, Download, RefreshCw, Wrench, Repeat, Play, Mail,
  Clock, Landmark, FileSpreadsheet, ChevronRight, TrendingUp,
  TrendingDown, DollarSign, CheckCircle2, X, Bell
} from "lucide-react";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "ledger", label: "Ledger", icon: BookOpen },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "receipts", label: "Payment Receipts", icon: Receipt },
  { id: "customers", label: "Customer List", icon: Users },
  { id: "aging", label: "AR Aging", icon: AlertTriangle },
  { id: "sales", label: "Sales Report", icon: BarChart3 },
  { id: "pnl", label: "Monthly P&L", icon: TrendingUp },
  { id: "settings", label: "Business Setup", icon: Settings },
];

const AUTOMATIONS = [
  { id: "ledger-update", label: "Update Ledger Now", icon: RefreshCw },
  { id: "fix-balance", label: "Fix Running Balance", icon: Wrench },
  { id: "manage-recurring", label: "Manage Recurring Invoices", icon: Repeat },
  { id: "run-recurring", label: "Run Recurring Invoices Now", icon: Play },
  { id: "send-reminders", label: "Send Overdue Reminders Now", icon: Mail },
  { id: "daily-automation", label: "Enable Daily Automation", icon: Clock },
  { id: "import-bank", label: "Import Bank Statement (CSV)", icon: Landmark },
  { id: "refresh-1099", label: "Refresh 1099 Summary", icon: FileSpreadsheet },
  { id: "export-1099", label: "Export 1099 Summary PDF", icon: Download },
];

const seedCustomers = [
  { id: "C-001", name: "Northgate Logistics", email: "billing@northgatelog.com", balance: 4820.00, invoices: 6 },
  { id: "C-002", name: "Bluepeak Retail Co.", email: "ap@bluepeakretail.com", balance: 1250.50, invoices: 3 },
  { id: "C-003", name: "Summit Legal Group", email: "finance@summitlegal.com", balance: 0.00, invoices: 9 },
  { id: "C-004", name: "Harbor & Vine Cafe", email: "owner@harborvine.com", balance: 640.00, invoices: 2 },
  { id: "C-005", name: "Redline Motors LLC", email: "accounts@redlinemotors.com", balance: 9100.75, invoices: 11 },
];

const seedInvoices = [
  { id: "INV-1042", customer: "Northgate Logistics", date: "2026-08-18", due: "2026-09-17", items: 4, tax: 96.40, shipping: 25.00, total: 1521.40, status: "Overdue" },
  { id: "INV-1041", customer: "Redline Motors LLC", date: "2026-08-12", due: "2026-09-11", items: 7, tax: 210.00, shipping: 0.00, total: 3110.00, status: "Overdue" },
  { id: "INV-1040", customer: "Bluepeak Retail Co.", date: "2026-08-20", due: "2026-09-19", items: 2, tax: 40.50, shipping: 15.00, total: 655.50, status: "Sent" },
  { id: "INV-1039", customer: "Summit Legal Group", date: "2026-08-05", due: "2026-09-04", items: 1, tax: 0.00, shipping: 0.00, total: 2400.00, status: "Paid" },
  { id: "INV-1038", customer: "Harbor & Vine Cafe", date: "2026-08-22", due: "2026-09-21", items: 3, tax: 32.00, shipping: 0.00, total: 640.00, status: "Sent" },
];

const seedTxns = [
  { id: "T-3301", date: "2026-08-24", desc: "Invoice payment — Summit Legal Group", type: "Credit", account: "AR", amount: 2400.00 },
  { id: "T-3300", date: "2026-08-23", desc: "AWS infrastructure — hosting cost", type: "Debit", account: "Operating Exp.", amount: -890.20 },
  { id: "T-3299", date: "2026-08-22", desc: "Invoice issued — Harbor & Vine Cafe", type: "Debit", account: "AR", amount: 640.00 },
  { id: "T-3298", date: "2026-08-21", desc: "Payroll run", type: "Debit", account: "Payroll", amount: -12400.00 },
  { id: "T-3297", date: "2026-08-20", desc: "Invoice issued — Bluepeak Retail Co.", type: "Debit", account: "AR", amount: 655.50 },
  { id: "T-3296", date: "2026-08-18", desc: "Software subscriptions", type: "Debit", account: "Operating Exp.", amount: -340.00 },
];

const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function StatusPill({ status }) {
  const map = {
    Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Sent: "bg-blue-50 text-blue-700 ring-blue-200",
    Overdue: "bg-red-50 text-red-700 ring-red-200",
    Draft: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${map[status] || map.Draft}`}>
      {status}
    </span>
  );
}

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0F1B2D] text-white px-5 py-3.5 rounded-xl shadow-2xl ring-1 ring-white/10 animate-[fadein_0.2s_ease-out]">
      <CheckCircle2 size={18} className="text-[#3BAE7A] shrink-0" />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/50 hover:text-white"><X size={14} /></button>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        {eyebrow && <div className="text-xs font-bold tracking-widest text-[#1E5A8A] uppercase mb-1">{eyebrow}</div>}
        <h1 className="text-2xl font-bold text-[#0F1B2D]" style={{ fontFamily: "Sora, sans-serif" }}>{title}</h1>
      </div>
      {action}
    </div>
  );
}

function MetricCard({ label, value, delta, deltaPositive, icon: Icon }) {
  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82C4]/10 to-[#1E5A8A]/5" />
      <div className="flex items-center justify-between mb-3 relative">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-[#0F1B2D]/5 flex items-center justify-center">
          <Icon size={15} className="text-[#1E5A8A]" />
        </div>
      </div>
      <div className="text-2xl font-bold text-[#0F1B2D] relative" style={{ fontFamily: "Sora, sans-serif" }}>{value}</div>
      {delta && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${deltaPositive ? "text-emerald-600" : "text-red-600"}`}>
          {deltaPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {delta}
        </div>
      )}
    </Card>
  );
}

function AutomationBar({ onRun }) {
  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Mountain size={14} className="text-[#1E5A8A]" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quick Automations</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {AUTOMATIONS.map((a) => (
          <button
            key={a.id}
            onClick={() => onRun(a.label)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-[#0F1B2D] hover:text-white text-slate-700 text-xs font-semibold ring-1 ring-slate-200 transition-colors duration-150"
          >
            <a.icon size={13} />
            {a.label}
          </button>
        ))}
      </div>
    </Card>
  );
}

function DataTable({ columns, rows, onExport, renderRow }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5 ring-1 ring-slate-200 w-64">
          <Search size={14} className="text-slate-400" />
          <input placeholder="Search..." className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400" />
        </div>
        {onExport && (
          <button onClick={onExport} className="flex items-center gap-1.5 text-xs font-semibold text-[#1E5A8A] hover:text-[#0F1B2D] px-3 py-1.5 rounded-lg hover:bg-slate-50">
            <Download size={13} /> Export PDF
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
              {columns.map((c) => <th key={c} className="px-5 py-3 whitespace-nowrap">{c}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map(renderRow)}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Dashboard({ notify }) {
  const totalAR = seedCustomers.reduce((s, c) => s + c.balance, 0);
  const overdueCount = seedInvoices.filter(i => i.status === "Overdue").length;

  return (
    <>
      <SectionHeader eyebrow="Overview" title="Dashboard" />
      <AutomationBar onRun={notify} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Revenue (MTD)" value={fmt(18420.30)} delta="+12.4% vs last month" deltaPositive icon={DollarSign} />
        <MetricCard label="Accounts Receivable" value={fmt(totalAR)} delta={`${overdueCount} invoices overdue`} deltaPositive={false} icon={AlertTriangle} />
        <MetricCard label="Net Profit (MTD)" value={fmt(5210.10)} delta="+3.1% vs last month" deltaPositive icon={TrendingUp} />
        <MetricCard label="Active Customers" value={seedCustomers.length} delta="+1 this month" deltaPositive icon={Users} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-[#0F1B2D]">Recent Transactions</span>
            <ChevronRight size={16} className="text-slate-400" />
          </div>
          <div className="space-y-1">
            {seedTxns.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div>
                  <div className="text-sm font-medium text-[#0F1B2D]">{t.desc}</div>
                  <div className="text-xs text-slate-400">{t.date} · {t.account}</div>
                </div>
                <div className={`text-sm font-bold ${t.amount >= 0 ? "text-emerald-600" : "text-slate-700"}`}>
                  {t.amount >= 0 ? "+" : ""}{fmt(t.amount)}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <span className="text-sm font-bold text-[#0F1B2D] block mb-4">Overdue Invoices</span>
          <div className="space-y-3">
            {seedInvoices.filter(i => i.status === "Overdue").map((inv) => (
              <div key={inv.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#0F1B2D]">{inv.customer}</div>
                  <div className="text-xs text-slate-400">{inv.id} · due {inv.due}</div>
                </div>
                <div className="text-sm font-bold text-red-600">{fmt(inv.total)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function Transactions({ notify }) {
  return (
    <>
      <SectionHeader eyebrow="Money Movement" title="Transactions" action={
        <button onClick={() => notify("New transaction added")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Plus size={15} /> New Transaction
        </button>
      } />
      <DataTable
        columns={["ID", "Date", "Description", "Account", "Type", "Amount"]}
        rows={seedTxns}
        renderRow={(t) => (
          <tr key={t.id} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{t.id}</td>
            <td className="px-5 py-3.5 text-slate-600">{t.date}</td>
            <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{t.desc}</td>
            <td className="px-5 py-3.5 text-slate-600">{t.account}</td>
            <td className="px-5 py-3.5">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.type === "Credit" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{t.type}</span>
            </td>
            <td className={`px-5 py-3.5 font-bold ${t.amount >= 0 ? "text-emerald-600" : "text-slate-700"}`}>{t.amount >= 0 ? "+" : ""}{fmt(t.amount)}</td>
          </tr>
        )}
      />
    </>
  );
}

function Ledger({ notify }) {
  let running = 24500;
  const rows = seedTxns.slice().reverse().map(t => {
    running += t.amount;
    return { ...t, balance: running };
  }).reverse();

  return (
    <>
      <SectionHeader eyebrow="General Ledger" title="Ledger" action={
        <button onClick={() => notify("Ledger refreshed — running balance recalculated")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <RefreshCw size={14} /> Update Ledger Now
        </button>
      } />
      <DataTable
        columns={["Date", "Description", "Account", "Debit", "Credit", "Running Balance"]}
        rows={rows}
        renderRow={(t) => (
          <tr key={t.id} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 text-slate-600">{t.date}</td>
            <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{t.desc}</td>
            <td className="px-5 py-3.5 text-slate-600">{t.account}</td>
            <td className="px-5 py-3.5 text-slate-700">{t.amount < 0 ? fmt(-t.amount) : "—"}</td>
            <td className="px-5 py-3.5 text-emerald-600">{t.amount >= 0 ? fmt(t.amount) : "—"}</td>
            <td className="px-5 py-3.5 font-bold text-[#0F1B2D]">{fmt(t.balance)}</td>
          </tr>
        )}
      />
    </>
  );
}

function Invoices({ notify }) {
  return (
    <>
      <SectionHeader eyebrow="Billing" title="Invoices" action={
        <button onClick={() => notify("New invoice draft created")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Plus size={15} /> New Invoice
        </button>
      } />
      <DataTable
        columns={["Invoice #", "Customer", "Date", "Due", "Items", "Tax", "Shipping", "Total", "Status", ""]}
        rows={seedInvoices}
        onExport={() => notify("Invoice batch exported as PDF")}
        renderRow={(inv) => (
          <tr key={inv.id} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 font-mono text-xs font-semibold text-[#1E5A8A]">{inv.id}</td>
            <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{inv.customer}</td>
            <td className="px-5 py-3.5 text-slate-600">{inv.date}</td>
            <td className="px-5 py-3.5 text-slate-600">{inv.due}</td>
            <td className="px-5 py-3.5 text-slate-600">{inv.items}</td>
            <td className="px-5 py-3.5 text-slate-600">{fmt(inv.tax)}</td>
            <td className="px-5 py-3.5 text-slate-600">{fmt(inv.shipping)}</td>
            <td className="px-5 py-3.5 font-bold text-[#0F1B2D]">{fmt(inv.total)}</td>
            <td className="px-5 py-3.5"><StatusPill status={inv.status} /></td>
            <td className="px-5 py-3.5">
              <button onClick={() => notify(`${inv.id} exported as PDF`)} className="text-slate-400 hover:text-[#1E5A8A]"><Download size={15} /></button>
            </td>
          </tr>
        )}
      />
    </>
  );
}

function Receipts({ notify }) {
  const paidInvoices = seedInvoices.filter(i => i.status === "Paid").concat([
    { id: "INV-1039", customer: "Summit Legal Group", date: "2026-08-05", total: 2400.00, status: "Paid" }
  ]);
  return (
    <>
      <SectionHeader eyebrow="Confirmations" title="Payment Receipts" action={
        <button onClick={() => notify("Receipt auto-filled from latest payment")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Receipt size={15} /> Auto-Fill Receipt
        </button>
      } />
      <DataTable
        columns={["Receipt For", "Customer", "Date Paid", "Amount", "Method", ""]}
        rows={paidInvoices}
        renderRow={(inv) => (
          <tr key={inv.id + "r"} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 font-mono text-xs font-semibold text-[#1E5A8A]">{inv.id}</td>
            <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{inv.customer}</td>
            <td className="px-5 py-3.5 text-slate-600">{inv.date}</td>
            <td className="px-5 py-3.5 font-bold text-emerald-600">{fmt(inv.total)}</td>
            <td className="px-5 py-3.5 text-slate-600">ACH Transfer</td>
            <td className="px-5 py-3.5">
              <button onClick={() => notify(`Receipt for ${inv.id} downloaded`)} className="text-slate-400 hover:text-[#1E5A8A]"><Download size={15} /></button>
            </td>
          </tr>
        )}
      />
    </>
  );
}

function Customers({ notify }) {
  return (
    <>
      <SectionHeader eyebrow="Relationships" title="Customer List" action={
        <button onClick={() => notify("Customer added")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Plus size={15} /> Add Customer
        </button>
      } />
      <DataTable
        columns={["Customer", "Email", "Invoices", "Balance Due", ""]}
        rows={seedCustomers}
        onExport={() => notify("Customer list exported as PDF")}
        renderRow={(c) => (
          <tr key={c.id} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{c.name}</td>
            <td className="px-5 py-3.5 text-slate-600">{c.email}</td>
            <td className="px-5 py-3.5 text-slate-600">{c.invoices}</td>
            <td className={`px-5 py-3.5 font-bold ${c.balance > 0 ? "text-red-600" : "text-emerald-600"}`}>{fmt(c.balance)}</td>
            <td className="px-5 py-3.5">
              <button onClick={() => notify(`${c.name} profile exported as PDF`)} className="text-slate-400 hover:text-[#1E5A8A]"><Download size={15} /></button>
            </td>
          </tr>
        )}
      />
    </>
  );
}

function ARAging({ notify }) {
  const rows = [
    { id: "C-005", name: "Redline Motors LLC", d030: 0, d3160: 3110.00, d6190: 0, d90: 5990.75 },
    { id: "C-001", name: "Northgate Logistics", d030: 1521.40, d3160: 3298.60, d6190: 0, d90: 0 },
    { id: "C-002", name: "Bluepeak Retail Co.", d030: 655.50, d3160: 0, d6190: 595.00, d90: 0 },
    { id: "C-004", name: "Harbor & Vine Cafe", d030: 640.00, d3160: 0, d6190: 0, d90: 0 },
  ];
  const totals = rows.reduce((a, r) => ({
    d030: a.d030 + r.d030, d3160: a.d3160 + r.d3160, d6190: a.d6190 + r.d6190, d90: a.d90 + r.d90
  }), { d030: 0, d3160: 0, d6190: 0, d90: 0 });

  return (
    <>
      <SectionHeader eyebrow="Overdue Tracking" title="AR Aging" action={
        <button onClick={() => notify("Overdue reminders sent to 3 customers")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Mail size={15} /> Send Overdue Reminders
        </button>
      } />
      <div className="grid grid-cols-4 gap-4 mb-5">
        <MetricCard label="Current" value={fmt(totals.d030)} icon={CheckCircle2} />
        <MetricCard label="31–60 days" value={fmt(totals.d3160)} icon={Clock} />
        <MetricCard label="61–90 days" value={fmt(totals.d6190)} icon={AlertTriangle} />
        <MetricCard label="90+ days" value={fmt(totals.d90)} icon={AlertTriangle} />
      </div>
      <DataTable
        columns={["Customer", "Current (0-30)", "31-60 days", "61-90 days", "90+ days", "Total Due"]}
        rows={rows}
        onExport={() => notify("AR Aging report exported as PDF")}
        renderRow={(r) => {
          const total = r.d030 + r.d3160 + r.d6190 + r.d90;
          return (
            <tr key={r.id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{r.name}</td>
              <td className="px-5 py-3.5 text-slate-600">{r.d030 ? fmt(r.d030) : "—"}</td>
              <td className="px-5 py-3.5 text-amber-600 font-medium">{r.d3160 ? fmt(r.d3160) : "—"}</td>
              <td className="px-5 py-3.5 text-orange-600 font-medium">{r.d6190 ? fmt(r.d6190) : "—"}</td>
              <td className="px-5 py-3.5 text-red-600 font-bold">{r.d90 ? fmt(r.d90) : "—"}</td>
              <td className="px-5 py-3.5 font-bold text-[#0F1B2D]">{fmt(total)}</td>
            </tr>
          );
        }}
      />
    </>
  );
}

function SalesReport({ notify }) {
  const monthly = [
    { m: "Mar", v: 12400 }, { m: "Apr", v: 14100 }, { m: "May", v: 13200 },
    { m: "Jun", v: 16800 }, { m: "Jul", v: 15900 }, { m: "Aug", v: 18420 },
  ];
  const max = Math.max(...monthly.map(m => m.v));
  return (
    <>
      <SectionHeader eyebrow="Performance" title="Sales Report" action={
        <button onClick={() => notify("Sales report exported as PDF")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Download size={15} /> Export PDF
        </button>
      } />
      <Card className="p-6 mb-6">
        <span className="text-sm font-bold text-[#0F1B2D] block mb-6">Revenue — Last 6 Months</span>
        <div className="flex items-end gap-4 h-48">
          {monthly.map((m) => (
            <div key={m.m} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs font-bold text-[#0F1B2D]">{fmt(m.v).replace(".00", "")}</div>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#0F1B2D] to-[#3B82C4]"
                style={{ height: `${(m.v / max) * 140}px` }}
              />
              <div className="text-xs font-semibold text-slate-500">{m.m}</div>
            </div>
          ))}
        </div>
      </Card>
      <DataTable
        columns={["Product/Service", "Units Sold", "Revenue", "% of Total"]}
        rows={[
          { id: "s1", name: "Cloud Storage Plans", units: 84, rev: 7200 },
          { id: "s2", name: "Managed Hosting", units: 32, rev: 6100 },
          { id: "s3", name: "Backup & Recovery", units: 51, rev: 3120 },
          { id: "s4", name: "Support Add-ons", units: 19, rev: 2000 },
        ]}
        renderRow={(s) => (
          <tr key={s.id} className="hover:bg-slate-50/60">
            <td className="px-5 py-3.5 font-medium text-[#0F1B2D]">{s.name}</td>
            <td className="px-5 py-3.5 text-slate-600">{s.units}</td>
            <td className="px-5 py-3.5 font-bold text-[#0F1B2D]">{fmt(s.rev)}</td>
            <td className="px-5 py-3.5 text-slate-600">{((s.rev / 18420) * 100).toFixed(1)}%</td>
          </tr>
        )}
      />
    </>
  );
}

function PnL({ notify }) {
  const revenue = 18420.30;
  const expenses = [
    { name: "Cloud Infrastructure (AWS/hosting)", amt: 3890.20 },
    { name: "Payroll", amt: 12400.00 },
    { name: "Software Subscriptions", amt: 340.00 },
    { name: "Marketing", amt: 580.00 },
  ];
  const totalExp = expenses.reduce((s, e) => s + e.amt, 0);
  const net = revenue - totalExp;

  return (
    <>
      <SectionHeader eyebrow="Reports" title="Monthly P&L" action={
        <button onClick={() => notify("P&L statement exported as PDF")} className="flex items-center gap-1.5 bg-[#0F1B2D] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1a2b45]">
          <Download size={15} /> Export PDF
        </button>
      } />
      <Card className="p-6">
        <div className="flex justify-between items-center py-3 border-b-2 border-[#0F1B2D]">
          <span className="font-bold text-[#0F1B2D]">Total Revenue</span>
          <span className="font-bold text-emerald-600 text-lg">{fmt(revenue)}</span>
        </div>
        <div className="py-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Operating Expenses</span>
          {expenses.map((e) => (
            <div key={e.name} className="flex justify-between items-center py-2.5 border-b border-slate-50">
              <span className="text-slate-600 text-sm">{e.name}</span>
              <span className="text-slate-700 font-medium text-sm">{fmt(e.amt)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-2.5 pt-3">
            <span className="font-semibold text-[#0F1B2D] text-sm">Total Expenses</span>
            <span className="font-bold text-red-600">{fmt(totalExp)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 border-t-2 border-[#0F1B2D] mt-2">
          <span className="font-bold text-[#0F1B2D] text-lg">Net Profit</span>
          <span className="font-bold text-[#0F1B2D] text-2xl" style={{ fontFamily: "Sora, sans-serif" }}>{fmt(net)}</span>
        </div>
      </Card>
    </>
  );
}

function BusinessSetup({ notify }) {
  const [step, setStep] = useState(1);
  const steps = ["Business Info", "Tax Details", "Branding", "Payment Setup"];
  return (
    <>
      <SectionHeader eyebrow="Onboarding" title="Business Setup" />
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 <= step ? "bg-[#0F1B2D] text-white" : "bg-slate-100 text-slate-400"}`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${i + 1 <= step ? "text-[#0F1B2D]" : "text-slate-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i + 1 < step ? "bg-[#0F1B2D]" : "bg-slate-100"}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Business Name</label>
              <input defaultValue="Apex Cloud" className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#3B82C4]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Industry</label>
              <input defaultValue="Cloud Services" className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#3B82C4]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Business Address</label>
              <input placeholder="123 Cloud Ave, Austin, TX" className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#3B82C4]" />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">EIN / Tax ID</label>
              <input placeholder="XX-XXXXXXX" className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#3B82C4]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Default Sales Tax Rate</label>
              <input defaultValue="8.25%" className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#3B82C4]" />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600 pt-2">
              <input type="checkbox" defaultChecked className="rounded" /> Track 1099 contractors automatically
            </label>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#0F1B2D] flex items-center justify-center">
                <Mountain size={28} className="text-white" />
              </div>
              <button className="text-sm font-semibold text-[#1E5A8A]">Upload logo for invoices &amp; receipts</button>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Brand Accent Color</label>
              <div className="flex gap-2 mt-1.5">
                {["#0F1B2D", "#3B82C4", "#1E5A8A", "#16A34A"].map(c => (
                  <div key={c} className="w-8 h-8 rounded-lg ring-2 ring-offset-2 ring-transparent hover:ring-slate-300 cursor-pointer" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Preferred Payment Methods</label>
              <div className="space-y-2 mt-2">
                {["ACH Bank Transfer", "Credit / Debit Card", "Wire Transfer"].map(m => (
                  <label key={m} className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded" /> {m}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Invoice Due Terms</label>
              <input defaultValue="Net 30" className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg ring-1 ring-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#3B82C4]" />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-5 border-t border-slate-100">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            className={`text-sm font-semibold px-4 py-2 rounded-lg ${step === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-slate-50"}`}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            onClick={() => step < 4 ? setStep(s => s + 1) : notify("Business setup complete")}
            className="bg-[#0F1B2D] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a2b45]"
          >
            {step < 4 ? "Continue" : "Finish Setup"}
          </button>
        </div>
      </Card>
    </>
  );
}

export default function ApexDashboard() {
  const [active, setActive] = useState("dashboard");
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    window.clearTimeout(window.__apexToastTimer);
    window.__apexToastTimer = window.setTimeout(() => setToast(""), 2800);
  };

  const PAGES = {
    dashboard: Dashboard, transactions: Transactions, ledger: Ledger,
    invoices: Invoices, receipts: Receipts, customers: Customers,
    aging: ARAging, sales: SalesReport, pnl: PnL, settings: BusinessSetup,
  };
  const Active = PAGES[active];

  return (
    <div className="flex h-screen bg-[#F7F9FC]" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1B2D] flex flex-col shrink-0">
        <div className="flex items-center gap-2.5 px-6 py-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3B82C4] to-[#1E5A8A] flex items-center justify-center shrink-0">
            <Mountain size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "Sora, sans-serif" }}>APEX CLOUD</div>
            <div className="text-white/40 text-[10px] font-medium tracking-widest uppercase">Financial Suite</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors relative ${
                active === n.id ? "bg-white/10 text-white" : "text-white/50 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              {active === n.id && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-[#3B82C4]" />}
              <n.icon size={16} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="text-white/30 text-[10px] leading-relaxed px-2">
            Apex Cloud Financial Suite<br />v1.0 · Demo Data
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="text-sm text-slate-400">
            <span className="text-slate-600 font-medium">Apex Cloud</span> / {NAV.find(n => n.id === active)?.label}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-[#0F1B2D] relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82C4] to-[#1E5A8A] flex items-center justify-center text-white text-xs font-bold">
              AC
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Active notify={notify} />
        </main>
      </div>

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
