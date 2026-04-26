import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

const CASES = [
  {
    n: "01",
    sector: "Multi-roastery group, Northern Europe",
    headline: "From margin compression to a defensible commercial logic in eleven weeks.",
    pre: [
      "Three sites running parallel, each on its own pricing logic",
      "Wholesale book grew faster than gross margin allowed",
      "Founder pulled into operations every week",
    ],
    intervention: [
      "Strategic Diagnostic surfaced four overlapping decision sets being treated as one",
      "Architecture Sprint rebuilt offer ladder, repriced wholesale, sequenced retail focus",
      "Founder removed from daily operations through one structural appointment",
    ],
    outcome: [
      "Gross margin recovered four points in the first quarter post-sprint",
      "Wholesale renegotiated against a pricing model the founder can defend in any room",
      "Founder back to working on the business, not under it",
    ],
    horizon: "11-week engagement",
  },
  {
    n: "02",
    sector: "Direct-trade specialty brand, single-origin focus",
    headline: "A repositioning that restored pricing power without changing a single recipe.",
    pre: [
      "Quality unquestioned, but pricing capped by retail comparison",
      "Brand language drifted into category clichés over five years",
      "Two senior hires queued before the offer was actually clear",
    ],
    intervention: [
      "Diagnostic identified that the founder was selling beans when the audience was buying authorship",
      "Positioning reset around traceability and the founder's voice, not the cup score",
      "Hiring plan paused until the architecture absorbed the work first",
    ],
    outcome: [
      "Average order value lifted notably within the first promotional cycle",
      "First gated long-form release oversubscribed against the modest list",
      "Two queued hires resequenced; one removed entirely",
    ],
    horizon: "Diagnostic + ongoing advisory",
  },
  {
    n: "03",
    sector: "Two-location specialty cafe operator",
    headline: "Stopped a third location that would have broken the business.",
    pre: [
      "Profitable on the first site, breakeven on the second",
      "Third lease close to signature, on the assumption growth would solve it",
      "No clear answer to what the second location had actually proved",
    ],
    intervention: [
      "Diagnostic forced the question the founder had been avoiding for nine months",
      "Third location postponed, second location's economics restructured",
      "Wholesale partnership opened as a different growth vector entirely",
    ],
    outcome: [
      "Lease commitment avoided, six-figure capital preserved",
      "Second site moved from breakeven to defensible margin within two quarters",
      "Founder's posture changed from expansion-by-default to expansion-by-decision",
    ],
    horizon: "Strategic Diagnostic Intensive",
  },
];

export default function CaseStudies() {
  return (
    <div data-testid="page-case-studies">
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Case Studies</div>
          <h1 className="font-display mt-6 text-[48px] md:text-[88px] leading-[0.98] font-medium tracking-tight max-w-5xl">
            Selective work,<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>described in outcomes.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Engagements are anonymized to protect the founders we work with. The shape of the work, the pre-state, and the outcomes are real.
          </p>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-px" style={{ background: "var(--kk-line)" }}>
          {CASES.map((c, i) => (
            <article
              key={c.n}
              className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10"
              style={{ background: i % 2 === 1 ? "var(--kk-paper)" : "var(--kk-cream)" }}
              data-testid={`case-${c.n}`}
            >
              <div className="lg:col-span-4">
                <div className="font-display text-[64px] leading-none" style={{ color: "var(--kk-copper)" }}>{c.n}</div>
                <div className="mt-6 font-mono-label" style={{ color: "var(--kk-mute)" }}>{c.sector}</div>
                <div className="mt-2 text-[13px]" style={{ color: "var(--kk-mute)" }}>{c.horizon}</div>
              </div>

              <div className="lg:col-span-8">
                <h2 className="font-display text-[28px] md:text-[40px] leading-[1.1] font-medium tracking-tight">
                  {c.headline}
                </h2>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Before</div>
                    <ul className="mt-3 space-y-2 text-[14px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
                      {c.pre.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Architecture</div>
                    <ul className="mt-3 space-y-2 text-[14px] leading-relaxed">
                      {c.intervention.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Outcome</div>
                    <ul className="mt-3 space-y-2 text-[14px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
                      {c.outcome.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="kk-on-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${IMAGES.beans})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(0.5)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,20,16,0.92), rgba(26,20,16,0.98))" }} aria-hidden />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="font-display text-[40px] md:text-[64px] leading-[1] font-medium tracking-tight">
              Your situation deserves the same precision.
            </h2>
            <Link to="/apply" className="kk-btn kk-btn-light mt-12" data-testid="case-studies-apply">
              Apply for Strategic Diagnostic
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
