interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  variant?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "dark",
  className = "",
}: SectionHeadingProps) {
  const isLight = variant === "light";
  const alignment = align === "center" ? "items-center text-center" : "items-start text-right";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`text-sm font-semibold tracking-wide mb-3 ${
            isLight ? "text-accent-light" : "text-accent"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${
          isLight ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <span
        className={`mt-4 h-1 w-16 rounded-full ${
          align === "center" ? "" : "self-end"
        } ${isLight ? "bg-accent-light" : "bg-accent"}`}
      />
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base sm:text-lg leading-relaxed ${
            isLight ? "text-white/80" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
