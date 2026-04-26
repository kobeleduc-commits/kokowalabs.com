import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/images";

const NAV = [
  { to: "/approach", hash: "#approach", label: "Approach" },
  { to: "/work-with-us", hash: "#work-with-us", label: "Work With Us" },
  { to: "/insights", hash: "#insights", label: "Insights" },
  { to: "/about", hash: "#about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll using a class (per spec)
  useEffect(() => {
    if (open) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      // CSS scroll-margin-top handles the offset; smooth scroll into view.
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleMobileNav = (item) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      // small delay so the menu close animation does not jank the scroll
      setTimeout(() => scrollToHash(item.hash), 120);
      window.history.replaceState(null, "", item.hash);
    } else {
      navigate(`/${item.hash}`);
    }
  };

  const handleMobileApply = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      setTimeout(() => scrollToHash("#apply"), 120);
      window.history.replaceState(null, "", "#apply");
    } else {
      navigate("/#apply");
    }
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "py-2 md:py-3" : "py-3 md:py-4"
      }`}
      style={{
        background: scrolled ? "rgba(242, 235, 223, 0.92)" : "rgba(242, 235, 223, 0.62)",
        borderBottom: scrolled ? "1px solid var(--kk-line)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "blur(8px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
        {/* LOGO  ̶ enlarged so "KOKOWA FIELD LABS" is fully legible */}
        <Link
          to="/"
          className="flex items-center group shrink-0"
          data-testid="logo-link"
          aria-label="Kokowa Field Labs home"
          onClick={() => setOpen(false)}
        >
          <img
            src={ASSETS.logo}
            alt="Kokowa Field Labs, Strategic Growth for Premium F&B"
            className="h-16 md:h-20 lg:h-[88px] w-auto"
            style={{
              display: "block",
              objectFit: "contain",
              mixBlendMode: "multiply",
              maxWidth: "min(78vw, 360px)",
            }}
            width="320"
            height="88"
            loading="eager"
            decoding="async"
          />
          <span className="sr-only">Kokowa Field Labs</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `link-underline text-[14px] tracking-wide transition-colors ${
                  isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                }`
              }
              style={{ color: "var(--kk-ink)" }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <Link to="/apply" className="kk-btn hidden md:inline-flex" data-testid="header-apply-cta">
            Apply
            <span aria-hidden style={{ display: "inline-block", transform: "translateY(-1px)" }}>↗</span>
          </Link>
          <button
            className="lg:hidden flex items-center justify-center relative z-[110]"
            style={{ minWidth: 48, minHeight: 48 }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
          >
            <div className="w-7 flex flex-col gap-[6px]">
              <span className={`h-[2px] bg-[color:var(--kk-ink)] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""}`}></span>
              <span className={`h-[2px] bg-[color:var(--kk-ink)] transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
              <span className={`h-[2px] bg-[color:var(--kk-ink)] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU: fixed panel below header, full width, high z-index, blurred bg.
          Implements the exact spec provided. */}
      <div
        id="mobile-menu"
        className={`mobile-menu lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        data-testid="mobile-menu"
        role="dialog"
        aria-modal="true"
      >
        <ul className="flex flex-col" data-testid="mobile-menu-list">
          {NAV.map((item, i) => (
            <li key={item.to}>
              <a
                href={item.hash}
                onClick={handleMobileNav(item)}
                className="flex items-baseline justify-between py-5 border-b font-display text-[30px] leading-tight tracking-tight"
                style={{ borderColor: "var(--kk-line)", color: "var(--kk-ink)" }}
                data-testid={`mobile-menu-item-${i}`}
                data-testid-alt={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span>{item.label}</span>
                <span className="font-mono-label" style={{ color: "var(--kk-copper)" }}>
                  0{i + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#apply"
          onClick={handleMobileApply}
          className="kk-btn w-full justify-center mt-8 py-4 text-[15px]"
          data-testid="mobile-apply-cta"
        >
          Apply for Strategic Diagnostic
          <span aria-hidden>↗</span>
        </a>

        <div className="mt-10 pb-2">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>
            The New Game of Coffee&trade;
          </div>
          <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Strategic architecture for serious specialty coffee founders.
          </p>
        </div>
      </div>
    </header>
  );
}
