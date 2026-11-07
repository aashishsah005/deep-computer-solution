import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await client.post("/auth/login", form);
      localStorage.setItem("dcs_admin_token", data.token);
      localStorage.setItem("dcs_admin_name", data.name);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-surface border border-border rounded-lg p-8">
        <h1 className="font-display font-semibold text-xl mb-1">Admin Login</h1>
        <p className="text-muted text-sm mb-6">Deep Computer And Solution</p>

        <label className="text-xs text-muted block mb-1">Email</label>
        <input
          required type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-amber"
        />

        <label className="text-xs text-muted block mb-1">Password</label>
        <input
          required type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:border-amber"
        />

        {error && <p className="text-alert text-sm mb-4">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full rounded-md bg-amber hover:bg-amber-dim text-base font-semibold px-5 py-2.5 transition-colors disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
