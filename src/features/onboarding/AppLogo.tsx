/** Placeholder wordmark until dedicated MicroPythonOS IDE artwork exists. */
export function AppLogo({ size = 72, className = '' }: { size?: number; className?: string }) {
    return (
        <svg
            viewBox="0 0 72 72"
            width={size}
            height={size}
            className={className}
            aria-hidden
        >
            <rect x="2" y="2" width="68" height="68" rx="12" fill="currentColor" className="text-(--brand-purple)" />
            <text
                x="36"
                y="44"
                textAnchor="middle"
                fontFamily="ui-rounded, system-ui, sans-serif"
                fontWeight="900"
                fontSize="30"
                fill="#ffffff"
            >
                μ
            </text>
        </svg>
    )
}
