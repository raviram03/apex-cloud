import React, { useState } from "react";
import ApexDashboard, { LOGO_SRC } from "./ApexDashboard";
import {
  CheckCircle2, LayoutDashboard, FileText, Receipt, Users, AlertTriangle,
  BarChart3, TrendingUp, Landmark, Repeat, FileSpreadsheet, ArrowRight,
  Star, ShieldCheck, Cloud, X
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Paste your Gumroad (or Payhip) product link here after you
// create your product and upload the Google Sheets template.
// ─────────────────────────────────────────────────────────────
const BUY_LINK = "https://raviram.gumroad.com/l/ypatds";

const FEATURES = [
  { icon: LayoutDashboard, title: "Live Dashboard", desc: "Revenue, profit, AR, and customer metrics at a glance." },
  { icon: FileText, title: "Professional Invoices", desc: "Multi-item invoices with tax, shipping, and your logo." },
  { icon: Receipt, title: "Payment Receipts", desc: "Auto-filled receipts the moment an invoice is paid." },
  { icon: Users, title: "Customer Management", desc: "Track every customer's balance and invoice history." },
  { icon: AlertTriangle, title: "AR Aging Reports", desc: "See exactly who owes what, and for how long." },
  { icon: Landmark, title: "Bank Reconciliation", desc: "Match your bank statement to your books automatically." },
  { icon: Repeat, title: "Recurring Invoices", desc: "Set it once — invoices go out on autopilot." },
  { icon: FileSpreadsheet, title: "1099 Summary", desc: "Contractor payments tracked and export-ready at tax time." },
  { icon: BarChart3, title: "Sales & P&L Reports", desc: "Monthly performance reports, ready to export as PDF." },
];

const FAQS = [
  { q: "What exactly do I get?", a: "A complete Google Sheets accounting template with built-in automation (via Google Apps Script), plus this dashboard as a live reference for how your numbers can look." },
  { q: "Do I need any technical skills?", a: "No. If you can use Google Sheets, you can use this. Click 'Make a Copy', fill in your business info, and you're set up in minutes." },
  { q: "Can I use it for more than one business?", a: "Yes — make a separate copy of the template for each business you manage." },
  { q: "Is my data private?", a: "Yes. Once you make your own copy, the data lives in your own Google account — nobody else can see it." },
  { q: "Do you offer support?", a: "Yes, reach out any time if you get stuck setting it up." },
];

function LandingPage({ onViewDemo }) {
  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-12 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-white ring-1 ring-slate-200 flex items-center justify-center p-1 shadow-sm">
            <img src={LOGO_SRC} alt="Apex Cloud" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-[#0F1B2D]" style={{ fontFamily: "Sora, sans-serif" }}>APEX CLOUD</span>
        </div>
        <button onClick={onViewDemo} className="text-sm font-semibold text-[#1E5A8A] hover:text-[#0F1B2D]">
          View Live Demo →
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-12 pb-16">
        <div className="inline-flex items-center gap-1.5 bg-white ring-1 ring-slate-200 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-500 mb-6">
          <ShieldCheck size={13} className="text-[#1E5A8A]" /> Built for small business owners
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0F1B2D] leading-tight mb-5" style={{ fontFamily: "Sora, sans-serif" }}>
          A complete accounting system<br className="hidden sm:block" /> for your small business
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
          Invoices, ledger, bank reconciliation, AR aging, and monthly reports — all in one
          Google Sheets template with automation built in. No software to install, no monthly fees.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={BUY_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0F1B2D] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1a2b45] transition-colors shadow-lg shadow-[#0F1B2D]/10">
            Get Instant Access <ArrowRight size={16} />
          </a>
          <button onClick={onViewDemo}
            className="flex items-center gap-2 bg-white text-[#0F1B2D] font-semibold px-7 py-3.5 rounded-xl ring-1 ring-slate-200 hover:bg-slate-50 transition-colors">
            View Live Demo
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 mt-6 text-amber-400">
          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
          <span className="text-sm text-slate-400 ml-2">Trusted by small business owners</span>
        </div>
      </section>

      {/* Preview image / dashboard frame */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-2xl shadow-slate-300/40 cursor-pointer" onClick={onViewDemo}>
          <div className="bg-[#0F1B2D] px-4 py-2.5 flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-white/40 text-xs">apex-cloud-dusky.vercel.app</span>
          </div>
          <div className="bg-white p-8 grid grid-cols-4 gap-3">
            {["Revenue", "Receivable", "Profit", "Customers"].map((label, i) => (
              <div key={label} className="rounded-xl ring-1 ring-slate-100 p-4 bg-slate-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">{label}</div>
                <div className="h-3 w-16 bg-slate-200 rounded mb-1" />
                <div className="h-2 w-10 bg-slate-100 rounded" />
              </div>
            ))}
            <div className="col-span-4 h-32 rounded-xl bg-slate-50 ring-1 ring-slate-100 mt-1" />
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3">Click to explore the live interactive demo</p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-[#0F1B2D] text-center mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
          Everything your books need
        </h2>
        <p className="text-slate-500 text-center mb-10">One template. Every core accounting workflow.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-xl ring-1 ring-slate-200 p-5">
              <div className="w-9 h-9 rounded-lg bg-[#0F1B2D]/5 flex items-center justify-center mb-3">
                <f.icon size={17} className="text-[#1E5A8A]" />
              </div>
              <div className="font-bold text-[#0F1B2D] mb-1 text-sm">{f.title}</div>
              <div className="text-sm text-slate-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 text-center shadow-sm">
          <div className="text-xs font-bold text-[#1E5A8A] uppercase tracking-widest mb-2">One-Time Payment</div>
          <div className="text-5xl font-bold text-[#0F1B2D] mb-1" style={{ fontFamily: "Sora, sans-serif" }}>$49</div>
          <div className="text-sm text-slate-400 mb-6">Lifetime access — no subscriptions</div>
          <ul className="text-left max-w-xs mx-auto space-y-2.5 mb-7">
            {["Full accounting template", "Built-in automation menu", "Free future updates", "Setup support included"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <a href={BUY_LINK} target="_blank" rel="noopener noreferrer"
            className="block w-full bg-[#0F1B2D] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1a2b45] transition-colors">
            Get Instant Access
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-[#0F1B2D] text-center mb-8" style={{ fontFamily: "Sora, sans-serif" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <div key={f.q} className="bg-white rounded-xl ring-1 ring-slate-200 p-5">
              <div className="font-semibold text-[#0F1B2D] mb-1.5 text-sm">{f.q}</div>
              <div className="text-sm text-slate-500">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        Apex Cloud Financial Suite &middot; contact billing@apexcloud.io
      </footer>
    </div>
  );
}

function App() {
  const [view, setView] = useState("landing"); // "landing" | "demo"

  if (view === "demo") {
    return (
      <div className="relative">
        <button
          onClick={() => setView("landing")}
          className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-[#0F1B2D] text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg hover:bg-[#1a2b45]"
        >
          <X size={13} /> Exit Demo
        </button>
        <ApexDashboard />
      </div>
    );
  }

  return <LandingPage onViewDemo={() => setView("demo")} />;
}

export default App;
