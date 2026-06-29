import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SERVICES_DATA from "../../data/services";
import { PLANS, FEATURES, TIMELINE } from "../../data/planDetails";

import usePricing from "../../hooks/usePricing";

import ServiceHero from "./Sections/ServiceHero";
import FeatureGrid from "./Sections/FeatureGrid";
import PlanSelector from "./Sections/PlanSelector";
import Timeline from "./Sections/Timeline";
import OrderSummary from "./Sections/OrderSummary";

const DEFAULT_PLAN = PLANS["6 Months"];

export default function ServiceDetails() {
  const { id } = useParams();

  const [selectedPlan, setSelectedPlan] = useState("6 Months");
  const [paymentMethod, setPaymentMethod] = useState("Full");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const service = SERVICES_DATA.find(
    (item) => item.id === Number(id)
  );

  const currentPlan = PLANS[selectedPlan] || DEFAULT_PLAN;

  const parsePrice = (priceStr) =>
    Number(priceStr.toString().replace(/[^\d]/g, ""));

  const basePrice = service ? parsePrice(service.price) : 0;

  const pricing = usePricing(
    currentPlan,
    basePrice,
    couponDiscount
  );

  if (!service) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-[#131b2e]">
          Service Not Found
        </h1>

        <p className="text-[#216963]">
          The service you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="rounded-full bg-[#00685f] px-8 py-3 font-medium text-white transition hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();

    if (normalized === "SAVE10") {
      setCouponDiscount(Math.round(pricing.subtotal * 0.1));
      setCouponMessage("Coupon applied! 10% discount added.");
      return;
    }

    if (normalized === "NEEDMATE") {
      setCouponDiscount(500);
      setCouponMessage("Coupon applied! ₹500 off your order.");
      return;
    }

    setCouponDiscount(0);
    setCouponMessage(
      "Invalid coupon code. Try SAVE10 or NEEDMATE."
    );
  };

  const handleCheckout = () => {
    window.alert(
      `Order confirmed!

Service: ${service.title}
Plan: ${selectedPlan}
Payment: ${paymentMethod}
Total: ₹${pricing.grand.toLocaleString("en-IN")}

Thank you for choosing NeedMet Digital!`
    );
  };

  return (
    <>
      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-6 py-10 pb-32 lg:pb-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* Left */}
          <main className="space-y-12 lg:col-span-8">
            <ServiceHero service={service} />

            <FeatureGrid features={FEATURES} />

            <PlanSelector
              plans={PLANS}
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
            />

            <Timeline timeline={TIMELINE} />
          </main>

          {/* Desktop Summary */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24">
              <OrderSummary
                currentPlan={currentPlan}
                pricing={pricing}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onApplyCoupon={handleApplyCoupon}
                couponMessage={couponMessage}
                onCheckout={handleCheckout}
              />
            </div>
          </aside>

        </div>
      </div>

      {/* ================= MOBILE STICKY BAR ================= */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#bcc9c6]/20 bg-white/95 p-4 backdrop-blur-md lg:hidden">

        <button
          onClick={() => setShowOrderSummary(true)}
          className="flex w-full items-center justify-between rounded-2xl bg-[#00685f] px-5 py-4 text-white shadow-xl"
        >
          <div className="text-left">
            <p className="text-xs text-white/80">
              {selectedPlan}
            </p>

            <p className="text-xl font-bold">
              ₹{pricing.grand.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="flex items-center gap-2 font-medium">
            View Summary

            <span className="material-symbols-outlined">
              expand_less
            </span>
          </div>
        </button>

      </div>

      {/* ================= MOBILE DRAWER ================= */}

      {showOrderSummary && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setShowOrderSummary(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-[60] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl lg:hidden">

            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1.5 w-14 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 pb-4">

              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <button
                onClick={() => setShowOrderSummary(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>

            </div>

            <div className="p-6">

              <OrderSummary
                currentPlan={currentPlan}
                pricing={pricing}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onApplyCoupon={handleApplyCoupon}
                couponMessage={couponMessage}
                onCheckout={() => {
                  setShowOrderSummary(false);
                  handleCheckout();
                }}
              />

            </div>

          </div>
        </>
      )}
    </>
  );
}