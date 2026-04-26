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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>The Diagnosis</div>
            <h2 className="font-display mt-5 text-[40px] md:text-[58px] leading-[1.02] font-medium tracking-tight">
              Most Coffee Businesses Don&rsquo;t Fail Because of Coffee.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <p className="text-[17px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Roasters and shops close every month. Rarely because the coffee was bad. Almost always because the business underneath was never architected.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--kk-line)" }}>
          {points.map((p) => (
            <div
              key={p.n}
              className="p-10 md:p-14 transition-colors duration-500 hover:bg-[color:var(--kk-paper)]"
              style={{ background: "var(--kk-cream)" }}
              data-testid={`problem-${p.n}`}
            >
              <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>{p.n}</div>
              <h3 className="font-display text-[28px] md:text-[34px] leading-tight mt-6 font-medium">
                {p.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-display text-[32px] md:text-[44px] tracking-tight" style={{ color: "var(--kk-ink)" }}>
            Passion is not enough. <em className="not-italic" style={{ color: "var(--kk-copper)" }}>Precision is.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
