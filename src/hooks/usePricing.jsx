import { useMemo } from "react";

export default function usePricing(plan, basePrice, couponDiscount = 0) {

    return useMemo(() => {
        const total = basePrice * plan.months;
        const discountAmount = plan.discount || 0;
        const subtotal = total - discountAmount;
        const tax = Math.round(subtotal * 0.05);
        const grand = subtotal + tax - couponDiscount;

        return {
            baseprice:basePrice,
            total,
            subtotal,
            tax,
            couponDiscount,
            grand: Math.max(grand, 0),
        };

    }, [plan, basePrice, couponDiscount]);

}
