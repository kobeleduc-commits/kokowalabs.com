import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>About</div>
            <h1 className="font-display mt-6 text-[40px] sm:text-[54px] md:text-[80px] leading-[0.98] font-medium tracking-tight">
              Founded and Led by<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>Kobe Leduc.</em>
            </h1>
            <p className="mt-8 md:mt-10 max-w-xl text-[17px] md:text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Fifteen plus years across the full value chain of specialty coffee. From origin sourcing to retail economics, from roasting decisions to brand architecture. Kokowa Labs is the synthesis of that depth, structured for serious founders.
            </p>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
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
              <img
                src={IMAGES.founder}
                alt="Portrait of Kobe Leduc, founder of Kokowa Labs, strategic architecture partner for specialty coffee"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>From origin to crema</div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <p className="font-display text-[24px] md:text-[34px] leading-[1.2] font-medium tracking-tight">
              The coffee industry is full of advice that sounds right and falls apart in operation.
            </p>
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Kokowa Labs was built to do the opposite. Strategic architecture grounded in years of operating reality. The work is precise, the engagements are selective, and the standard is decision-grade.
            </p>
          </div>
        </div>
      </section>

      <section className="kk-section text-center">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-[32px] md:text-[56px] leading-[1.02] font-medium tracking-tight">
            If your work in coffee is serious, the next step is too.
          </h2>
          <Link to="/apply" className="kk-btn mt-10 md:mt-12" data-testid="about-cta">
            Apply for Strategic Diagnostic
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
