import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, CreditCard } from "lucide-react";

export default function OrdersTransactionsTabs({ active = "purchases", metrics = {} }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isPurchases =
    active === "purchases" ||
    active === "orders" ||
    currentPath.includes("/admin/purchases") ||
    currentPath.includes("/admin/orders");
  const isTransactions =
    active === "transactions" ||
    active === "payments" ||
    currentPath.includes("/admin/payments") ||
    currentPath.includes("/admin/transactions");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
      <div className="flex items-center gap-1.5 w-full sm:w-auto">
        {/* Tab 1: Purchases */}
        <Link
          to="/admin/purchases"
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            isPurchases
              ? "bg-white text-[#0f5c3e] shadow-sm border border-slate-200/60 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <ShoppingBag
            size={16}
            className={isPurchases ? "text-[#0f5c3e]" : "text-slate-400"}
          />
          <span>Purchases</span>
          {(metrics.totalPurchases !== undefined ||
            metrics.totalOrders !== undefined) && (
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                isPurchases
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-slate-200/60 text-slate-600"
              }`}
            >
              {metrics.totalPurchases ?? metrics.totalOrders}
            </span>
          )}
        </Link>

        {/* Tab 2: Payments */}
        <Link
          to="/admin/payments"
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            isTransactions
              ? "bg-white text-[#0f5c3e] shadow-sm border border-slate-200/60 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
          }`}
        >
          <CreditCard size={16} className={isTransactions ? "text-[#0f5c3e]" : "text-slate-400"} />
          <span>Payments</span>
          {metrics.totalTransactions !== undefined && (
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                isTransactions ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-200/60 text-slate-600"
              }`}
            >
              {metrics.totalTransactions}
            </span>
          )}
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-2 px-3 text-xs text-slate-500 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Live Firestore Financial Ledger</span>
      </div>
    </div>
  );
}

