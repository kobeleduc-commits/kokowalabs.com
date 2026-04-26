import { IMAGES } from "@/lib/images";

export default function Positioning() {
  return (
    <section className="kk-section" data-testid="section-positioning">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="kk-img-frame" style={{ aspectRatio: "4 / 5" }}>
            <img src={IMAGES.discussion} alt="Strategic working session" loading="lazy" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Positioning</div>
          <h2 className="font-display mt-5 text-[44px] md:text-[64px] leading-[1.02] font-medium tracking-tight">
            We Don&rsquo;t Consult.<br />
            <em className="not-italic" style={{ color: "var(--kk-copper)" }}>We Architect.</em>
          </h2>

          <div className="kk-divider my-10 max-w-sm" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Consulting</div>
              <ul className="mt-3 space-y-2 text-[15px]" style={{ color: "var(--kk-mute)" }}>
                <li>Recommendations</li>
                <li>Decks and frameworks</li>
                <li>Hourly engagements</li>
              </ul>
            </div>
            <div>
              <div className="font-mono-label" style={{ color: "var(--kk-ink)" }}>Architecture</div>
              <ul className="mt-3 space-y-2 text-[15px]" style={{ color: "var(--kk-ink-soft)" }}>
                <li>Decisions made</li>
                <li>Structure built</li>
                <li>Commercial logic in place</li>
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-xl text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            A strategic architecture partner sits inside your decisions. Not beside them. The deliverable is a business that holds together under pressure.
          </p>
        </div>
      </div>
    </section>
  );
}
