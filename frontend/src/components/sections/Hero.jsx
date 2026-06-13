import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative pt-8 md:pt-14" data-testid="home-hero">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: copy */}
          <div className="lg:col-span-7 relative z-10">
            <div className="kk-reveal kk-d-1 inline-flex items-center gap-3 font-mono-label" style={{ color: "var(--kk-mute)" }}>
              <span className="w-8 h-px" style={{ background: "var(--kk-mute)" }}></span>
              Kokowa Labs
            </div>

            <h1
              data-testid="hero-headline"
              className="kk-reveal kk-d-2 font-display mt-6 text-[56px] md:text-[84px] lg:text-[96px] leading-[0.93] font-medium"
              style={{ color: "var(--kk-ink)" }}
            >
              Winning the New Game of Coffee&trade;
            </h1>

            <p
              data-testid="hero-subheadline"
              className="kk-reveal kk-d-3 mt-8 max-w-[560px] text-[17px] md:text-[19px] leading-[1.55]"
              style={{ color: "var(--kk-ink-soft)" }}
            >
              Build a profitable, <em className="not-italic font-semibold" style={{ color: "var(--kk-copper)" }}>differentiated</em> coffee business without costly strategic detours. Kokowa Labs helps serious founders design positioning, structure, and commercial logic that holds in today&rsquo;s market.
            </p>

            <div className="kk-reveal kk-d-4 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <Link to="/apply" className="kk-btn" data-testid="hero-primary-cta">
                Apply for Strategic Diagnostic
                <span aria-hidden>↗</span>
              </Link>
              <a
                href="#how-it-works"
                className="link-underline text-[14px]"
                style={{ color: "var(--kk-mute)" }}
                data-testid="hero-secondary-cta"
              >
                See how it works
              </a>
            </div>

            <div className="kk-reveal kk-d-5 mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
              {[
                "15+ years in specialty coffee",
                "Origin to crema",
                "Strategic architecture, not consulting",
              ].map((label) => (
                <div key={label} className="flex items-center gap-3 text-[13px]" style={{ color: "var(--kk-mute)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--kk-copper)" }}></span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: cinematic image */}
          <div className="lg:col-span-5 kk-reveal kk-d-3 relative">
            <div
              className="kk-img-frame relative"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "2px",
                boxShadow: "0 30px 80px -20px rgba(26, 20, 16, 0.35)",
              }}
            >
              <img src={IMAGES.hero} alt="Pour-over coffee being prepared" loading="eager" width="800" height="1000" />
            </div>
            <div
              className="hidden lg:flex absolute -bottom-8 -left-8 px-6 py-5 items-center gap-4"
              style={{ background: "var(--kk-ink)", color: "var(--kk-cream)", borderRadius: "2px" }}
            >
              <div className="font-display text-3xl" style={{ color: "var(--kk-gold)" }}>15+</div>
              <div className="text-[12px] leading-tight opacity-90">
                Years across<br />the full value chain
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
