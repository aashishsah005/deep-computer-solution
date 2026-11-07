import { useState } from "react";
import client from "../api/client";
import { SHOP_WHATSAPP_NUMBER } from "../components/WhatsAppButton";

const SERVICES = [
  { device: "Laptop", issues: ["Screen replacement", "Keyboard/trackpad repair", "Battery replacement", "Motherboard chip-level repair", "OS install & data recovery"] },
  { device: "Desktop PC", issues: ["Hardware diagnosis", "Component upgrade (RAM/SSD/GPU)", "Power supply issues", "Custom PC assembly", "Virus/OS cleanup"] },
  { device: "Printer", issues: ["Print head cleaning", "Paper jam / feed issues", "Cartridge & driver setup"] },
];

const initialForm = { name: "", phone: "", deviceType: "Laptop", issue: "" };

export default function RepairServices() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await client.post("/repairs", form);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-semibold mb-2">Repair Services</h1>
      <p className="text-muted mb-10 max-w-xl">
        Bring in the device or book a request below — we'll call to confirm timing and an estimate before any work starts.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {SERVICES.map((s) => (
            <div key={s.device} className="bg-surface border border-border rounded-lg p-5">
              <h3 className="font-display font-semibold mb-3">{s.device}</h3>
              <ul className="space-y-1.5">
                {s.issues.map((i) => (
                  <li key={i} className="text-sm text-muted flex items-start gap-2">
                    <span className="text-circuit mt-1">•</span>{i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 h-fit">
          <h3 className="font-display font-semibold mb-4">Book a repair</h3>

          {status === "success" ? (
            <div className="text-circuit text-sm border border-circuit/30 rounded-md p-4">
              Request received — we'll call you shortly to confirm.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted block mb-1">Your name</label>
                <input required name="name" value={form.name} onChange={handleChange}
                  className="w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Phone number</label>
                <input required name="phone" value={form.phone} onChange={handleChange} type="tel"
                  className="w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Device type</label>
                <select name="deviceType" value={form.deviceType} onChange={handleChange}
                  className="w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber">
                  <option>Laptop</option>
                  <option>Desktop PC</option>
                  <option>Printer</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Describe the issue</label>
                <textarea required name="issue" value={form.issue} onChange={handleChange} rows={4}
                  className="w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber" />
              </div>
              {status === "error" && (
                <p className="text-alert text-sm">Something went wrong — please try again or WhatsApp us directly.</p>
              )}
              <button type="submit" disabled={status === "submitting"}
                className="w-full rounded-md bg-amber hover:bg-amber-dim text-base font-semibold px-5 py-2.5 transition-colors disabled:opacity-60">
                {status === "submitting" ? "Sending…" : "Submit request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
