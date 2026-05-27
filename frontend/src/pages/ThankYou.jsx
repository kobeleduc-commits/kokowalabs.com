import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div data-testid="page-thank-you">
      <section className="kk-section">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Application Received</div>
          <h1 className="font-display mt-8 text-[44px] md:text-[72px] leading-[1.02] font-medium tracking-tight">
            Thank you.<br /><em className="not-italic" style={{ color: "var(--kk-copper)" }}>Your application is in review.</em>
          </h1>
          <div className="kk-divider mt-14 mb-14 max-w-md mx-auto" />
          <p className="text-[18px] leading-relaxed max-w-xl mx-auto" style={{ color: "var(--kk-ink-soft)" }}>
            Every application is reviewed carefully and personally.
            <br />
            If there is a strong fit, you will receive a personal invitation.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>
            Reviews typically take 2 to 3 business days.
          </p>
          <p className="mt-4 text-[13px]" style={{ color: "var(--kk-mute)" }}>
            All information is treated with strict confidentiality.
          </p>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/case-studies" className="kk-btn" data-testid="thank-you-case-studies">
              Read a Case Study
              <span aria-hidden>↗</span>
            </Link>
            <Link to="/" className="kk-btn kk-btn-ghost" data-testid="thank-you-home">
              Return to Kokowa Labs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
