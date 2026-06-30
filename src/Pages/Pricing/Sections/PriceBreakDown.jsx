import { formatCurrency } from "../../../utils/Formatters";



export default function PriceBreakdown({ plan, pricing }) {


  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Selected Plan</span>
        <span>{plan.months}</span>
      </div>

      <div className="flex justify-between">
        <span>Monthly</span>
        <span>{formatCurrency(pricing.baseprice)}</span>
      </div>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(pricing.total)}</span>
      </div>

      <div className="flex justify-between">
        <span>Discount</span>
        <span>-{formatCurrency(plan.discount)}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax</span>
        <span>{formatCurrency(pricing.tax)}</span>
      </div>

      {pricing.couponDiscount > 0 && (
        <div className="flex justify-between text-primary">
          <span>Coupon</span>
          <span>-{formatCurrency(pricing.couponDiscount)}</span>
        </div>
      )}

      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(pricing.grand)}
          </span>
        </div>
      </div>
      
    </div>
  );
}