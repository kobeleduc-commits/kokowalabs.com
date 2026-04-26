import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Approach from "@/pages/Approach";
import WorkWithUs from "@/pages/WorkWithUs";
import Insights from "@/pages/Insights";
import About from "@/pages/About";
import Apply from "@/pages/Apply";
import ThankYou from "@/pages/ThankYou";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
