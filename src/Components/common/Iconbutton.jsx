import { Link } from "react-router-dom";

export default function IconButton({
    icon,
    onClick,
    variant = "default",
    to
}) {

    const styles = {
        default:
            "bg-primary/5 text-primary hover:bg-primary hover:text-white",

        primary:
            "bg-gradient-to-br from-primary to-primary-light text-white"
    };

    const className = `inline-flex rounded-2xl p-3 transition-all duration-300 ${styles[variant]}`;

    const content = (
        <span className="material-symbols-outlined">
            {icon}
        </span>
    );

    if (to) {
        return (
            <Link to={to} className={className} aria-label="View service">
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={className}
        >
            {content}
        </button>
    );

}
