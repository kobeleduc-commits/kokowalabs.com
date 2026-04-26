import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="kk-on-dark relative" data-testid="site-footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="font-display text-[36px] md:text-[44px] leading-[1.05] tracking-tight">
              Strategic architecture<br />for serious coffee founders.
            </div>
            <p className="mt-6 max-w-md opacity-70 leading-relaxed">
              Kokowa Labs designs positioning, structure, and commercial logic that works in today's market.
            </p>
            <Link to="/apply" className="kk-btn kk-btn-light mt-10" data-testid="footer-apply-cta">
              Apply for Strategic Diagnostic
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono-label opacity-50 mb-5">Navigate</div>
            <ul className="flex flex-col gap-3">
              <li><Link to="/approach" className="link-underline">Approach</Link></li>
              <li><Link to="/work-with-us" className="link-underline">Work With Us</Link></li>
              <li><Link to="/insights" className="link-underline">Insights</Link></li>
              <li><Link to="/case-studies" className="link-underline">Case Studies</Link></li>
              <li><Link to="/about" className="link-underline">About</Link></li>
              <li><Link to="/apply" className="link-underline">Apply</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono-label opacity-50 mb-5">Contact</div>
            <ul className="flex flex-col gap-3 opacity-90">
              <li>kobe@kokowalabs.com</li>
              <li>By application only</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono-label opacity-50 mb-5">Founder</div>
            <p className="opacity-90 leading-relaxed">
              Founded and Led by<br />
              <span className="font-display text-xl" style={{ color: "var(--kk-gold)" }}>Kobe Leduc</span>
            </p>
          </div>
        </div>

        <div className="kk-divider mt-20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm opacity-60">
          <div>© {new Date().getFullYear()} Kokowa Labs. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>The New Game of Coffee™</span>
            <span>15+ years in specialty coffee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
