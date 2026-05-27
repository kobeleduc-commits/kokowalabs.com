import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait one frame so the target section is mounted
      const t = setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          // Use CSS scroll-margin-top (set per breakpoint in index.css) via scrollIntoView
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function Layout({ children }) {
  return (
    <div className="grain min-h-screen flex flex-col" style={{ background: "var(--kk-cream)" }}>
      <ScrollManager />
      <Header />
      <main className="flex-1 pt-[72px] md:pt-[80px]" data-testid="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
