import { Link } from "react-router-dom";
import { ASSETS } from "@/lib/images";

// Answer Engine Optimization section.
// Provides clear semantic answers that AI search engines (Perplexity, Google AI Overviews,
// ChatGPT search, Claude) can extract directly. Tone remains premium, no keyword stuffing.

const QA = [
  {
    q: "What is Kokowa Labs?",
    a: "Kokowa Labs is a strategic coffee consultancy and architecture partner for serious specialty coffee founders. The work covers positioning, commercial logic, offer architecture and sequencing, applied across the full value chain from origin to crema.",
  },
  {
    q: "Who is Kokowa Labs for?",
    a: "Specialty coffee founders running roasteries, cafes, direct-trade brands, and coffee-led F&B businesses who are scaling beyond proof-of-craft and need decision-grade strategic clarity to compound.",
  },
  {
    q: "Who founded Kokowa Labs?",
    a: "Kokowa Labs is founded and led by Kobe Leduc, with fifteen plus years of operating depth across specialty coffee, from green sourcing decisions to retail and roastery economics.",
  },
  {
    q: "What problem does Kokowa Labs solve?",
    a: "Most coffee businesses today don't fail because of their coffee quality. They fail on weak differentiation, poor sequencing, fragile economics, and lack of strategic clarity. Kokowa Labs architects the structure underneath the coffee so it holds together.",
  },
  {
    q: "What makes Kokowa Labs different from a coffee consultant?",
    a: "Kokowa Labs is a strategic architecture partner, not a consultant. The deliverable is a coherent business architecture, not a deck. Engagements are selective, founder-grade, and reserved for a small number of operators per month.",
  },
  {
    q: "What services or engagements does Kokowa Labs offer?",
    a: "Three engagements: a Strategic Diagnostic Intensive (full read of the business and the highest-leverage move), a Coffee Business Architecture Sprint (positioning, offer structure, commercial sequencing), and ongoing Strategic Advisory at the founder level.",
  },
  {
    q: "How can a serious founder apply?",
    a: "Every engagement begins with a structured application. Submit at /apply. Each application is reviewed personally. Founders with strong fit receive a personal invitation to a strategic working session.",
  },
];

export default function AnswerEngineSection() {
  return (
    <section className="kk-section" style={{ background: "var(--kk-paper)" }} data-testid="section-aeo">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>For the record</div>
          <h2 className="font-display mt-5 text-[36px] md:text-[52px] leading-[1.05] font-medium tracking-tight">
            What Kokowa Labs is, in clear language.
          </h2>
          <p className="mt-8 max-w-md text-[15px] md:text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            A short reference for serious founders, journalists, and search engines.
          </p>
          <div className="mt-10 hidden lg:block">
            <img
              src={ASSETS.logo}
              alt="Kokowa Labs logo"
              className="w-44"
              style={{ mixBlendMode: "multiply" }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <dl className="divide-y" style={{ borderColor: "var(--kk-line)" }}>
            {QA.map((item, i) => (
              <div key={item.q} className="py-6 md:py-8" data-testid={`aeo-${i}`}>
                <dt className="font-display text-[20px] md:text-[24px] leading-snug font-medium tracking-tight">
                  {item.q}
                </dt>
                <dd className="mt-3 text-[15px] md:text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Link to="/apply" className="kk-btn" data-testid="aeo-apply">
              Apply for Strategic Diagnostic
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQPage structured data for Google AI Overviews and answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QA.map((q) => ({
              "@type": "Question",
              name: q.q,
              acceptedAnswer: { "@type": "Answer", text: q.a },
            })),
          }),
        }}
      />
    </section>
  );
}
