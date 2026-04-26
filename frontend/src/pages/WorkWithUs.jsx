import OfferStack from "@/components/sections/OfferStack";
import Process from "@/components/sections/Process";
import Scarcity from "@/components/sections/Scarcity";
import FinalCTA from "@/components/sections/FinalCTA";

export default function WorkWithUs() {
  return (
    <div data-testid="page-work-with-us">
      <section className="pt-10 md:pt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Work With Us</div>
          <h1 className="font-display mt-6 text-[48px] md:text-[88px] leading-[0.98] font-medium tracking-tight max-w-5xl">
            Three engagements.<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>One filtered entry point.</em>
          </h1>
          <p className="mt-10 max-w-2xl text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Every engagement begins with a Strategic Diagnostic. Subsequent work is invitation-based and matched to the founder, the stage, and the strategic priority.
          </p>
        </div>
      </section>

      <OfferStack />
      <Process />
      <Scarcity />
      <FinalCTA />
    </div>
  );
}
