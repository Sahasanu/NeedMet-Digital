import PaymentOption from "./PaymentOption";

export default function PaymentSelector({
  paymentMethod,
  setPaymentMethod
}) {
  return (
    <div>
      <label className="mb-3 block text-xs uppercase tracking-wider text-text-secondary">
        Payment Method
      </label>

      <div className="grid grid-cols-3 gap-3">
        <PaymentOption
          icon="payments"
          label="Full"
          selected={paymentMethod === "Full"}
          onClick={() => setPaymentMethod("Full")}
        />

        <PaymentOption
          icon="event_repeat"
          label="EMI"
          selected={paymentMethod === "EMI"}
          onClick={() => setPaymentMethod("EMI")}
        />

        <PaymentOption
          icon="account_balance"
          label="Transfer"
          selected={paymentMethod === "Transfer"}
          onClick={() => setPaymentMethod("Transfer")}
        />
      </div>
    </div>
  );
}