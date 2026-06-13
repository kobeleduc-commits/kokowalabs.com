import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

const TRACK_RECORD = [
  {
    n: "01",
    area: "Origin sourcing",
    detail: "Green coffee procurement decisions across East Africa, Central America, and Southeast Asia. Understanding what quality actually costs before it gets to a roaster.",
  },
  {
    n: "02",
    area: "Roastery economics",
    detail: "Operating roasteries as businesses, not studios. Yield modeling, capacity planning, wholesale margin architecture, and the commercial logic that makes a roastery compound rather than survive.",
  },
  {
    n: "03",
    area: "Retail and cafe architecture",
    detail: "From the unit economics of a single-site cafe to multi-site operating models. Where capital should and should not go, and when expansion is a decision rather than a reflex.",
  },
  {
    n: "04",
    area: "Brand and positioning",
    detail: "Not as aesthetics. As the structural relationship between what a business is, who it is for, and how it charges for that. Positioning that holds under price pressure.",
  },
];

export default function About() {
  return (
    <div data-testid="page-about">
      <Helmet>
        <title>About Kobe Leduc | Kokowa Labs</title>
        <meta name="description" content="Kokowa Labs is founded and led by Kobe Leduc. Fifteen plus years across the full specialty coffee value chain, from origin sourcing to roastery economics and retail architecture." />
        <link rel="canonical" href="https://kokowalabs.com/about" />
        <meta property="og:url" content="https://kokowalabs.com/about" />
        <meta property="og:title" content="About Kobe Leduc | Kokowa Labs" />
      </Helmet>
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>About</div>
            <h1 className="font-display mt-6 text-[40px] sm:text-[54px] md:text-[80px] leading-[0.98] font-medium tracking-tight">
              Founded and Led by<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>Kobe Leduc.</em>
            </h1>
            <p className="mt-8 md:mt-10 max-w-xl text-[17px] md:text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Fifteen plus years operating inside specialty coffee. Not advising from the outside. Inside — from sourcing tables to roasting floors to retail floors to the commercial decisions that determine whether a coffee business compounds or quietly collapses.
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
                alt="Portrait of Kobe Leduc, founder of Kokowa Labs"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section" style={{ background: "var(--kk-paper)" }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Why Kokowa Labs exists</div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <p className="font-display text-[24px] md:text-[32px] leading-[1.2] font-medium tracking-tight">
              The coffee industry has more craft than it has ever had. It has less commercial architecture than it needs.
            </p>
            <div className="space-y-5 text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              <p>
                Most of what gets called strategic advice in this industry is pattern-matching from other industries, dressed in coffee language. The people giving it have not operated a green purchase, defended a roasting margin, or closed a wholesale account when the numbers did not work.
              </p>
              <p>
                Kokowa Labs was built to do the opposite. Every recommendation traces back to operating reality. The work is precise because the cost of imprecision in a capital-light, margin-thin business is not theoretical.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Operating depth</div>
          <h2 className="font-display mt-5 text-[36px] md:text-[52px] leading-[1.04] font-medium tracking-tight max-w-3xl">
            Origin to crema, in full.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--kk-line)" }}>
            {TRACK_RECORD.map((item) => (
              <div key={item.n} className="p-10 md:p-14" style={{ background: "var(--kk-cream)" }}>
                <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>{item.n}</div>
                <h3 className="font-display text-[22px] md:text-[28px] leading-tight mt-6 font-medium">
                  {item.area}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-section" style={{ background: "var(--kk-paper)" }}>
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>What Kokowa Labs is not</div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <p className="font-display text-[22px] md:text-[28px] leading-[1.2] font-medium tracking-tight">
                Not a marketing agency. Not a branding studio. Not a business coach.
              </p>
            </div>
            <div className="text-[16px] leading-relaxed space-y-5" style={{ color: "var(--kk-ink-soft)" }}>
              <p>
                The work is architecture. It covers positioning, commercial logic, offer structure, sequencing, and the decisions that determine whether a coffee business holds together under pressure or breaks at the first complication.
              </p>
              <p>
                Engagements are selective. The standard is decision-grade. If the work would not change a real decision, it does not happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="kk-section text-center">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-[32px] md:text-[56px] leading-[1.02] font-medium tracking-tight">
            If your work in coffee is serious,<br />the next step is structured.
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
