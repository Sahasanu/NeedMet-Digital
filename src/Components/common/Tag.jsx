export default function Tag({ label }) {
    return (
        <span className="rounded-lg bg-primary-surface px-3 py-1 text-xs font-semibold text-text-secondary">
            {label}
        </span>
    );
}