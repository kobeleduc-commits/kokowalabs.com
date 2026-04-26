import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Approach from "@/pages/Approach";
import WorkWithUs from "@/pages/WorkWithUs";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import About from "@/pages/About";
import Apply from "@/pages/Apply";
import ThankYou from "@/pages/ThankYou";
import CaseStudies from "@/pages/CaseStudies";
import Admin from "@/pages/Admin";

function MarketingShell({ children }) {
  return <Layout>{children}</Layout>;
}

function AdminShell() {
  return (
    <div className="grain min-h-screen pt-12" style={{ background: "var(--kk-cream)" }}>
      <Admin />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminShell />} />
          <Route path="/" element={<MarketingShell><Home /></MarketingShell>} />
          <Route path="/approach" element={<MarketingShell><Approach /></MarketingShell>} />
          <Route path="/work-with-us" element={<MarketingShell><WorkWithUs /></MarketingShell>} />
          <Route path="/insights" element={<MarketingShell><Insights /></MarketingShell>} />
          <Route path="/insights/:slug" element={<MarketingShell><InsightDetail /></MarketingShell>} />
          <Route path="/case-studies" element={<MarketingShell><CaseStudies /></MarketingShell>} />
          <Route path="/about" element={<MarketingShell><About /></MarketingShell>} />
          <Route path="/apply" element={<MarketingShell><Apply /></MarketingShell>} />
          <Route path="/thank-you" element={<MarketingShell><ThankYou /></MarketingShell>} />
          <Route path="*" element={<MarketingShell><Home /></MarketingShell>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
