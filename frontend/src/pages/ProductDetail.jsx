import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../api/client";
import { StockBadge } from "../components/StatusBadge";
import WhatsAppButton from "../components/WhatsAppButton";
import SketchLoader from "../components/SketchLoader";
import { formatPrice } from "../utils/format";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    client.get(`/products/${id}`).then((res) => setProduct(res.data)).catch(() => {});
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-24 flex justify-center">
        <SketchLoader text="Loading product details…" subtext="Deep Computer And Solution" size="md" />
      </div>
    );
  }

  const image = product.images?.[activeImg]?.url;

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <Link to="/products" className="text-sm text-muted hover:text-amber">← Back to products</Link>

      <div className="mt-6 grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-surfacealt border border-border rounded-lg overflow-hidden">
            {image ? (
              <img src={image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted text-xs font-mono">No image</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={img.publicId || i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded border overflow-hidden ${i === activeImg ? "border-amber" : "border-border"}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            {product.condition === "Refurbished" && (
              <span className="shrink-0 text-xs font-mono uppercase tracking-wide text-amber border border-amber/40 rounded px-2 py-1">
                Refurbished
              </span>
            )}
          </div>
          <p className="text-muted text-sm mt-1">{product.category}</p>

          <p className="font-mono text-3xl font-semibold mt-4">{formatPrice(product.price)}</p>
          <div className="mt-2"><StockBadge status={product.stock} /></div>

          {product.specs && (
            <div className="mt-6 bg-surface border border-border rounded-lg p-4">
              <h3 className="text-xs uppercase tracking-wide text-muted mb-2">Specifications</h3>
              <p className="font-mono text-sm whitespace-pre-line">{product.specs}</p>
            </div>
          )}

          {product.description && (
            <p className="mt-6 text-sm text-muted leading-relaxed">{product.description}</p>
          )}

          <WhatsAppButton
            message={`Hi, I'm interested in "${product.name}" (${formatPrice(product.price)}) listed on your website.`}
            className="mt-8 px-6 py-3"
          >
            Enquire on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
