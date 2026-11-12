import React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Clock,
  Eye,
  ShoppingBag,
  User,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Hourglass,
} from "lucide-react";

export default function TransactionsTableSection({
  loading = false,
  payments = [],
  searchQuery = "",
  onInspect,
}) {
  if (loading) {
    return (
      <div className="p-16 text-center rounded-2xl bg-white border border-slate-200/60 shadow-xs text-slate-400 text-sm animate-pulse">
        <div className="inline-block w-7 h-7 border-2 border-[#0f5c3e] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-semibold text-slate-700">Loading payments ledger from database...</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="p-16 text-center rounded-2xl bg-white border border-slate-200/60 shadow-xs text-slate-500">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/50 flex items-center justify-center mx-auto mb-3 text-slate-600 shadow-2xs">
          <CreditCard size={32} />
        </div>
        <p className="font-bold text-slate-800 text-base">No Payments Recorded</p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {searchQuery
            ? `No records match "${searchQuery}". Try refining your search query.`
            : "No payment records found in the ledger."}
        </p>
      </div>
    );
  }

  // Friendly human-readable status labels and styling
  const statusConfig = {
    SUCCESS: {
      label: "Success",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
    },
    PENDING_MANDATE: {
      label: "Mandate Pending",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Hourglass,
    },
    PENDING: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Hourglass,
    },
    FAILED: {
      label: "Failed",
      className: "bg-rose-50 text-rose-700 border-rose-200",
      icon: AlertCircle,
    },
    REFUNDED: {
      label: "Refunded",
      className: "bg-purple-50 text-purple-700 border-purple-200",
      icon: RotateCcw,
    },
  };

  const paymentTypeLabels = {
    FULL: "Full Payment",
    EMI_UPFRONT: "EMI Upfront",
    EMI_RECURRING: "EMI Recurring",
  };

  const getMethodBadge = (method = "") => {
    const m = method.toLowerCase();
    if (m === "upi") return "bg-purple-50 text-purple-700 border-purple-200";
    if (m === "card") return "bg-blue-50 text-blue-700 border-blue-200";
    if (m === "netbanking") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const formatDate = (val) => {
    if (!val) return "N/A";
    const d = new Date(val);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-3 font-primary">
      {/* ────────────────────────────────────────────────────────── */}
      {/* ── DESKTOP VIEW (>= lg): Full Table Layout ─────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xs hover:shadow-sm transition-shadow duration-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <thead className="bg-[#0f5c3e] text-[11px] font-bold uppercase tracking-wider text-white border-b border-[#0f5c3e]">
              <tr>
                <th className="px-4 py-3.5 text-white whitespace-nowrap">Payment ID</th>
                <th className="px-4 py-3.5 text-white">Customer</th>
                <th className="px-4 py-3.5 text-white">Linked Order</th>
                <th className="px-4 py-3.5 text-white">Amount</th>
                <th className="px-4 py-3.5 text-white">Method</th>
                <th className="px-4 py-3.5 text-white">Type</th>
                <th className="px-4 py-3.5 text-white">Status</th>
                <th className="px-4 py-3.5 text-right text-white min-w-[110px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => {
                const statusMeta =
                  statusConfig[payment.status] || {
                    label: payment.status || "Unknown",
                    className: "bg-slate-100 text-slate-600 border-slate-200",
                    icon: AlertCircle,
                  };
                const StatusIcon = statusMeta.icon;

                return (
                  <tr key={payment.id} className="hover:bg-slate-50/80 transition-colors duration-150">
                    {/* 1. Payment ID & Created Timestamp */}
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <div className="space-y-1">
                        <span
                          className="font-mono font-bold text-xs tracking-wide text-[#0f5c3e] bg-[#e8f5ee] px-2.5 py-1 rounded-lg border border-[#d1fae5] inline-block shadow-2xs max-w-[160px] truncate"
                          title={payment.id}
                        >
                          {payment.id}
                        </span>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <Clock size={12} className="text-slate-400 shrink-0" />
                          <span>{formatDate(payment.createdAt)}</span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Customer: userName only with clean avatar */}
                    <td className="px-4 py-4 align-middle">
                      <div className="text-slate-800 font-semibold flex items-center gap-2 truncate max-w-[160px]">
                        <div className="w-7 h-7 rounded-full bg-[#e8f5ee] text-[#0f5c3e] flex items-center justify-center shrink-0">
                          <User size={13} />
                        </div>
                        <span className="truncate" title={payment.userName || "Customer"}>
                          {payment.userName || "Customer"}
                        </span>
                      </div>
                    </td>

                    {/* 3. Linked Order (orderId): Ellipsed with tooltip */}
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      {payment.orderId ? (
                        <Link
                          to={`/admin/purchases?search=${encodeURIComponent(payment.orderId)}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#0f5c3e] hover:text-[#0b462f] hover:underline font-semibold bg-[#e8f5ee] px-2.5 py-1 rounded-lg border border-[#d1fae5] transition shadow-2xs max-w-[150px] group"
                          title={`View Order: ${payment.orderId}`}
                        >
                          <ShoppingBag size={12} className="shrink-0 text-[#0f5c3e]" />
                          <span className="truncate">{payment.orderId}</span>
                          <ExternalLink size={10} className="shrink-0 opacity-70 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        <span className="text-slate-400 text-xs italic">N/A</span>
                      )}
                    </td>

                    {/* 4. Amount (Bold) */}
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-bold font-heading text-[#0f5c3e]">
                          ₹{(payment.amount || 0).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                          {payment.currency || "INR"}
                        </span>
                      </div>
                    </td>

                    {/* 5. Method: clean badge */}
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <span
                        className={`inline-block text-xs px-2.5 py-1 rounded-lg font-bold uppercase border shadow-2xs ${getMethodBadge(
                          payment.method
                        )}`}
                      >
                        {payment.method || "UPI"}
                      </span>
                    </td>

                    {/* 6. Payment Type */}
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-2xs">
                        {paymentTypeLabels[payment.paymentType] || payment.paymentType}
                      </span>
                    </td>

                    {/* 7. Status */}
                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs ${statusMeta.className}`}
                      >
                        <StatusIcon size={12} className="shrink-0" />
                        <span>{statusMeta.label}</span>
                      </span>
                    </td>

                    {/* 8. Inspect Action: Details Button */}
                    <td className="px-4 py-4 align-middle text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onInspect(payment)}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#e8f5ee] hover:text-[#0f5c3e] text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300/90 hover:border-[#0f5c3e]/40 transition cursor-pointer shadow-2xs hover:shadow-xs"
                        title="View Details"
                      >
                        <Eye size={13} className="text-slate-700" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── MOBILE VIEW (< lg): Responsive Touch-Friendly Cards ─── */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="lg:hidden space-y-3.5">
        {payments.map((payment) => {
          const statusMeta =
            statusConfig[payment.status] || {
              label: payment.status || "Unknown",
              className: "bg-slate-100 text-slate-600 border-slate-200",
              icon: AlertCircle,
            };
          const StatusIcon = statusMeta.icon;

          return (
            <div
              key={payment.id}
              className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-xs hover:shadow-sm transition-shadow duration-200 space-y-3"
            >
              {/* Row 1: Payment ID Badge & Status */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className="font-mono font-bold text-xs tracking-wide text-[#0f5c3e] bg-[#e8f5ee] px-2.5 py-1 rounded-lg border border-[#d1fae5] inline-block shadow-2xs max-w-[170px] truncate"
                  title={payment.id}
                >
                  {payment.id}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 shadow-2xs ${statusMeta.className}`}
                >
                  <StatusIcon size={11} className="shrink-0" />
                  <span>{statusMeta.label}</span>
                </span>
              </div>

              {/* Row 2: Amount Banner & Customer (CashCode style) */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Settlement Amount
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-lg font-bold font-heading text-[#0f5c3e]">
                      ₹{(payment.amount || 0).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                      {payment.currency || "INR"}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Customer
                  </span>
                  <div className="flex items-center gap-1.5 justify-end mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-[#e8f5ee] text-[#0f5c3e] flex items-center justify-center shrink-0">
                      <User size={11} />
                    </div>
                    <span className="font-semibold text-slate-800 text-xs truncate max-w-[120px]" title={payment.userName || "Customer"}>
                      {payment.userName || "Customer"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Linked Order & Method Details */}
              <div className="space-y-2 pt-0.5 text-xs text-slate-600">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 text-xs font-medium">Linked Order:</span>
                  {payment.orderId ? (
                    <Link
                      to={`/admin/purchases?search=${encodeURIComponent(payment.orderId)}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#0f5c3e] font-semibold bg-[#e8f5ee] px-2 py-0.5 rounded-lg border border-[#d1fae5] max-w-[170px] truncate shadow-2xs group"
                      title={`View Order: ${payment.orderId}`}
                    >
                      <ShoppingBag size={11} className="shrink-0 text-[#0f5c3e]" />
                      <span className="truncate">{payment.orderId}</span>
                      <ExternalLink size={10} className="shrink-0 opacity-70 group-hover:opacity-100" />
                    </Link>
                  ) : (
                    <span className="text-slate-400 italic">N/A</span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 text-xs font-medium">Payment Method:</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded font-bold uppercase border shadow-2xs ${getMethodBadge(
                        payment.method
                      )}`}
                    >
                      {payment.method || "UPI"}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {paymentTypeLabels[payment.paymentType] || payment.paymentType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-slate-500 text-xs font-medium">Date:</span>
                  <div className="flex items-center gap-1 text-slate-700 font-medium">
                    <Clock size={12} className="text-slate-400 shrink-0" />
                    <span>{formatDate(payment.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Row 4: Full-width Details Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onInspect(payment)}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#e8f5ee] hover:text-[#0f5c3e] text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300/90 hover:border-[#0f5c3e]/40 transition cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
                >
                  <Eye size={13} className="text-slate-700" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
