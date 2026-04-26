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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Smoothly scroll to a hash on the current page
  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Mobile menu link handler:
  // - If we're on home, scroll to the section anchor
  // - Otherwise navigate to home with the hash; ScrollToHash in Layout will handle it
  const handleMobileNav = (item) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      scrollToHash(item.hash);
      window.history.replaceState(null, "", item.hash);
    } else {
      navigate(`/${item.hash}`);
    }
  };

  const handleMobileApply = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      scrollToHash("#apply");
      window.history.replaceState(null, "", "#apply");
    } else {
      navigate("/#apply");
    }
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2.5 backdrop-blur-md" : "py-4 md:py-5"
      }`}
      style={{
        background: scrolled ? "rgba(242, 235, 223, 0.85)" : "rgba(242, 235, 223, 0.55)",
        borderBottom: scrolled ? "1px solid var(--kk-line)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(6px)",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(6px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 group shrink-0"
          data-testid="logo-link"
          aria-label="Kokowa Labs home"
          onClick={() => setOpen(false)}
        >
          <img
            src={ASSETS.logo}
            alt="Kokowa Labs logo"
            className="h-12 md:h-14 w-auto"
            style={{ display: "block", mixBlendMode: "multiply", objectFit: "contain" }}
            width="200"
            height="56"
            loading="eager"
          />
          <span className="sr-only">Kokowa Labs</span>
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
            className="lg:hidden p-3 -mr-2 relative z-[60]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
          >
            <div className="w-6 flex flex-col gap-[5px]">
              <span className={`h-[1.5px] bg-[color:var(--kk-ink)] transition-all ${open ? "rotate-45 translate-y-[6px]" : ""}`}></span>
              <span className={`h-[1.5px] bg-[color:var(--kk-ink)] transition-all ${open ? "opacity-0" : ""}`}></span>
              <span className={`h-[1.5px] bg-[color:var(--kk-ink)] transition-all ${open ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      <div
        id="mobile-drawer"
        className={`lg:hidden fixed inset-0 transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ top: 0, zIndex: 55 }}
        aria-hidden={!open}
        data-testid="mobile-menu"
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26, 20, 16, 0.42)" }}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-[100dvh] w-full max-w-[420px] flex flex-col transform transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
          style={{ background: "var(--kk-cream)", boxShadow: "-30px 0 60px -20px rgba(26,20,16,0.25)" }}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b" style={{ borderColor: "var(--kk-line)" }}>
            <img src={ASSETS.logo} alt="Kokowa Labs" className="h-12 w-auto" style={{ mixBlendMode: "multiply", objectFit: "contain" }} />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pt-8 pb-10">
            <ul className="flex flex-col gap-1" data-testid="mobile-menu-list">
              {NAV.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.hash}
                    onClick={handleMobileNav(item)}
                    className="flex items-baseline justify-between py-4 border-b font-display text-[28px] leading-tight tracking-tight"
                    style={{ borderColor: "var(--kk-line)", color: "var(--kk-ink)" }}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-label" style={{ color: "var(--kk-copper)" }}>0{NAV.indexOf(item) + 1}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#apply"
              onClick={handleMobileApply}
              className="kk-btn w-full justify-center mt-10 py-4"
              data-testid="mobile-apply-cta"
            >
              Apply for Strategic Diagnostic
              <span aria-hidden>↗</span>
            </a>

            <div className="mt-12">
              <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>The New Game of Coffee&trade;</div>
              <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
                Strategic architecture for serious specialty coffee founders.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
