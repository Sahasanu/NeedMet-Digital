export default function HeroBadge({
    icon = "verified",
    text
}) {
    return (
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 mx-auto lg:mx-0">

            <span className="material-symbols-outlined text-primary text-lg">
                {icon}
            </span>

            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {text}
            </span>

        </div>
    );
}