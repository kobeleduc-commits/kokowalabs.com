import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";
import { INSIGHTS } from "@/lib/insights";

export default function Insights() {
  return (
    <div data-testid="page-insights">
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Insights</div>
          <h1 className="font-display mt-6 text-[48px] md:text-[88px] leading-[0.98] font-medium tracking-tight max-w-5xl">
            Field notes from inside<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>the new game of coffee.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Selective writing. No fluff. Each piece earns its place by being decision-grade for serious coffee founders.
          </p>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--kk-line)" }}>
            {INSIGHTS.map((p, i) => (
              <Link
                key={p.slug}
                to={`/insights/${p.slug}`}
                className="p-10 md:p-14 flex flex-col cursor-pointer transition-colors duration-500 hover:bg-[color:var(--kk-paper)]"
                style={{ background: "var(--kk-cream)", minHeight: "320px" }}
                data-testid={`insights-post-${i}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>{p.tag}</div>
                  <div className="font-mono-label opacity-50">{p.read}</div>
                </div>
                <h3 className="font-display text-[28px] md:text-[36px] leading-[1.1] mt-8 font-medium" style={{ color: "var(--kk-ink)" }}>
                  {p.title}
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed flex-1" style={{ color: "var(--kk-mute)" }}>
                  {p.excerpt}
                </p>
                <div className="mt-8 link-underline text-[14px]" style={{ color: "var(--kk-ink)" }}>
                  Read the field note
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="kk-on-dark py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[36px] md:text-[52px] leading-tight font-medium tracking-tight">
              Receive selective dispatches.
            </h2>
            <p className="mt-6 max-w-xl opacity-80 leading-relaxed">
              Occasional, considered. Sent only when there is something worth saying.
            </p>
            <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl" onSubmit={(e) => e.preventDefault()} data-testid="insights-newsletter">
              <input
                type="email"
                required
                placeholder="your email"
                className="kk-input flex-1"
                style={{ color: "var(--kk-cream)", borderColor: "rgba(242,235,223,0.25)" }}
                data-testid="insights-newsletter-email"
              />
              <button type="submit" className="kk-btn kk-btn-light" data-testid="insights-newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>
          <div className="lg:col-span-5">
            <div className="kk-img-frame" style={{ aspectRatio: "4 / 3" }}>
              <img src={IMAGES.insightsHero} alt="Coffee plantation landscape" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
