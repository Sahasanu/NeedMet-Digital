import Container from "../layout/Container";

import CategoryTabs from "./CategoryTabs";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";

const SORT_LABELS = {
    default: "Sort",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    title: "Name: A to Z",
};

export default function FilterBar({
    categories,
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    onSort,
    sortBy = "default"
}) {

    return (

        <section className=" border-b border-[#bcc9c6]/20 bg-[#faf8ff]/80 px-4 py-4 backdrop-blur-md">
            {/* Desktop */}
            <div className="hidden items-center justify-between gap-4 md:flex">
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={onCategoryChange}
                />

                <SearchBar
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="max-w-md flex-1"
                />

                <SortButton
                    onClick={onSort}
                    label={SORT_LABELS[sortBy] || "Sort"}
                />
            </div>

            {/* Mobile */}
            <div className="space-y-3 md:hidden">
                <SearchBar
                    value={searchQuery}
                    onChange={onSearchChange}
                />

                <div className="grid grid-cols-2 gap-3">
                    <CategoryTabs
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={onCategoryChange}
                        mobile
                    />

                    <SortButton
                        onClick={onSort}
                        label={SORT_LABELS[sortBy] || "Sort"}
                    />
                </div>
            </div>
        </section>

    );
}
