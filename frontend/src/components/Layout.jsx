import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);

  return (
    <div className="grain min-h-screen flex flex-col" style={{ background: "var(--kk-cream)" }}>
      <Header />
      <main className="flex-1 pt-24" data-testid="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
