import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const STATUS_OPTIONS = [
  { v: "pending_review", label: "Pending review" },
  { v: "qualified", label: "Qualified" },
  { v: "declined", label: "Declined" },
];

const STATUS_TONE = {
  pending_review: { bg: "var(--kk-paper)", color: "var(--kk-ink)" },
  qualified: { bg: "var(--kk-ink)", color: "var(--kk-gold)" },
  declined: { bg: "var(--kk-paper)", color: "var(--kk-mute)" },
};

function fmtDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function Admin() {
  const [params, setParams] = useSearchParams();
  const initialToken =
    params.get("token") ||
    (typeof window !== "undefined" ? window.localStorage.getItem("kk_admin_token") || "" : "");
  const [token, setToken] = useState(initialToken);
  const [tokenInput, setTokenInput] = useState(initialToken);

  // Strip token from the URL after reading; persist in localStorage instead
  useEffect(() => {
    if (params.get("token")) {
      window.localStorage.setItem("kk_admin_token", params.get("token"));
      setParams({}, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const load = async (t) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/applications`, { params: { admin_token: t } });
      setApps(res.data || []);
    } catch (e) {
      setError(e?.response?.status === 401 ? "Invalid token" : "Failed to load");
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  const submitToken = (e) => {
    e.preventDefault();
    setToken(tokenInput);
    if (tokenInput) window.localStorage.setItem("kk_admin_token", tokenInput);
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API}/applications/${id}/status`,
        { status },
        { params: { admin_token: token } }
      );
      setApps((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch {
      setError("Update failed");
    }
  };

  const filtered = apps.filter((a) => filter === "all" || a.status === filter);
  const counts = {
    all: apps.length,
    pending_review: apps.filter((a) => a.status === "pending_review").length,
    qualified: apps.filter((a) => a.status === "qualified").length,
    declined: apps.filter((a) => a.status === "declined").length,
  };

  if (!token) {
    return (
      <div data-testid="admin-gate" className="min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-6 md:px-10 w-full">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Restricted</div>
          <h1 className="font-display mt-5 text-[40px] leading-tight font-medium tracking-tight">
            Admin access.
          </h1>
          <p className="mt-4 text-[15px]" style={{ color: "var(--kk-mute)" }}>
            Enter the admin token to review applications.
          </p>
          <form onSubmit={submitToken} className="mt-10 flex gap-3">
            <input
              className="kk-input flex-1"
              type="password"
              placeholder="Admin token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              data-testid="admin-token-input"
              autoFocus
            />
            <button className="kk-btn" type="submit" data-testid="admin-token-submit">
              Enter
            </button>
          </form>
          {error && (
            <div className="mt-4 text-[13px]" style={{ color: "var(--kk-copper-deep)" }}>
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="page-admin">
      <section className="pt-6 pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Operations</div>
          <div className="mt-3 flex items-end justify-between flex-wrap gap-4">
            <h1 className="font-display text-[40px] md:text-[56px] leading-tight font-medium tracking-tight">
              Application intake.
            </h1>
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "var(--kk-mute)" }}>
              <span data-testid="admin-total-count">{apps.length} total</span>
              <span>·</span>
              <button
                onClick={() => load(token)}
                className="link-underline"
                data-testid="admin-refresh"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-wrap gap-2 mb-8" data-testid="admin-filters">
            {[
              { k: "all", label: "All" },
              { k: "pending_review", label: "Pending" },
              { k: "qualified", label: "Qualified" },
              { k: "declined", label: "Declined" },
            ].map((f) => (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                className={`px-4 py-2 text-[13px] rounded-full transition-all ${
                  filter === f.k ? "kk-btn" : "kk-btn kk-btn-ghost"
                }`}
                data-testid={`admin-filter-${f.k}`}
              >
                {f.label} <span className="opacity-60 ml-1">({counts[f.k] ?? 0})</span>
              </button>
            ))}
          </div>

          {loading && <div style={{ color: "var(--kk-mute)" }}>Loading...</div>}
          {error && <div style={{ color: "var(--kk-copper-deep)" }} data-testid="admin-error">{error}</div>}

          {!loading && filtered.length === 0 && (
            <div className="py-20 text-center" style={{ color: "var(--kk-mute)" }}>
              No applications in this view.
            </div>
          )}

          <div className="divide-y" style={{ borderColor: "var(--kk-line)" }}>
            {filtered.map((a) => (
              <div key={a.id} className="py-6 grid grid-cols-12 gap-4 items-start" data-testid={`admin-row-${a.id}`}>
                <div className="col-span-12 md:col-span-3">
                  <div className="font-display text-[20px] leading-tight">{a.name}</div>
                  <div className="text-[13px]" style={{ color: "var(--kk-mute)" }}>{a.email}</div>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Company</div>
                  <div className="text-[14px] mt-1">{a.company}</div>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Stage / Urgency</div>
                  <div className="text-[14px] mt-1">{a.stage} · {a.urgency}</div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Submitted</div>
                  <div className="text-[14px] mt-1">{fmtDate(a.created_at)}</div>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-col items-start md:items-end gap-2">
                  <div
                    className="px-3 py-1 text-[11px] tracking-[0.18em] uppercase"
                    style={{
                      background: STATUS_TONE[a.status]?.bg || "var(--kk-paper)",
                      color: STATUS_TONE[a.status]?.color || "var(--kk-ink)",
                      borderRadius: "999px",
                    }}
                    data-testid={`admin-status-${a.id}`}
                  >
                    {a.status.replace("_", " ")}
                  </div>
                  <button
                    onClick={() => setSelected(a)}
                    className="link-underline text-[13px] mt-1"
                    data-testid={`admin-open-${a.id}`}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex justify-end"
          style={{ background: "rgba(26,20,16,0.55)" }}
          onClick={() => setSelected(null)}
          data-testid="admin-drawer"
        >
          <aside
            className="w-full max-w-xl h-full overflow-y-auto p-10"
            style={{ background: "var(--kk-cream)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Application</div>
              <button
                onClick={() => setSelected(null)}
                className="text-[20px]"
                style={{ color: "var(--kk-ink)" }}
                data-testid="admin-drawer-close"
              >
                ×
              </button>
            </div>

            <h2 className="font-display text-[36px] leading-tight font-medium mt-4">
              {selected.name}
            </h2>
            <div className="text-[14px] mt-1" style={{ color: "var(--kk-mute)" }}>
              {selected.email}
              {selected.website ? <> · <a className="link-underline" href={selected.website} target="_blank" rel="noreferrer">{selected.website}</a></> : null}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                ["Company", selected.company],
                ["Stage", selected.stage],
                ["Urgency", selected.urgency],
                ["Budget", selected.budget || "n/a"],
                ["Commitment", selected.commitment],
                ["Submitted", fmtDate(selected.created_at)],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>{k}</div>
                  <div className="text-[14px] mt-1">{v || "n/a"}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Situation</div>
              <div className="text-[15px] mt-2">{selected.situation}</div>
            </div>

            <div className="mt-6">
              <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Challenge</div>
              <p className="text-[15px] leading-relaxed mt-2 whitespace-pre-wrap">{selected.challenge}</p>
            </div>

            <div className="mt-12">
              <div className="font-mono-label mb-3" style={{ color: "var(--kk-mute)" }}>Decision</div>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => updateStatus(selected.id, opt.v)}
                    className={`px-4 py-2 text-[13px] rounded-full transition-all ${
                      selected.status === opt.v ? "kk-btn" : "kk-btn kk-btn-ghost"
                    }`}
                    data-testid={`admin-set-${opt.v}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
