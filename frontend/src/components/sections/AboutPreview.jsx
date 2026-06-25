import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/images";

export default function AboutPreview() {
  return (
    <section className="kk-section" data-testid="section-about-preview">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 flex justify-center order-1">
          <div
            className="kk-img-frame relative"
            style={{
              width: "min(360px, 100%)",
              aspectRatio: "1 / 1",
              borderRadius: "9999px",
              boxShadow: "0 25px 60px -20px rgba(26, 20, 16, 0.4)",
            }}
          >
            <img
              src={IMAGES.founder}
              alt="Kobe Leduc, founder and lead architect of Kokowa Labs"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-7 order-2">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>About</div>
          <h2 className="font-display mt-5 text-[34px] md:text-[52px] leading-[1.05] font-medium tracking-tight">
            Founded and Led by{" "}
            <em className="not-italic" style={{ color: "var(--kk-copper)" }}>Kobe Leduc.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[16px] md:text-[18px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Fifteen plus years across the full value chain of specialty coffee. Origin sourcing, roasting decisions, retail economics, brand architecture. Kokowa Labs is the synthesis of that operating depth, structured for serious founders.
          </p>
          <Link to="/about" className="link-underline mt-8 inline-block text-[14px]" style={{ color: "var(--kk-ink)" }} data-testid="about-preview-link">
            Read the full background
          </Link>
        </div>
      </div>
    </section>
  );
}
