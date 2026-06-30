export default function SearchBar({
    value,
    onChange,
    placeholder = "Search services..."
}) {
    return (
        <div className="relative w-full md:w-72">

            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                search
            </span>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

        </div>
    );
}