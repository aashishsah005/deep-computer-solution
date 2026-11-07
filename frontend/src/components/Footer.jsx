export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-5 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <h3 className="font-display font-semibold text-ink mb-2">Deep Computer And Solution</h3>
          <p className="text-muted leading-relaxed">
            Sales, service and refurbished systems — accessories, laptops, desktops
            and motherboards, repaired and sold with a straight answer every time.
          </p>
        </div>
        <div>
          <h4 className="text-ink font-medium mb-2">Contact</h4>
          <ul className="text-muted space-y-1">
            <li>Phone / WhatsApp: +977 980-7305174</li>
            <li>Email: info@deepcomputersolution.com</li>
            <li>Rangeli Rd, Biratnagar 56613, Nepal</li>
          </ul>
        </div>
        <div>
          <h4 className="text-ink font-medium mb-2">Hours</h4>
          <ul className="text-muted space-y-1 font-mono text-xs">
            <li>Open daily</li>
            <li>Flexible hours — message ahead</li>
          </ul>
        </div>
      </div>
      <div className="trace-divider" />
      <p className="text-center text-xs text-muted py-4">
        © {new Date().getFullYear()} Deep Computer And Solution. All rights reserved.
      </p>
    </footer>
  );
}
