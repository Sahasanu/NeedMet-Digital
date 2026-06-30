import Container from "../../../Components/layout/Container";

import CouponInput from "./CouponInput";
import PaymentSelector from "./PaymentSelector";
import PriceBreakdown from "./PriceBreakDown";
import CheckoutButton from "./CheckoutButton";
import HelpCard from "./HelpCard";

export default function OrderSummary({ currentPlan, pricing, paymentMethod, setPaymentMethod, onApplyCoupon, couponMessage, onCheckout }) {
    return (
        <div
            className=" rounded-3xl " >
            <div className="space-y-5 sticky top-24">
                <div className=" rounded-3xl bg-white p-4 shadow-lg ">
                    <h2 className="mb-2 text-2xl font-bold border-b-1 border-gray-200/30 "> Order Summary  </h2>
                    <PriceBreakdown plan={currentPlan} pricing={pricing} />

                    <div className="my-3">
                        <CouponInput
                            onApply={onApplyCoupon}
                            message={couponMessage}
                        />
                    </div>
                    <PaymentSelector
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod} />
                    <div className="mt-6">
                        <CheckoutButton onClick={onCheckout} />
                    </div>
                    <div className=" mt-1 pt-1 flex items-center justify-center gap-1 text-secondary text-label-sm text-xs">
                        <span className="material-symbols-outlined icon-sm">lock</span>
                        Secure, encrypted transaction
                    </div>
                </div>
                <HelpCard />
            </div>
        </div>


    );

}
