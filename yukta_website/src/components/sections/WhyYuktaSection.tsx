import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GradientText } from "@/components/ui/GradientText";
import { WHY_YUKTA } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  rupee: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 3h12M6 8h12M6 13l10 9M6 13h3a4 4 0 000-8H6" />
    </svg>
  ),
  clock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  brain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M9.5 2A2.5 2.5 0 017 4.5v1A2.5 2.5 0 004.5 8H4a2 2 0 00-2 2v4a2 2 0 002 2h.5A2.5 2.5 0 017 18.5v1a2.5 2.5 0 002.5 2.5h5a2.5 2.5 0 002.5-2.5v-1a2.5 2.5 0 012.5-2.5H20a2 2 0 002-2v-4a2 2 0 00-2-2h-.5A2.5 2.5 0 0117 5.5v-1A2.5 2.5 0 0014.5 2h-5z" />
    </svg>
  ),
  store: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 9l1-7h16l1 7" /><path d="M3 9a5 5 0 0010 0M13 9a5 5 0 0010 0" />
      <path d="M5 21v-9.09M19 21v-9.09M5 21h14" />
    </svg>
  ),
  decision: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  person: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export function WhyYuktaSection() {
  return (
    <section className="py-24 bg-subtle" aria-labelledby="why-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 id="why-heading" className="text-3xl md:text-4xl font-extrabold text-dark mb-4">
            Built for <GradientText>Smart Shoppers</GradientText>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            YUKTA AI isn&apos;t just another price app — it&apos;s an intelligent grocery companion
            that learns your preferences and optimises every order.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_YUKTA.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.07}>
              <div className="flex gap-4 p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all duration-300 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-primary"
                  style={{ background: "rgba(22,163,74,0.08)" }}
                >
                  {ICONS[card.icon]}
                </div>
                <div>
                  <h3 className="font-bold text-text mb-1">{card.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
