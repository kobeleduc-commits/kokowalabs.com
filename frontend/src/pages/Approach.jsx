import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

const PRINCIPLES = [
  { n: "01", title: "Architecture before tactics", body: "Every recommendation traces back to the structure of the business. We do not stack tactics on top of an unstable foundation." },
  { n: "02", title: "Sequencing is strategy", body: "The right move at the wrong moment is the wrong move. We define what to do and when, in order." },
  { n: "03", title: "Differentiation is a system", body: "Differentiation is not a tagline. It is positioning, offer, and operations aligned. We build all three." },
  { n: "04", title: "Economics first, always", body: "Beautiful brands collapse on fragile economics. We make the math work before the design carries the weight." },
];

export default function Approach() {
  return (
    <div data-testid="page-approach">
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>The Approach</div>
          <h1 className="font-display mt-6 text-[48px] md:text-[88px] leading-[0.98] font-medium tracking-tight max-w-5xl">
            Strategic architecture<br />for coffee businesses<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>built to last.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Kokowa Labs operates as a strategic architecture partner. The work is decision-grade. The deliverable is a business that holds together.
          </p>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="kk-img-frame" style={{ aspectRatio: "4 / 5" }}>
              <img src={IMAGES.roasterySteel} alt="Specialty coffee roastery in operation" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <h2 className="font-display text-[36px] md:text-[52px] leading-tight font-medium tracking-tight">
              Origin to crema.
            </h2>
            <p className="mt-8 text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Fifteen plus years of operating across the full value chain. Sourcing decisions, roasting choices, retail economics, brand structure. The full vertical informs every horizontal recommendation.
            </p>
            <p className="mt-6 text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              That depth is the difference between strategic advice that sounds right and strategic architecture that holds under operational pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="kk-section" style={{ background: "var(--kk-paper)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Operating Principles</div>
          <h2 className="font-display mt-5 text-[40px] md:text-[60px] leading-[1.02] font-medium tracking-tight max-w-3xl">
            Four principles, always applied.
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--kk-line)" }}>
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="p-10 md:p-14" style={{ background: "var(--kk-paper)" }}>
                <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>{p.n}</div>
                <h3 className="font-display text-[26px] md:text-[32px] leading-tight mt-6 font-medium">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-[36px] md:text-[56px] leading-[1.02] font-medium tracking-tight max-w-3xl mx-auto">
            Ready to architect the business underneath the coffee?
          </h2>
          <Link to="/apply" className="kk-btn mt-12" data-testid="approach-cta">
            Apply for Strategic Diagnostic
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
