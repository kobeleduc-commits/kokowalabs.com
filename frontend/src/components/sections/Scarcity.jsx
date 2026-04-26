export default function Scarcity() {
  return (
    <section className="kk-section relative" style={{ background: "var(--kk-paper)" }} data-testid="section-scarcity">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="font-mono-label" style={{ color: "var(--kk-copper)" }}>Selective Access</div>
            <h2 className="font-display mt-5 text-[40px] md:text-[58px] leading-[1.02] font-medium tracking-tight">
              We only work with a limited number of founders per month.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
              Strategic time is the constrained resource. Quality of attention compounds when it is rationed. Every engagement is reviewed personally and matched to fit.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "Reviewed", v: "Personally" },
                { k: "Slots", v: "Limited monthly" },
                { k: "Access", v: "By application" },
              ].map((s) => (
                <div key={s.k} className="border-t pt-4" style={{ borderColor: "var(--kk-ink)" }}>
                  <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>{s.k}</div>
                  <div className="font-display text-[20px] md:text-[24px] mt-2 leading-tight">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
