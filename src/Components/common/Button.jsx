const variants = {
  primary:
    "bg-gradient-to-br from-primary to-primary-light text-white shadow-lg hover:scale-105",

  secondary:
    "bg-white border border-border hover:bg-primary-surface/20 text-text",

  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white",

  ghost:
    "text-text-secondary hover:text-primary"
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
      rounded-full
      transition-all
      duration-300
      font-medium
      ${variants[variant]}
      ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}