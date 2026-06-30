import { useNavigate } from "react-router-dom";

export default function ServiceCard({
    id,
    title,
    description,
    image,
    icon,
    price,
    tags = [],
    badge,
    badgeColor,
    featured = false,
    buttonIcon = "add_shopping_cart"
}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (id) {
            navigate(`/service/${id}`);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            role={id ? "link" : undefined}
            tabIndex={id ? 0 : undefined}
            onKeyDown={(e) => {
                if (id && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleCardClick();
                }
            }}
            className={`group bg-white rounded-3xl border overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
                featured ? "border-primary/40 ring-2 ring-primary/10" : "border-border/50 hover:border-primary/30"
            } ${id ? "cursor-pointer" : ""}`}
        >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {badge && (
                    <div className="absolute top-4 left-4">
                        <span className={`${badgeColor || "bg-white/90 text-primary"} backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm`}>
                            {badge}
                        </span>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
                {/* TITLE */}
                <div className="flex items-start gap-2 h-[56px]">
                    <span className="material-symbols-outlined mt-0.5 text-primary shrink-0">
                        {icon}
                    </span>
                    <h3
                        className="text-lg font-bold text-text line-clamp-2 leading-tight"
                        title={title}
                    >
                        {title}
                    </h3>
                </div>

                {/* DESCRIPTION */}
                <p
                    className="text-sm text-text-secondary line-clamp-2 h-[40px] leading-tight"
                    title={description}
                >
                    {description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 h-[26px] overflow-hidden">
                    {tags.length > 0 ? (
                        tags.map((tag, idx) => (
                            <span key={idx} className="bg-background-secondary px-2 py-1 rounded-lg text-xs font-medium text-text-secondary border border-border/50">
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="bg-transparent px-2 py-1 rounded-lg text-xs invisible">placeholder</span>
                    )}
                </div>

                {/* PRICE & ACTION */}
                <div className="pt-4 flex items-center justify-between border-t border-border/40 mt-auto">
                    <div>
                        <p className="text-xs text-text-secondary mb-0.5 font-medium">
                            {featured ? "Bundle Price" : "Starts at"}
                        </p>
                        <p className="text-xl font-bold text-primary leading-none">
                            {price}
                        </p>
                    </div>

                    <button 
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-3 rounded-2xl transition-all flex items-center justify-center shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                        }}
                    >
                        <span className="material-symbols-outlined">{buttonIcon}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}