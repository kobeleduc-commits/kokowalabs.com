import { Link } from "react-router-dom";

const OFFERS = [
  {
    code: "I",
    title: "Strategic Diagnostic Intensive",
    outcome: "A complete read of your business, the gaps, and the highest leverage move.",
    bullets: [
      "Full strategic audit of positioning and economics",
      "Sequenced priority map (next 90 days)",
      "Decision-grade clarity on the single highest leverage move",
    ],
    horizon: "Single intensive engagement",
    forWho: "Founders ready to stop guessing.",
  },
  {
    code: "II",
    title: "Coffee Business Architecture Sprint",
    outcome: "A coherent business architecture: positioning, offer structure, commercial logic.",
    bullets: [
      "Differentiated positioning rebuilt from origin to crema",
      "Offer architecture and pricing logic",
      "Commercial sequencing for the next 12 months",
    ],
    horizon: "Multi-week structured sprint",
    forWho: "Founders building something durable.",
  },
  {
    code: "III",
    title: "Strategic Advisory",
    outcome: "An architect inside your decisions over time. Reserved for a small portfolio of founders.",
    bullets: [
      "Ongoing strategic partnership at the founder level",
      "Architecture maintained as the business compounds",
      "Selective. Limited slots.",
    ],
    horizon: "Long-form engagement",
    forWho: "Founders operating at scale or approaching it.",
  },
];

export default function OfferStack() {
  return (
    <section className="kk-section" style={{ background: "var(--kk-paper)" }} data-testid="section-offer-stack">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Engagements</div>
            <h2 className="font-display mt-5 text-[40px] md:text-[58px] leading-[1.02] font-medium tracking-tight">
              Three Ways to Work With Us.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Each engagement is framed as an outcome, not a service. Entry begins with a Strategic Diagnostic. Subsequent work is invitation-based.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {OFFERS.map((o, idx) => (
            <article
              key={o.code}
              className="relative p-8 md:p-10 flex flex-col"
              style={{
                background: idx === 1 ? "var(--kk-ink)" : "var(--kk-cream)",
                color: idx === 1 ? "var(--kk-cream)" : "var(--kk-ink)",
                border: idx === 1 ? "1px solid var(--kk-ink)" : "1px solid var(--kk-line)",
                borderRadius: "2px",
                minHeight: "520px",
              }}
              data-testid={`offer-${idx}`}
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display text-[44px] md:text-[56px] leading-none opacity-90"
                     style={{ color: idx === 1 ? "var(--kk-gold)" : "var(--kk-copper)" }}>
                  {o.code}
                </div>
                <div className="font-mono-label opacity-60">{o.horizon}</div>
              </div>

              <h3 className="font-display text-[26px] md:text-[30px] leading-[1.1] mt-10 font-medium">
                {o.title}
              </h3>

              <p className="mt-5 text-[15px] leading-relaxed" style={{ opacity: idx === 1 ? 0.85 : 1, color: idx === 1 ? "var(--kk-cream)" : "var(--kk-ink-soft)" }}>
                {o.outcome}
              </p>

              <ul className="mt-8 space-y-3 text-[14px]" style={{ opacity: idx === 1 ? 0.8 : 1 }}>
                {o.bullets.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: idx === 1 ? "var(--kk-gold)" : "var(--kk-copper)" }}></span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <div className="text-[12px] uppercase tracking-[0.18em] opacity-60 mb-4">For</div>
                <div className="text-[14px] leading-relaxed" style={{ opacity: idx === 1 ? 0.95 : 1 }}>{o.forWho}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/apply" className="kk-btn" data-testid="offer-stack-cta">
            Apply for Strategic Diagnostic
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
