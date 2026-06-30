export default function SortButton({
    value = "default",
    onChange,
    options = [
        { value: "default", label: "Sort: Default" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "title", label: "Name: A to Z" },
    ]
}) {
    return (
        <div className="relative w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-primary pointer-events-none">
                tune
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 w-full md:w-auto appearance-none rounded-xl border border-border/30 bg-white pl-11 pr-10 text-sm font-medium text-text outline-none transition-all hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-lg text-primary pointer-events-none">
                expand_more
            </span>
        </div>
    );
}
