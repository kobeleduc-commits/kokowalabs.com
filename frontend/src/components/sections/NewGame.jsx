import { IMAGES } from "@/lib/images";

export default function NewGame() {
  return (
    <section className="kk-on-dark kk-section relative overflow-hidden" data-testid="section-new-game">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="font-mono-label" style={{ color: "var(--kk-gold)" }}>The Shift</div>
          <h2 className="font-display mt-5 text-[44px] md:text-[68px] leading-[1] font-medium tracking-tight">
            The Rules<br />Have Changed.
          </h2>
          <div className="kk-divider my-12 max-w-md" />
          <p className="font-display text-[28px] md:text-[36px] leading-[1.2] max-w-2xl" style={{ color: "var(--kk-cream)" }}>
            Quality is expected.{" "}
            <span style={{ color: "var(--kk-gold)" }}>Strategy is rare.</span>
          </p>
          <p className="mt-8 max-w-xl opacity-70 leading-relaxed">
            The market has matured past the point where great beans, beautiful packaging, or a charming space are enough. What separates a business that compounds from one that survives is the architecture beneath it.
          </p>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="kk-img-frame" style={{ aspectRatio: "5 / 6" }}>
            <img src={IMAGES.roastery} alt="Specialty coffee roastery in operation" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
