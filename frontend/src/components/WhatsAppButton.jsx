export const SHOP_WHATSAPP_NUMBER = "9779815392825"; // Deep Computer And Solution, Biratnagar, Nepal

export default function WhatsAppButton({ message, className = "", children }) {
  const text = encodeURIComponent(
    message || "Hi Deep Computer And Solution, I'd like to ask about..."
  );
  const href = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-md bg-circuit hover:bg-circuit-dim text-base font-semibold px-4 py-2 transition-colors ${className}`}
    >
      {children || "Enquire on WhatsApp"}
    </a>
  );
}

// Floating action button shown on every page
export function WhatsAppFAB() {
  const href = `https://wa.me/${SHOP_WHATSAPP_NUMBER}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-circuit hover:bg-circuit-dim shadow-lg shadow-black/40 transition-colors"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-base" aria-hidden="true">
        <path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.3.63 4.45 1.73 6.3L4 29l7.86-1.7a11.9 11.9 0 0 0 4.15.74h.01c6.63 0 12-5.38 12-12.01C28.02 8.38 22.64 3 16.01 3zm0 21.6h-.01a9.6 9.6 0 0 1-4.9-1.35l-.35-.21-4.66 1.01 1-4.55-.23-.37a9.55 9.55 0 0 1-1.47-5.12c0-5.3 4.32-9.6 9.63-9.6 2.57 0 4.98 1 6.8 2.83a9.53 9.53 0 0 1 2.82 6.8c0 5.3-4.32 9.56-9.63 9.56zm5.27-7.18c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.44-.86-.76-1.44-1.7-1.6-1.99-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39s1.02 2.77 1.16 2.96c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
      </svg>
    </a>
  );
}
