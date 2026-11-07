export default function SimpleLoader({
  text = "Loading…",
  size = "md",
  className = "",
}) {
  const sizeMap = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-10 h-10 border-3",
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-8 ${className}`}>
      <div
        className={`${spinnerSize} rounded-full border-border border-t-amber animate-spin`}
        role="status"
        aria-label="loading"
      />
      {text && (
        <p className="text-muted font-mono text-xs sm:text-sm tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}
