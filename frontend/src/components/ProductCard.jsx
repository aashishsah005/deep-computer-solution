import { Link } from "react-router-dom";
import { StockBadge } from "./StatusBadge";
import WhatsAppButton from "./WhatsAppButton";
import { formatPrice } from "../utils/format";

export default function ProductCard({ product }) {
  const image = product.images?.[0]?.url;

  return (
    <div className="group bg-surface border border-border rounded-lg overflow-hidden flex flex-col hover:border-amber/50 transition-colors">
      <Link to={`/products/${product._id}`} className="block aspect-square bg-surfacealt overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs font-mono">
            No image
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product._id}`} className="font-medium text-sm leading-snug hover:text-amber transition-colors">
            {product.name}
          </Link>
          {product.condition === "Refurbished" && (
            <span className="shrink-0 text-[10px] font-mono uppercase tracking-wide text-amber border border-amber/40 rounded px-1.5 py-0.5">
              Refurb
            </span>
          )}
        </div>

        {product.specs && (
          <p className="text-xs font-mono text-muted line-clamp-2">{product.specs}</p>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-mono text-base font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.stock !== "In Stock" && (
            <StockBadge status={product.stock} />
          )}
        </div>

        <WhatsAppButton
          message={`Hi, I'm interested in "${product.name}" (${formatPrice(product.price)}) listed on your website.`}
          className="mt-2 justify-center text-sm py-1.5"
        >
          Enquire
        </WhatsAppButton>
      </div>
    </div>
  );
}
