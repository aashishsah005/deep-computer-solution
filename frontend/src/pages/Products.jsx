import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../api/client";
import ProductCard from "../components/ProductCard";
import SketchLoader from "../components/SketchLoader";

const CATEGORIES = [
  "Accessories",
  "Laptop",
  "Desktop PC",
  "Motherboard",
  "Monitor",
  "Printer",
  "Networking",
  "Other",
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "";
  const condition = searchParams.get("condition") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (condition) params.condition = condition;
    if (search) params.search = search;

    client
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, condition, search]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-semibold mb-2">Products</h1>
      <p className="text-muted mb-8">New and refurbished — accessories, systems, and parts.</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <input
          type="search"
          placeholder="Search products..."
          defaultValue={search}
          onKeyDown={(e) => e.key === "Enter" && updateParam("search", e.target.value)}
          className="bg-surface border border-border rounded-md px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:border-amber"
        />
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="bg-surface border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={condition}
          onChange={(e) => updateParam("condition", e.target.value)}
          className="bg-surface border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber"
        >
          <option value="">New & Refurbished</option>
          <option value="New">New only</option>
          <option value="Refurbished">Refurbished only</option>
        </select>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <SketchLoader text="Loading catalog…" subtext="Deep Computer And Solution" size="md" />
        </div>
      ) : products.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-muted">No products match these filters yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
