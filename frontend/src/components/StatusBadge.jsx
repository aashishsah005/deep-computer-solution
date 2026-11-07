const STOCK_MAP = {
  "In Stock": { dot: "led-instock", label: "In Stock" },
  "Out of Stock": { dot: "led-outofstock", label: "Out of Stock" },
  "Limited": { dot: "led-limited", label: "Limited Stock" },
};

const REPAIR_MAP = {
  "Pending": { dot: "led-pending", label: "Pending" },
  "In Progress": { dot: "led-progress", label: "In Progress" },
  "Completed": { dot: "led-completed", label: "Completed" },
};

export function StockBadge({ status }) {
  const s = STOCK_MAP[status] || STOCK_MAP["In Stock"];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted">
      <span className={`led-dot ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

export function RepairStatusBadge({ status }) {
  const s = REPAIR_MAP[status] || REPAIR_MAP["Pending"];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted">
      <span className={`led-dot ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}
