import ownerSketch from "../assets/owner-sketch.jpg";

export default function SketchLoader({
  size = "md",
  text = "Loading…",
  subtext = "Deep Computer And Solution",
  fullScreen = false,
  className = "",
}) {
  const sizeMap = {
    sm: {
      container: "w-16 h-16",
      borderOffset: "inset-[-6px]",
      strokeWidth: "2",
      textClass: "text-xs",
    },
    md: {
      container: "w-24 h-24",
      borderOffset: "inset-[-8px]",
      strokeWidth: "2.5",
      textClass: "text-sm",
    },
    lg: {
      container: "w-32 h-32",
      borderOffset: "inset-[-10px]",
      strokeWidth: "3",
      textClass: "text-base",
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 py-6 ${className}`}>
      {/* Outer wrapper with pulsating glow */}
      <div className="relative flex items-center justify-center">
        {/* Ambient pulsing blur */}
        <div className="absolute inset-0 rounded-full bg-amber/25 blur-xl animate-pulse" />

        {/* Outer rotating SVG dashed orbit ring */}
        <div className={`absolute ${currentSize.borderOffset} animate-spin-slow pointer-events-none`}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB020" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#34C77B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FFB020" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="url(#orbitGradient)"
              strokeWidth={currentSize.strokeWidth}
              strokeDasharray="20 10 32 12"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Counter-rotating subtle circuit ring */}
        <div className={`absolute ${currentSize.borderOffset} animate-spin-reverse pointer-events-none opacity-60`}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#34C77B"
              strokeWidth="1"
              strokeDasharray="4 16"
            />
          </svg>
        </div>

        {/* Sketch Portrait Container */}
        <div
          className={`relative ${currentSize.container} rounded-full overflow-hidden border-2 border-amber/80 shadow-lg shadow-amber/20 animate-sketch-pulse bg-surface`}
        >
          <img
            src={ownerSketch}
            alt="Deep Computer And Solution"
            className="w-full h-full object-cover object-center select-none"
          />

          {/* Pencil scan / sheen effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber/25 to-transparent animate-sketch-scan pointer-events-none" />

          {/* Subtle vignette border inside circle */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/40 pointer-events-none" />
        </div>
      </div>

      {/* Text labels */}
      {(text || subtext) && (
        <div className="text-center space-y-1">
          {text && (
            <p className={`font-mono ${currentSize.textClass} text-ink font-medium tracking-wide flex items-center justify-center gap-1.5`}>
              <span>{text}</span>
              <span className="inline-flex gap-1 ml-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-bounce" />
              </span>
            </p>
          )}
          {subtext && (
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {subtext}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-base/85 backdrop-blur-md transition-all duration-300">
        {content}
      </div>
    );
  }

  return content;
}
