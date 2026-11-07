import { useEffect, useState } from "react";
import client from "../../api/client";
import { RepairStatusBadge } from "../../components/StatusBadge";

const STATUSES = ["Pending", "In Progress", "Completed"];

export default function AdminRepairs() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("");

  const load = () => {
    client.get("/repairs", { params: filter ? { status: filter } : {} })
      .then((res) => setRequests(res.data))
      .catch(() => {});
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    await client.patch(`/repairs/${id}`, { status });
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this repair request?")) return;
    await client.delete(`/repairs/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Repair Requests</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}
          className="bg-surfacealt border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-amber">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid gap-4">
        {requests.map((r) => (
          <div key={r._id} className="bg-surface border border-border rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm sm:text-base">
                {r.name} · <span className="text-muted font-mono text-xs sm:text-sm">{r.phone}</span>
              </p>
              <p className="text-xs sm:text-sm text-muted mt-1">{r.deviceType} — {r.issue}</p>
              <p className="text-[10px] sm:text-xs text-muted mt-1 font-mono">
                {new Date(r.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
              <RepairStatusBadge status={r.status} />
              <select value={r.status} onChange={(e) => updateStatus(r._id, e.target.value)}
                className="bg-surfacealt border border-border rounded-md px-2 py-1 text-xs sm:text-sm focus:outline-none focus:border-amber">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => handleDelete(r._id)} className="text-alert text-xs sm:text-sm hover:underline font-medium">Delete</button>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted">
            No repair requests {filter && `with status "${filter}"`} yet.
          </div>
        )}
      </div>
    </div>
  );
}
