export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
      <div className="grid sm:grid-cols-2 gap-6 text-sm">
        <div className="bg-surface border border-border rounded-lg p-5">
          <h3 className="text-muted text-xs uppercase tracking-wide mb-2">Visit</h3>
          <p>Rangeli Rd, Biratnagar 56613, Nepal</p>
          <p className="text-muted text-xs mt-2">Open daily — flexible hours, message ahead to confirm.</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-5">
          <h3 className="text-muted text-xs uppercase tracking-wide mb-2">Reach us</h3>
          <p>Phone / WhatsApp: +977 980-7305174</p>
          <p>Email: info@deepcomputersolution.com</p>
        </div>
      </div>
      <div className="mt-8 aspect-video bg-surfacealt border border-border rounded-lg overflow-hidden">
        <iframe
          title="Deep Computer And Solution location"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=26.4582326,87.282537&z=17&output=embed"
        />
      </div>
    </div>
  );
}
