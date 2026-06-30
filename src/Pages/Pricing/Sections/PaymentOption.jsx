export default function PaymentOption({
  icon,
  label,
  selected,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border-2 px-2 py-1 transition-all text-center ${
        selected
          ? "border-primary"
          : "border-border/30 hover:border-primary/40"
      }`}
    >
      <span
        className={`material-symbols-outlined ${
          selected ? "text-primary" : "text-text-secondary"
        }`}
      >
        {icon}
      </span>

      <p className=" text-sm font-semibold">
        {label}
      </p>
    </div>
  );
}