import { IMAGES } from "@/lib/images";

const STEPS = [
  { n: "01", title: "Apply", desc: "Submit a structured application. Every applicant is reviewed personally." },
  { n: "02", title: "Qualification", desc: "We assess fit. Most engagements are reserved for founders with real conviction." },
  { n: "03", title: "Strategic Session", desc: "A working session. Not a sales call. Real strategic ground is covered." },
  { n: "04", title: "Deeper Engagement", desc: "Optional. Continued only when both sides see compounding value." },
];

export default function Process() {
  return (
    <section id="how-it-works" className="kk-section" data-testid="section-process">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>The Process</div>
            <h2 className="font-display mt-5 text-[40px] md:text-[58px] leading-[1.02] font-medium tracking-tight">
              How It Works.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              A controlled four-step path. Designed to filter for fit and to use strategic time well on both sides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <ol className="relative">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 py-10 border-t"
                  style={{ borderColor: "var(--kk-line)" }}
                  data-testid={`process-step-${s.n}`}
                >
                  <div className="font-display text-[40px] md:text-[56px] leading-none" style={{ color: "var(--kk-copper)" }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-[26px] md:text-[32px] font-medium leading-tight">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed max-w-lg" style={{ color: "var(--kk-mute)" }}>
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 p-8 border-l-2" style={{ borderColor: "var(--kk-copper)", background: "var(--kk-paper)" }}>
              <p className="font-display text-[22px] md:text-[26px] leading-snug">
                This is not a sales call. This is a strategic working session.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="kk-img-frame" style={{ aspectRatio: "4 / 5" }}>
              <img src={IMAGES.sourcing} alt="Sourcing coffee at origin" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
