import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const STAGES = ["Idea", "Launch", "Scaling", "Established"];
const SITUATIONS = [
  "Repositioning an existing brand",
  "Launching a new specialty business",
  "Scaling beyond first location",
  "Restructuring economics",
  "Building from origin",
];
const URGENCIES = ["Immediate", "1 to 3 months", "Exploring"];
const COMMITMENTS = [
  "Yes. Ready to commit if there is fit.",
  "No. Just exploring at this stage.",
];
const BUDGETS = [
  "Below 5k",
  "5k to 15k",
  "15k to 40k",
  "40k+",
  "Prefer not to say",
];

const STEPS_META = [
  { idx: 0, label: "Identity", n: "01" },
  { idx: 1, label: "Stage", n: "02" },
  { idx: 2, label: "Situation", n: "03" },
  { idx: 3, label: "Challenge", n: "04" },
  { idx: 4, label: "Urgency", n: "05" },
  { idx: 5, label: "Commitment", n: "06" },
  { idx: 6, label: "Budget", n: "07" },
];

export default function Apply() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    stage: "",
    situation: "",
    challenge: "",
    urgency: "",
    commitment: "",
    budget: "",
  });

  const set = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setData((d) => ({ ...d, [field]: value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!data.name.trim()) e.name = "Required";
      if (!data.email.trim()) e.email = "Required";
      else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email";
      if (!data.company.trim()) e.company = "Required";
    }
    if (step === 1 && !data.stage) e.stage = "Select one";
    if (step === 2 && !data.situation) e.situation = "Select one";
    if (step === 3 && data.challenge.trim().length < 20) e.challenge = "At least 20 characters";
    if (step === 4 && !data.urgency) e.urgency = "Select one";
    if (step === 5 && !data.commitment) e.commitment = "Select one";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS_META.length - 1) setStep(step + 1);
    else submit();
  };

  const back = () => step > 0 && setStep(step - 1);

  const submit = async () => {
    setSubmitting(true);
    setServerError("");
    try {
      const res = await axios.post(`${API}/applications`, data);
      if (res.data?.id) navigate(`/thank-you?id=${res.data.id}`);
      else navigate("/thank-you");
    } catch (err) {
      setServerError(
        err?.response?.data?.detail || "Something went wrong. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS_META.length) * 100;

  return (
    <div data-testid="page-apply">
      <section className="pt-6 md:pt-12 pb-10">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Apply</div>
          <h1 className="font-display mt-6 text-[40px] md:text-[64px] leading-[0.98] font-medium tracking-tight max-w-3xl">
            Apply for a Strategic Diagnostic.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: "var(--kk-ink-soft)" }}>
            Every application is reviewed personally. If there is a strong fit, you will receive a personal invitation.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar steps */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="font-mono-label mb-6" style={{ color: "var(--kk-mute)" }}>
                Step {step + 1} of {STEPS_META.length}
              </div>
              <div className="h-[2px] w-full mb-10 relative" style={{ background: "var(--kk-line)" }}>
                <div
                  className="h-[2px] absolute top-0 left-0 transition-all duration-500"
                  style={{ background: "var(--kk-copper)", width: `${progress}%` }}
                />
              </div>
              <ul className="space-y-3">
                {STEPS_META.map((s) => {
                  const active = s.idx === step;
                  const done = s.idx < step;
                  return (
                    <li
                      key={s.n}
                      className="flex items-baseline gap-4 transition-opacity"
                      style={{ opacity: active ? 1 : done ? 0.6 : 0.35 }}
                      data-testid={`apply-step-indicator-${s.idx}`}
                    >
                      <span className="font-mono-label" style={{ color: active ? "var(--kk-copper)" : "var(--kk-mute)" }}>
                        {s.n}
                      </span>
                      <span className="font-display text-[18px] md:text-[22px]" style={{ color: "var(--kk-ink)" }}>
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="kk-divider mt-12 mb-6" />
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>
                All information is treated with strict confidentiality.
              </p>
            </div>
          </aside>

          {/* Form steps */}
          <div className="lg:col-span-8">
            <div className="min-h-[420px]">
              {step === 0 && (
                <div className="kk-reveal" data-testid="apply-step-0">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    Who is applying.
                  </h2>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Name</label>
                      <input className="kk-input" data-testid="apply-name" value={data.name} onChange={set("name")} placeholder="Full name" />
                      {errors.name && <div className="text-xs mt-1" style={{ color: "var(--kk-copper-deep)" }}>{errors.name}</div>}
                    </div>
                    <div>
                      <label className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Email</label>
                      <input className="kk-input" data-testid="apply-email" value={data.email} onChange={set("email")} placeholder="you@brand.com" type="email" />
                      {errors.email && <div className="text-xs mt-1" style={{ color: "var(--kk-copper-deep)" }}>{errors.email}</div>}
                    </div>
                    <div>
                      <label className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Company</label>
                      <input className="kk-input" data-testid="apply-company" value={data.company} onChange={set("company")} placeholder="Brand or business name" />
                      {errors.company && <div className="text-xs mt-1" style={{ color: "var(--kk-copper-deep)" }}>{errors.company}</div>}
                    </div>
                    <div>
                      <label className="font-mono-label" style={{ color: "var(--kk-mute)" }}>Website</label>
                      <input className="kk-input" data-testid="apply-website" value={data.website} onChange={set("website")} placeholder="https://" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="kk-reveal" data-testid="apply-step-1">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    What stage is your business in.
                  </h2>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STAGES.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => set("stage")(s)}
                        className={`kk-radio-card text-left ${data.stage === s ? "selected" : ""}`}
                        data-testid={`apply-stage-${s.toLowerCase()}`}
                      >
                        <div className="font-display text-[22px]">{s}</div>
                      </button>
                    ))}
                  </div>
                  {errors.stage && <div className="text-xs mt-3" style={{ color: "var(--kk-copper-deep)" }}>{errors.stage}</div>}
                </div>
              )}

              {step === 2 && (
                <div className="kk-reveal" data-testid="apply-step-2">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    Which situation describes you best.
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-4">
                    {SITUATIONS.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => set("situation")(s)}
                        className={`kk-radio-card text-left ${data.situation === s ? "selected" : ""}`}
                        data-testid={`apply-situation-${s.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        <div className="text-[16px]">{s}</div>
                      </button>
                    ))}
                  </div>
                  {errors.situation && <div className="text-xs mt-3" style={{ color: "var(--kk-copper-deep)" }}>{errors.situation}</div>}
                </div>
              )}

              {step === 3 && (
                <div className="kk-reveal" data-testid="apply-step-3">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    What is the biggest strategic challenge in front of you right now.
                  </h2>
                  <p className="mt-3 text-[14px]" style={{ color: "var(--kk-mute)" }}>
                    Be specific. The more concrete, the more useful the conversation.
                  </p>
                  <textarea
                    rows={6}
                    className="kk-textarea mt-8"
                    data-testid="apply-challenge"
                    placeholder="Describe the situation in your own words"
                    value={data.challenge}
                    onChange={set("challenge")}
                  />
                  {errors.challenge && <div className="text-xs mt-1" style={{ color: "var(--kk-copper-deep)" }}>{errors.challenge}</div>}
                </div>
              )}

              {step === 4 && (
                <div className="kk-reveal" data-testid="apply-step-4">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    How urgent is this for you.
                  </h2>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {URGENCIES.map((u) => (
                      <button
                        type="button"
                        key={u}
                        onClick={() => set("urgency")(u)}
                        className={`kk-radio-card text-left ${data.urgency === u ? "selected" : ""}`}
                        data-testid={`apply-urgency-${u.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        <div className="font-display text-[20px]">{u}</div>
                      </button>
                    ))}
                  </div>
                  {errors.urgency && <div className="text-xs mt-3" style={{ color: "var(--kk-copper-deep)" }}>{errors.urgency}</div>}
                </div>
              )}

              {step === 5 && (
                <div className="kk-reveal" data-testid="apply-step-5">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    Are you ready to commit if there is fit.
                  </h2>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {COMMITMENTS.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => set("commitment")(c)}
                        className={`kk-radio-card text-left ${data.commitment === c ? "selected" : ""}`}
                        data-testid={`apply-commitment-${c.startsWith("Yes") ? "yes" : "no"}`}
                      >
                        <div className="text-[16px]">{c}</div>
                      </button>
                    ))}
                  </div>
                  {errors.commitment && <div className="text-xs mt-3" style={{ color: "var(--kk-copper-deep)" }}>{errors.commitment}</div>}
                </div>
              )}

              {step === 6 && (
                <div className="kk-reveal" data-testid="apply-step-6">
                  <h2 className="font-display text-[28px] md:text-[36px] font-medium tracking-tight">
                    Budget range. <span className="font-mono-label align-middle ml-2" style={{ color: "var(--kk-mute)" }}>Optional</span>
                  </h2>
                  <p className="mt-3 text-[14px]" style={{ color: "var(--kk-mute)" }}>
                    Helps match the right engagement. Honest answers serve both sides.
                  </p>
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => set("budget")(b)}
                        className={`kk-radio-card text-left ${data.budget === b ? "selected" : ""}`}
                        data-testid={`apply-budget-${b.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        <div className="font-display text-[20px]">{b}</div>
                      </button>
                    ))}
                  </div>

                  <p className="mt-10 text-[12px] leading-relaxed" style={{ color: "var(--kk-mute)" }}>
                    All information is treated with strict confidentiality.
                  </p>
                </div>
              )}
            </div>

            {serverError && (
              <div className="mt-6 p-4" style={{ background: "var(--kk-paper)", color: "var(--kk-copper-deep)" }} data-testid="apply-server-error">
                {serverError}
              </div>
            )}

            <div className="mt-12 flex items-center justify-between gap-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0 || submitting}
                className="kk-btn kk-btn-ghost"
                style={{ opacity: step === 0 ? 0.3 : 1 }}
                data-testid="apply-back"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={submitting}
                className="kk-btn"
                data-testid="apply-next"
              >
                {submitting ? "Submitting..." : step === STEPS_META.length - 1 ? "Submit Application" : "Continue"}
                {!submitting && <span aria-hidden>↗</span>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
