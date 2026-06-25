export default function Problem() {
  const points = [
    { n: "01", title: "Weak differentiation", desc: "Indistinct from a hundred other shops." },
    { n: "02", title: "Poor sequencing", desc: "Right moves at the wrong moment." },
    { n: "03", title: "Fragile economics", desc: "Margins that snap under any pressure." },
    { n: "04", title: "Lack of strategic clarity", desc: "Operations without an underlying logic." },
  ];

  return (
    <section className="kk-section relative" data-testid="section-problem">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-8">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>The Diagnosis</div>
            <h2 className="font-display mt-5 text-[34px] sm:text-[44px] md:text-[58px] leading-[1.04] font-medium tracking-tight">
              Most coffee businesses today don&rsquo;t fail because of their coffee quality.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pl-6">
            <p className="text-[16px] md:text-[17px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Roasters and shops close every month. Rarely because the coffee was bad. Almost always because the business underneath was never architected.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--kk-line)" }}>
          {points.map((p) => (
            <div
              key={p.n}
              className="p-8 md:p-14 transition-colors duration-500 hover:bg-[color:var(--kk-paper)]"
              style={{ background: "var(--kk-cream)" }}
              data-testid={`problem-${p.n}`}
            >
              <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>{p.n}</div>
              <h3 className="font-display text-[26px] md:text-[34px] leading-tight mt-6 font-medium">
                {p.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center">
          <p className="font-display text-[28px] md:text-[44px] tracking-tight" style={{ color: "var(--kk-ink)" }}>
            Passion is not enough. <em className="not-italic" style={{ color: "var(--kk-copper)" }}>Precision is.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
