import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Accordion } from "@/components/ui/Accordion";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { FAQ_ITEMS, PRICING, STORE_LIST } from "@/lib/constants";

export function FAQSection() {
  return (
    <section id="faq" className="py-24" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-extrabold text-dark mb-4">
            Frequently Asked{" "}
            <GradientText>Questions</GradientText>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            Everything you need to know about YUKTA AI. Can&apos;t find the answer?{" "}
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact our team.
            </a>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Accordion items={FAQ_ITEMS} />
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
          <h3 className="text-xl font-bold text-dark mb-2">Ready to save on groceries?</h3>
          <p className="text-muted text-sm mb-6">
            Download YUKTA AI and start comparing prices across {STORE_LIST} today.
          </p>
          <Button href="#" size="lg" variant="primary">
            Start Your {PRICING.trialDays}-Day Free Trial
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
