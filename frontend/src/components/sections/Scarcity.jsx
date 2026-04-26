import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Scarcity() {
  const [load, setLoad] = useState(null);

  useEffect(() => {
    let cancelled = false;
    axios
      .get(`${API}/applications/intake-load`)
      .then((res) => { if (!cancelled) setLoad(res.data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const inReview = load?.in_review_this_week ?? null;
  const remaining = load?.remaining_slots_this_month ?? null;
  const monthly = load?.monthly_slots ?? null;

  return (
    <section className="kk-section relative" style={{ background: "var(--kk-paper)" }} data-testid="section-scarcity">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Selective Access</div>
            <h2 className="font-display mt-5 text-[40px] md:text-[58px] leading-[1.02] font-medium tracking-tight">
              We only work with a limited number of founders per month.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Strategic time is the constrained resource. Quality of attention compounds when it is rationed. Every engagement is reviewed personally and matched to fit.
            </p>

            {/* Live intake signal */}
            {load && (
              <div
                className="mt-10 inline-flex items-center gap-3 py-3 px-5"
                style={{
                  background: "var(--kk-cream)",
                  border: "1px solid var(--kk-line)",
                  borderRadius: "999px",
                }}
                data-testid="intake-load-pill"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                    style={{ background: "var(--kk-copper)" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: "var(--kk-copper)" }}
                  />
                </span>
                <span className="text-[13px]" style={{ color: "var(--kk-ink)" }}>
                  Currently reviewing <strong>{inReview}</strong> {inReview === 1 ? "application" : "applications"} this week
                </span>
              </div>
            )}

            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="border-t pt-4" style={{ borderColor: "var(--kk-ink)" }}>
                <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Reviewed</div>
                <div className="font-display text-[20px] md:text-[24px] mt-2 leading-tight">Personally</div>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--kk-ink)" }}>
                <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Slots</div>
                <div className="font-display text-[20px] md:text-[24px] mt-2 leading-tight">
                  {remaining !== null && monthly !== null ? `${remaining} of ${monthly} left` : "Limited monthly"}
                </div>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--kk-ink)" }}>
                <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Access</div>
                <div className="font-display text-[20px] md:text-[24px] mt-2 leading-tight">By application</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
