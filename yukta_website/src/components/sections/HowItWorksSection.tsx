import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StepTimeline } from "@/components/ui/StepTimeline";
import { GradientText } from "@/components/ui/GradientText";
import { HOW_IT_WORKS, STORES } from "@/lib/constants";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24" aria-labelledby="howitworks-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Heading */}
          <AnimatedSection>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 id="howitworks-heading" className="text-3xl md:text-4xl font-extrabold text-dark mb-5">
              From Search to{" "}
              <GradientText>Savings in 4 Steps</GradientText>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              YUKTA AI makes intelligent grocery shopping effortless. No complex setup,
              no manual comparing — just search and save.
            </p>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: String(STORES.length), unit: "Platforms", desc: "Compared instantly" },
                { value: "₹247", unit: "Avg Saved", desc: "Per grocery order" },
                { value: "<10s", unit: "Results", desc: "AI processing time" },
              ].map((stat) => (
                <div key={stat.unit} className="bg-subtle rounded-2xl p-4 text-center">
                  <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
                  <div className="text-xs font-semibold text-text mt-0.5">{stat.unit}</div>
                  <div className="text-xs text-muted mt-0.5">{stat.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <AnimatedSection delay={0.2}>
            <StepTimeline steps={HOW_IT_WORKS} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
