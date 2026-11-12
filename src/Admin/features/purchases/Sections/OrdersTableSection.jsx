import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ReceiptText,
  Clock,
  Eye,
  CreditCard,
  User,
  ExternalLink,
  Calendar,
  ChevronDown,
  Tag,
  ShieldCheck,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

export const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  COMPLETED: {
    label: "Completed",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  PENDING_MANDATE: {
    label: "Mandate Pending",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  PENDING_PAYMENT: {
    label: "Payment Pending",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  CANCELLED: {
    label: "Cancelled",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
  REFUNDED: {
    label: "Refunded",
    badge: "bg-slate-100 text-slate-700 border-slate-300",
    dot: "bg-slate-400",
  },
};

export const formatStatus = (rawStatus) => {
  const normalized = String(rawStatus || "").toUpperCase();
  if (STATUS_CONFIG[normalized]) {
    return STATUS_CONFIG[normalized];
  }
  return {
    label: normalized.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
  };
};

export default function OrdersTableSection({
  loading = false,
  orders = [],
  searchQuery = "",
  onInspect,
}) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (orderId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const expandAll = () => {
    const all = {};
    orders.forEach((o) => {
      all[o.id] = true;
    });
    setExpandedRows(all);
  };

  const collapseAll = () => {
    setExpandedRows({});
  };

  if (loading) {
    return (
      <div className="p-16 text-center rounded-2xl bg-white border border-slate-200/60 shadow-xs text-slate-400 text-sm animate-pulse">
        <div className="inline-block w-7 h-7 border-2 border-[#0f5c3e] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="font-semibold text-slate-700">Loading purchases from database...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-16 text-center rounded-2xl bg-white border border-slate-200/60 shadow-xs text-slate-500">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200/50 flex items-center justify-center mx-auto mb-3 text-slate-600 shadow-2xs">
          <ReceiptText size={32} />
        </div>
        <p className="font-bold text-slate-800 text-base">No Purchases Found</p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {searchQuery
            ? `No purchase records match "${searchQuery}". Try refining your search query.`
            : "No customer purchase transactions recorded in the 'purchases' collection yet."}
        </p>
      </div>
    );
  }

  const paymentMethodStyles = {
    FULL: "bg-blue-50 text-blue-700 border-blue-200",
    EMI: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="space-y-3 font-primary">
      {/* Table toolbar / quick expansion control */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          Showing {orders.length} {orders.length === 1 ? "purchase" : "purchases"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="text-xs font-semibold text-[#0f5c3e] hover:underline cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-xs font-semibold text-slate-500 hover:underline cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* ── DESKTOP VIEW (>= lg): Full Table Layout ─────────────── */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-xs hover:shadow-sm transition-shadow duration-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <thead className="bg-[#0f5c3e] text-[11px] font-bold uppercase tracking-wider text-white border-b border-[#0f5c3e]">
              <tr>
                <th className="px-3 py-3.5 w-10 text-center text-white"></th>
                <th className="px-4 py-3.5 text-white whitespace-nowrap">Purchase Date</th>
                <th className="px-4 py-3.5 text-white">Customer</th>
                <th className="px-4 py-3.5 text-white">Service & Plan</th>
                <th className="px-4 py-3.5 text-white">Status</th>
                <th className="px-4 py-3.5 text-white">Payment Method</th>
                <th className="px-4 py-3.5 text-white">Amount</th>
                <th className="px-4 py-3.5 text-right text-white min-w-[110px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => {
                const isExpanded = !!expandedRows[order.id];
                const statusInfo = formatStatus(order.status);
                const isEmi = order.paymentMethod === "EMI";

                return (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-slate-50/80 transition-colors duration-150">
                      {/* Expand/Collapse Chevron Button */}
                      <td className="px-3 py-4 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => toggleRow(order.id)}
                          aria-label={isExpanded ? "Collapse row" : "Expand row"}
                          className="text-slate-400 hover:text-[#0f5c3e] p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                        >
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#0f5c3e]" : ""
                            }`}
                          />
                        </button>
                      </td>

                      {/* 1. Purchase Date Only (No purchase ID) */}
                      <td className="px-4 py-4 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          <Calendar size={14} className="text-slate-500 shrink-0" />
                          <span>
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* 2. Customer Name Only (No UID) */}
                      <td className="px-4 py-4 align-middle">
                        <div className="flex items-center gap-2 text-sm text-slate-800 font-semibold">
                          <div className="w-7 h-7 rounded-full bg-[#e8f5ee] text-[#0f5c3e] flex items-center justify-center shrink-0">
                            <User size={13} />
                          </div>
                          <span className="truncate max-w-[160px]" title={order.userName || "Customer"}>
                            {order.userName || "Customer"}
                          </span>
                        </div>
                      </td>

                      {/* 3. Service & Plan Snapshot */}
                      <td className="px-4 py-4 align-middle">
                        <div className="flex items-center gap-2.5 min-w-0 max-w-[220px]">
                          {order.itemSnapshot?.imageUrl ? (
                            <img
                              src={order.itemSnapshot.imageUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover border border-slate-200/80 shrink-0 shadow-2xs"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-[#e8f5ee] border border-[#d1fae5] flex items-center justify-center shrink-0 text-[#0f5c3e]">
                              <Tag size={13} />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div
                              className="font-semibold text-slate-900 text-sm truncate leading-snug"
                              title={order.itemSnapshot?.serviceTitle}
                            >
                              {order.itemSnapshot?.serviceTitle || "NeedMet Service"}
                            </div>
                            <div className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                              <span className="font-semibold text-[#0f5c3e]">
                                {order.itemSnapshot?.planTitle || "Plan"}
                              </span>
                              {order.itemSnapshot?.durationDays && (
                                <span className="text-slate-400">• {order.itemSnapshot.durationDays}d</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 4. Status Badge */}
                      <td className="px-4 py-4 align-middle whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs ${statusInfo.badge}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                          <span>{statusInfo.label}</span>
                        </span>
                      </td>

                      {/* 5. Payment Method Badge */}
                      <td className="px-4 py-4 align-middle whitespace-nowrap">
                        <span
                          className={`inline-block text-xs px-2.5 py-1 rounded-lg font-bold uppercase border shadow-2xs ${
                            paymentMethodStyles[order.paymentMethod] ||
                            "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {order.paymentMethod || "FULL"}
                        </span>
                      </td>

                      {/* 6. Amount (Bold, No Saved Amount) */}
                      <td className="px-4 py-4 align-middle whitespace-nowrap">
                        <div className="text-base font-bold font-heading text-[#0f5c3e]">
                          ₹{Number(order.pricing?.finalPrice || 0).toLocaleString("en-IN")}
                        </div>
                      </td>

                      {/* 7. Action: Details Button */}
                      <td className="px-4 py-4 align-middle text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onInspect(order)}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#e8f5ee] hover:text-[#0f5c3e] text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 border border-slate-300/90 hover:border-[#0f5c3e]/40 transition cursor-pointer shadow-2xs hover:shadow-xs"
                          title="View Details"
                        >
                          <Eye size={13} className="text-slate-700" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Sub-Row: Detailed Financial & Validity Breakdown */}
                    {isExpanded && (
                      <tr className="bg-[#fcfdfc] border-b border-slate-200/70">
                        <td colSpan={8} className="p-4 pl-12">
                          <div className="rounded-xl bg-white border border-slate-200/80 p-3.5 space-y-2.5 text-sm shadow-2xs">
                            {/* Financial Summary Strip */}
                            <div className="flex items-center gap-4 text-slate-600 flex-wrap text-xs sm:text-sm">
                              <span className="text-slate-400 font-semibold uppercase text-xs flex items-center gap-1">
                                <IndianRupee size={13} className="text-[#0f5c3e]" />
                                Financial:
                              </span>
                              <span>
                                Original: <strong className="text-slate-800">₹{Number(order.pricing?.originalPrice || 0).toLocaleString()}</strong>
                              </span>
                              <span>
                                Upfront: <strong className="text-slate-800">₹{Number(order.pricing?.upfrontAmount || 0).toLocaleString()}</strong>
                              </span>
                              {order.pricing?.remainingAmount > 0 && (
                                <span>
                                  Remaining: <strong className="text-slate-800">₹{Number(order.pricing?.remainingAmount || 0).toLocaleString()}</strong>
                                </span>
                              )}
                              {order.pricing?.couponCode && (
                                <span className="flex items-center gap-1">
                                  <Tag size={12} className="text-amber-600" />
                                  Coupon: <strong className="font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-xs">{order.pricing.couponCode}</strong>
                                </span>
                              )}
                            </div>

                            {/* Access Window Quick Info */}
                            <div className="flex items-center gap-3 text-slate-600 flex-wrap text-xs sm:text-sm">
                              <span className="text-slate-400 font-semibold uppercase text-xs flex items-center gap-1">
                                <Calendar size={13} className="text-[#0f5c3e]" />
                                Validity:
                              </span>
                              <span>
                                {order.derived?.isExpired ? (
                                  <strong className="text-rose-600">Expired</strong>
                                ) : order.derived?.remainingDays !== null ? (
                                  <strong className="text-emerald-700">{order.derived.remainingDays} days active</strong>
                                ) : (
                                  <strong className="text-slate-700">Active Window</strong>
                                )}
                              </span>
                              {order.itemSnapshot?.durationDays && (
                                <span className="text-slate-500">({order.itemSnapshot.durationDays}d plan)</span>
                              )}
                            </div>

                            {/* Mandate Summary (if EMI) */}
                            {isEmi && order.mandate && (
                              <div className="flex items-center gap-2 text-slate-600 flex-wrap text-xs sm:text-sm">
                                <span className="text-slate-400 font-semibold uppercase text-xs flex items-center gap-1">
                                  <ShieldCheck size={13} className="text-[#0f5c3e]" />
                                  Mandate:
                                </span>
                                <span>
                                  Status: <strong className="text-slate-800 font-bold">{order.mandate.status}</strong>
                                </span>
                                <span>
                                  EMI: <strong className="text-slate-800">₹{Number(order.mandate?.emiAmount || 0).toLocaleString()}</strong>
                                </span>
                                {order.mandate.nextDebitDate && (
                                  <span>
                                    Next: <strong className="text-slate-800">{new Date(order.mandate.nextDebitDate).toLocaleDateString()}</strong>
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Quick CTA to Full Inspect Modal */}
                            <button
                              type="button"
                              onClick={() => onInspect(order)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f5c3e] hover:text-[#1a8a5a] hover:underline cursor-pointer ml-auto pt-1"
                            >
                              <span>Inspect Full Details & Schedule</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
        {orders.map((order) => {
          const isExpanded = !!expandedRows[order.id];
          const statusInfo = formatStatus(order.status);
          const isEmi = order.paymentMethod === "EMI";

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-xs hover:shadow-sm transition-shadow duration-200 space-y-3"
            >
              {/* Row 1: Customer Info & Status Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#e8f5ee] text-[#0f5c3e] flex items-center justify-center shrink-0">
                    <User size={13} />
                  </div>
                  <span className="font-bold text-slate-900 text-sm truncate" title={order.userName || "Customer"}>
                    {order.userName || "Customer"}
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 shadow-2xs ${statusInfo.badge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                  <span>{statusInfo.label}</span>
                </span>
              </div>

              {/* Row 2: Amount Banner (CashCode style) */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold font-heading text-[#0f5c3e]">
                    ₹{Number(order.pricing?.finalPrice || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Payment Method
                  </span>
                  <span
                    className={`inline-block text-[11px] px-2 py-0.5 rounded font-bold uppercase border shadow-2xs mt-0.5 ${
                      paymentMethodStyles[order.paymentMethod] ||
                      "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {order.paymentMethod || "FULL"}
                  </span>
                </div>
              </div>

              {/* Row 3: Service & Plan Snapshot */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-100">
                {order.itemSnapshot?.imageUrl ? (
                  <img
                    src={order.itemSnapshot.imageUrl}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200/80 shrink-0 shadow-2xs"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#e8f5ee] border border-[#d1fae5] flex items-center justify-center shrink-0 text-[#0f5c3e]">
                    <Tag size={16} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 text-sm truncate" title={order.itemSnapshot?.serviceTitle}>
                    {order.itemSnapshot?.serviceTitle || "NeedMet Service"}
                  </div>
                  <div className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                    <span className="font-semibold text-[#0f5c3e]">
                      {order.itemSnapshot?.planTitle || "Plan"}
                    </span>
                    {order.itemSnapshot?.durationDays && (
                      <span className="text-slate-400">• {order.itemSnapshot.durationDays}d</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 4: Purchase Date & Validity */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar size={13} className="text-slate-400 shrink-0" />
                  <span>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>

                <div>
                  {order.derived?.isExpired ? (
                    <span className="text-rose-600 font-bold text-[11px]">Expired</span>
                  ) : order.derived?.remainingDays !== null ? (
                    <span className="text-[#0f5c3e] font-bold text-[11px] bg-[#e8f5ee] px-2 py-0.5 rounded-full border border-[#d1fae5]/70">
                      {order.derived.remainingDays} days active
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">Active</span>
                  )}
                </div>
              </div>

              {/* Row 5: Action Buttons (Details Button & Quick Expand) */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onInspect(order)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#e8f5ee] hover:text-[#0f5c3e] text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300/90 hover:border-[#0f5c3e]/40 transition cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.99]"
                >
                  <Eye size={13} className="text-slate-700" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleRow(order.id)}
                  aria-label={isExpanded ? "Collapse info" : "Quick info"}
                  className={`p-2 rounded-xl border transition cursor-pointer shadow-2xs ${
                    isExpanded
                      ? "bg-[#0f5c3e] text-white border-[#0f5c3e]"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                  title={isExpanded ? "Hide breakdown" : "Show financial breakdown"}
                >
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Mobile Quick Breakdown Dropdown */}
              {isExpanded && (
                <div className="rounded-xl bg-slate-50/80 border border-slate-200/70 p-3 space-y-2 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Original Price:</span>
                    <strong className="text-slate-800">
                      ₹{Number(order.pricing?.originalPrice || 0).toLocaleString()}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Upfront Amount:</span>
                    <strong className="text-slate-800">
                      ₹{Number(order.pricing?.upfrontAmount || 0).toLocaleString()}
                    </strong>
                  </div>

                  {order.pricing?.remainingAmount > 0 && (
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400">Remaining (EMI):</span>
                      <strong className="text-slate-800">
                        ₹{Number(order.pricing.remainingAmount).toLocaleString()}
                      </strong>
                    </div>
                  )}

                  {order.pricing?.couponCode && (
                    <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/50">
                      <span className="text-slate-400">Coupon Code:</span>
                      <strong className="font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">
                        {order.pricing.couponCode}
                      </strong>
                    </div>
                  )}

                  {isEmi && order.mandate && (
                    <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/50">
                      <span className="text-slate-400">Mandate Status:</span>
                      <strong className="text-[#0f5c3e] font-bold">
                        {order.mandate.status} (₹{Number(order.mandate.emiAmount || 0).toLocaleString()}/cycle)
                      </strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
