export default function CategoryTabs({
    categories,
    activeCategory,
    onCategoryChange,
    mobile = false,
}) {
    if (mobile) {
        return (
            <select
                value={activeCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="h-12 w-full rounded-xl border border-border/30 bg-primary-surface px-4 text-sm text-text-secondary outline-none"
            >
                {categories.map((category) => (
                    <option key={category} value={category.name}>
                        {category}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition
    ${activeCategory === category
                            ? "bg-primary text-white shadow"
                            : "bg-primary-surface text-text-secondary hover:bg-primary-surface"
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}