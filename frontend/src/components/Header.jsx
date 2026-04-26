import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/approach", label: "Approach" },
  { to: "/work-with-us", label: "Work With Us" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md" : "py-6"
      }`}
      style={{
        background: scrolled ? "rgba(242, 235, 223, 0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--kk-line)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" data-testid="logo-link">
          <span
            className="font-display text-[22px] md:text-[24px] font-medium tracking-tight"
            style={{ color: "var(--kk-ink)" }}
          >
            Kokowa<span style={{ color: "var(--kk-copper)" }}>.</span>Labs
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
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

        <div className="flex items-center gap-3">
          <Link to="/apply" className="kk-btn hidden md:inline-flex" data-testid="header-apply-cta">
            Apply
            <span aria-hidden style={{ display: "inline-block", transform: "translateY(-1px)" }}>↗</span>
          </Link>
          <button
            className="lg:hidden p-2"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
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

      {open && (
        <div className="lg:hidden mt-4 px-6 pb-6" data-testid="mobile-menu">
          <div className="flex flex-col gap-5 pt-4 border-t" style={{ borderColor: "var(--kk-line)" }}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="font-display text-2xl"
                style={{ color: "var(--kk-ink)" }}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/apply" className="kk-btn mt-4 self-start" data-testid="mobile-apply-cta">
              Apply
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
