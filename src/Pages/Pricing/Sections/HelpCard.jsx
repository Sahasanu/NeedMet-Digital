export default function HelpCard() {
  return (
    <div className="rounded-3xl shadow-2xl bg-white px-4 py-3">
      <h3 className="font-bold">Need Help?</h3>
      
      <p className=" text-sm text-text-secondary">
        Our experts are available 24/7.
      </p>

      <button
        type="button"
        onClick={() => window.location.href = "mailto:hello@needmetdigital.com?subject=Schedule%20a%20Call"}
        className="mt-2 w-full rounded-xl border border-primary py-1 text-primary transition hover:bg-primary hover:text-white"
      >
        Schedule Call
      </button>
    </div>
  );
}