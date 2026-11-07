import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../api/client";
import { StockBadge, RepairStatusBadge } from "../../components/StatusBadge";
import SketchLoader from "../../components/SketchLoader";
import { formatPrice } from "../../utils/format";

const REPAIR_STATUSES = ["Pending", "In Progress", "Completed"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, pendingRepairs: 0, totalRepairs: 0 });
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [repairFilter, setRepairFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [productsRes, repairsRes] = await Promise.all([
        client.get("/products"),
        client.get("/repairs")
      ]);

      setProducts(productsRes.data);
      
      // Filter repairs if a status is selected
      const allRepairs = repairsRes.data;
      setRequests(allRepairs);

      setStats({
        products: productsRes.data.length,
        pendingRepairs: allRepairs.filter((r) => r.status === "Pending").length,
        totalRepairs: allRepairs.length,
      });
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateRepairStatus = async (id, status) => {
    try {
      await client.patch(`/repairs/${id}`, { status });
      loadData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!confirm("Delete this repair request?")) return;
    try {
      await client.delete(`/repairs/${id}`);
      loadData();
    } catch (err) {
      alert("Failed to delete request");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await client.delete(`/products/${id}`);
      loadData();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  // Filter repair requests list locally for display
  const displayedRequests = repairFilter 
    ? requests.filter(r => r.status === repairFilter)
    : requests;

  const cards = [
    { label: "Total Products", value: stats.products, link: "/admin/products" },
    { label: "Pending Repair Requests", value: stats.pendingRepairs, highlight: true, link: "/admin/repairs" },
    { label: "Total Repair Requests", value: stats.totalRepairs, link: "/admin/repairs" },
  ];

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <SketchLoader text="Loading dashboard data…" subtext="Deep Computer And Solution" size="md" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link 
            key={c.label} 
            to={c.link}
            className="bg-surface border border-border rounded-lg p-6 block hover:border-amber/40 transition-colors"
          >
            <p className="text-xs text-muted uppercase tracking-wide">{c.label}</p>
            <p className={`text-3xl font-display font-semibold mt-2 ${c.highlight ? "text-amber" : "text-ink"}`}>
              {c.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Repair Requests list */}
        <div className="lg:col-span-12 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-semibold">Recent Repair Requests</h2>
            
            <div className="flex items-center gap-3">
              <select 
                value={repairFilter} 
                onChange={(e) => setRepairFilter(e.target.value)}
                className="bg-surfacealt border border-border rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-amber"
              >
                <option value="">All statuses</option>
                {REPAIR_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <Link to="/admin/repairs" className="text-xs text-amber hover:underline">
                Manage All →
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {displayedRequests.slice(0, 5).map((r) => (
              <div key={r._id} className="bg-surface border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-sm">
                    {r.name} · <span className="text-muted font-mono text-xs">{r.phone}</span>
                  </p>
                  <p className="text-xs text-muted mt-1">{r.deviceType} — {r.issue}</p>
                  <p className="text-[10px] text-muted mt-1.5 font-mono">
                    {new Date(r.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <RepairStatusBadge status={r.status} />
                  <select 
                    value={r.status} 
                    onChange={(e) => updateRepairStatus(r._id, e.target.value)}
                    className="bg-surfacealt border border-border rounded-md px-2 py-1 text-xs focus:outline-none focus:border-amber"
                  >
                    {REPAIR_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => handleDeleteRequest(r._id)} 
                    className="text-alert text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {displayedRequests.length === 0 && (
              <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
                No repair requests found.
              </div>
            )}
          </div>
        </div>

        {/* Products Catalog Section */}
        <div className="lg:col-span-12 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-semibold">Products Catalog</h2>
            <Link to="/admin/products" className="text-xs text-amber hover:underline">
              Manage Products →
            </Link>
          </div>

          {/* Mobile Products List (Card View) */}
          <div className="sm:hidden space-y-3">
            {products.slice(0, 10).map((p) => (
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
                      onClick={() => navigate(`/admin/products`)}
                      className="text-signal hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
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
                No products found.
              </div>
            )}
          </div>

          {/* Desktop Products Table */}
          <div className="hidden sm:block bg-surface border border-border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-border">
                  <th className="p-3 text-xs uppercase tracking-wide font-semibold">Name</th>
                  <th className="p-3 text-xs uppercase tracking-wide font-semibold">Category</th>
                  <th className="p-3 text-xs uppercase tracking-wide font-semibold">Price</th>
                  <th className="p-3 text-xs uppercase tracking-wide font-semibold">Stock</th>
                  <th className="p-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map((p) => (
                  <tr key={p._id} className="border-b border-border last:border-0 hover:bg-surfacealt/25 transition-colors">
                    <td className="p-3 font-medium">
                      {p.name} {p.condition === "Refurbished" && <span className="text-amber text-xs font-mono ml-1.5 border border-amber/30 rounded px-1 py-0.5">Refurb</span>}
                    </td>
                    <td className="p-3 text-muted text-xs">{p.category}</td>
                    <td className="p-3 font-mono text-xs">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <StockBadge status={p.stock} />
                    </td>
                    <td className="p-3 text-right whitespace-nowrap text-xs">
                      <button 
                        onClick={() => navigate(`/admin/products`)} 
                        className="text-signal hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(p._id)} 
                        className="text-alert hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
