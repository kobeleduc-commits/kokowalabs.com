import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { findInsight, INSIGHTS } from "@/lib/insights";

export default function InsightDetail() {
  const { slug } = useParams();
  const post = findInsight(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Kokowa Labs`;
    }
    return () => { document.title = "Kokowa Labs | Strategic Architecture for Specialty Coffee"; };
  }, [post]);

  if (!post) return <Navigate to="/insights" replace />;

  const next = INSIGHTS[(INSIGHTS.findIndex((p) => p.slug === slug) + 1) % INSIGHTS.length];

  return (
    <article data-testid="page-insight-detail">
      <section className="pt-6 md:pt-12">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>
            <Link to="/insights" className="link-underline">Insights</Link> · {post.tag} · {post.read}
          </div>
          <h1 className="font-display mt-8 text-[40px] md:text-[68px] leading-[1] font-medium tracking-tight" data-testid="insight-detail-title">
            {post.title}
          </h1>
          <p className="mt-8 text-[19px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="kk-img-frame" style={{ aspectRatio: "16 / 9" }}>
            <img src={post.cover} alt={post.title} loading="eager" />
          </div>
        </div>
      </section>

      <section className="kk-section">
        <div className="max-w-[760px] mx-auto px-6 md:px-10">
          {post.body.map((b, i) => (
            <div key={i} className={i === 0 ? "" : "mt-14"}>
              <h2 className="font-display text-[28px] md:text-[34px] leading-[1.1] font-medium tracking-tight">
                {b.h}
              </h2>
              <p className="mt-5 text-[17px] leading-[1.7]" style={{ color: "var(--kk-ink-soft)" }}>
                {b.p}
              </p>
            </div>
          ))}

          <div className="kk-divider mt-20 mb-10" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Continue reading</div>
              <Link to={`/insights/${next.slug}`} className="font-display text-[24px] md:text-[28px] leading-tight link-underline mt-2 inline-block" data-testid="insight-detail-next">
                {next.title}
              </Link>
            </div>
            <Link to="/apply" className="kk-btn" data-testid="insight-detail-apply">
              Apply for Strategic Diagnostic
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
