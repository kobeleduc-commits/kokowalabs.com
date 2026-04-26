import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

export default function FinalCTA() {
  return (
    <section className="kk-on-dark relative overflow-hidden" data-testid="section-final-cta">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${IMAGES.beans})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(0.4) contrast(0.9)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(26,20,16,0.92), rgba(26,20,16,0.98))" }} aria-hidden />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-32 md:py-44">
        <div className="max-w-3xl">
          <div className="font-mono-label" style={{ color: "var(--kk-gold)" }}>Apply</div>
          <h2 className="font-display mt-6 text-[48px] md:text-[80px] leading-[0.98] font-medium tracking-tight">
            Bring real coffee ambition.<br />
            <em className="not-italic" style={{ color: "var(--kk-gold)" }}>Get strategic architecture.</em>
          </h2>
          <p className="mt-8 max-w-xl opacity-80 text-[17px] leading-relaxed">
            If you are serious about building a coffee business that holds together under pressure, the next step is structured.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to="/apply" className="kk-btn kk-btn-light" data-testid="final-cta-apply">
              Apply for Strategic Diagnostic
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
