import { useEffect, useState } from "react";
import client from "../../api/client";
import { StockBadge } from "../../components/StatusBadge";
import { formatPrice } from "../../utils/format";

const emptyForm = {
  name: "", category: "Accessories", condition: "New", price: "",
  stock: "In Stock", description: "", specs: "", featured: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => client.get("/products").then((res) => setProducts(res.data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name, category: p.category, condition: p.condition, price: p.price,
      stock: p.stock, description: p.description || "", specs: p.specs || "", featured: p.featured,
    });
    setFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setFiles([]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      files.forEach((f) => data.append("images", f));

      if (editingId) {
        await client.put(`/products/${editingId}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await client.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } });
      }
      resetForm();
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await client.delete(`/products/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Products</h1>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-4 sm:p-6 mb-10 grid sm:grid-cols-2 gap-4 w-full min-w-0 max-w-full">
        <h2 className="sm:col-span-2 font-display font-semibold">
          {editingId ? "Edit product" : "Add new product"}
        </h2>

        <input required name="name" placeholder="Product name" value={form.name} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:border-amber" />

        <select name="category" value={form.category} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber">
          {["Accessories","Laptop","Desktop PC","Motherboard","Monitor","Printer","Networking","Other"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select name="condition" value={form.condition} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber">
          <option>New</option>
          <option>Refurbished</option>
        </select>

        <input required name="price" type="number" min="0" placeholder="Price (NPR)" value={form.price} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber" />

        <select name="stock" value={form.stock} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber">
          <option>In Stock</option>
          <option>Limited</option>
          <option>Out of Stock</option>
        </select>

        <input name="specs" placeholder="Specs, e.g. i5 10th Gen / 8GB / 512GB SSD" value={form.specs} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:border-amber" />

        <textarea name="description" placeholder="Description" rows={3} value={form.description} onChange={handleChange}
          className="w-full min-w-0 max-w-full bg-surfacealt border border-border rounded-md px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:border-amber" />

        <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files))}
          className="w-full min-w-0 max-w-full text-sm sm:col-span-2" />

        <label className="flex items-center gap-2 text-sm text-muted sm:col-span-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Show on homepage as featured
        </label>

        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={saving}
            className="rounded-md bg-amber hover:bg-amber-dim text-base font-semibold px-5 py-2.5 transition-colors disabled:opacity-60">
            {saving ? "Saving…" : editingId ? "Update product" : "Add product"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-sm text-muted hover:text-ink">
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* Mobile Products Card List */}
      <div className="sm:hidden space-y-3">
        {products.map((p) => (
          <div key={p._id} className="bg-surface border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-sm text-ink">
                  {p.name}
                  {p.condition === "Refurbished" && (
                    <span className="text-amber text-xs font-mono ml-1.5 border border-amber/30 rounded px-1 py-0.5 inline-block">
                      Refurb
                    </span>
                  )}
                </h3>
                <p className="text-xs text-muted mt-0.5">{p.category}</p>
              </div>
              <StockBadge status={p.stock} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <span className="font-mono text-sm font-semibold text-amber">
                {formatPrice(p.price)}
              </span>
              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => startEdit(p)}
                  className="text-signal hover:underline font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-alert hover:underline font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="bg-surface border border-border rounded-lg p-6 text-center text-muted text-sm">
            No products yet.
          </div>
        )}
      </div>

      {/* Desktop Products Table */}
      <div className="hidden sm:block bg-surface border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted border-b border-border">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-border last:border-0">
                <td className="p-3">{p.name} {p.condition === "Refurbished" && <span className="text-amber text-xs">(Refurb)</span>}</td>
                <td className="p-3 text-muted">{p.category}</td>
                <td className="p-3 font-mono">{formatPrice(p.price)}</td>
                <td className="p-3"><StockBadge status={p.stock} /></td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button onClick={() => startEdit(p)} className="text-signal hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-alert hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-muted">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
