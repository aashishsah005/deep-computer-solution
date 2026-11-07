import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import SketchLoader from "../components/SketchLoader";
import storefrontImage from "../assets/storefront.jpg";

const PATHS = [
  {
    to: "/products?condition=New",
    title: "Sales",
    desc: "New accessories, laptops, desktops & networking gear.",
    tag: "01",
  },
  {
    to: "/repair",
    title: "Repair",
    desc: "Diagnosis and repair for laptops, PCs and printers.",
    tag: "02",
  },
  {
    to: "/products?condition=Refurbished",
    title: "Refurbished",
    desc: "Tested, working systems, laptops & motherboards at a fair price.",
    tag: "03",
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    client
      .get("/products")
      .then((res) => setFeatured(res.data.filter((p) => p.featured).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoadingFeatured(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-circuit mb-4">
              Biratnagar, Nepal
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
              We keep your machines
              <span className="text-amber"> running.</span>
            </h1>
            <p className="mt-5 text-muted text-base leading-relaxed max-w-md">
              Deep Computer And Solution sells accessories and systems, repairs
              laptops and desktops, and stocks tested refurbished PCs and
              motherboards — all under one roof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-md bg-amber hover:bg-amber-dim text-base font-semibold px-5 py-2.5 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                to="/repair"
                className="rounded-md text-base font-semibold px-5 py-2.5 transition-all duration-200"
                style={{
                  border: "2px solid #f59e0b",
                  color: "#f59e0b",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f59e0b"; e.currentTarget.style.color = "#111"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#f59e0b"; }}
              >
                🛠️ Book a Repair
              </Link>
              <WhatsAppButton className="px-5 py-2.5">Ask on WhatsApp</WhatsAppButton>
            </div>
          </div>

          {/* Real Storefront Image */}
          <div className="relative aspect-[4/3] hidden md:block rounded-lg overflow-hidden border border-border" aria-hidden="true">
            <img
              src={storefrontImage}
              alt="Deep Computer & Solution Storefront"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Three doors into the site — a real structural choice, not decoration */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {PATHS.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              className="group bg-surface border border-border rounded-lg p-6 hover:border-amber/50 transition-colors"
            >
              <span className="font-mono text-xs text-muted">{p.tag}</span>
              <h3 className="mt-3 text-xl font-display font-semibold group-hover:text-amber transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured this week</h2>
          <Link to="/products" className="text-sm text-amber hover:underline">
            View all →
          </Link>
        </div>
        {loadingFeatured ? (
          <div className="py-12 flex justify-center">
            <SketchLoader text="Loading featured machines…" subtext="Deep Computer And Solution" size="sm" />
          </div>
        ) : featured.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted text-sm font-mono">No featured items at the moment.</p>
        )}
      </section>
    </div>
  );
}
