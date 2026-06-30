export default function HeroStatsCard({
    icon = "trending_up",
    title,
    value,
    progress = 75
}) {
    return (
        <div className="absolute -bottom-8 -left-8 max-w-[240px] rounded-2xl border border-white/40 bg-white/80 p-4 shadow-xl backdrop-blur-xl">

            <div className="mb-3 flex items-center gap-4">

                <div className="rounded-xl bg-primary/10 p-2">
                    <span className="material-symbols-outlined text-primary">
                        {icon}
                    </span>
                </div>

                <div>
                    <p className="text-xs font-semibold text-text-secondary">
                        {title}
                    </p>

                    <h3 className="text-2xl font-bold text-text">
                        {value}
                    </h3>
                </div>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-primary-surface">

                <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${progress}%` }}
                />

            </div>

        </div>
    );
}