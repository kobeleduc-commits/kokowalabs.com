import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>About</div>
            <h1 className="font-display mt-6 text-[48px] md:text-[80px] leading-[0.98] font-medium tracking-tight">
              Founded and Led by<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>Kobe Leduc.</em>
            </h1>
            <p className="mt-10 max-w-xl text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Fifteen plus years across the full value chain of specialty coffee. From origin sourcing to retail economics, from roasting decisions to brand architecture. Kokowa Labs is the synthesis of that depth, structured for serious founders.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div
              className="kk-img-frame relative"
              style={{
                width: "min(420px, 100%)",
                aspectRatio: "1 / 1",
                borderRadius: "9999px",
                boxShadow: "0 25px 60px -20px rgba(26, 20, 16, 0.4)",
              }}
              data-testid="founder-portrait"
            >
              <img src={IMAGES.founder} alt="Kobe Leduc, Founder of Kokowa Labs" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Origin to crema</div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="font-display text-[26px] md:text-[34px] leading-[1.2] font-medium tracking-tight">
              The coffee industry is full of advice that sounds right and falls apart in operation.
            </p>
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Kokowa Labs was built to do the opposite. Strategic architecture grounded in years of operating reality. The work is precise, the engagements are selective, and the standard is decision-grade.
            </p>
          </div>
        </div>
      </section>

      <section className="kk-section" style={{ background: "var(--kk-paper)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>What founders say</div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--kk-line)" }}>
            {[
              { q: "Kobe sees the business under the brand. He repositioned us in three weeks. Revenue followed in eight.", a: "Roastery founder, Northern Europe" },
              { q: "We had every plan. None of them coherent. Kokowa gave us the architecture that connected them.", a: "Specialty cafe operator, two locations" },
              { q: "The diagnostic alone changed the order of every decision we had queued for the next year.", a: "Direct-trade brand founder" },
            ].map((t, i) => (
              <figure key={i} className="p-10 md:p-12" style={{ background: "var(--kk-paper)" }} data-testid={`testimonial-${i}`}>
                <div className="font-display text-[22px] md:text-[24px] leading-snug">&ldquo;{t.q}&rdquo;</div>
                <figcaption className="mt-6 font-mono-label" style={{ color: "var(--kk-mute)" }}>{t.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section text-center">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-[36px] md:text-[56px] leading-[1.02] font-medium tracking-tight">
            If your work in coffee is serious, the next step is too.
          </h2>
          <Link to="/apply" className="kk-btn mt-12" data-testid="about-cta">
            Apply for Strategic Diagnostic
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
