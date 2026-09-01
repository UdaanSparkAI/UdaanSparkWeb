export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface DeleteAccountPayload {
  email: string;
  reason: string;
  note?: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface WhyCard {
  icon: string;
  title: string;
  description: string;
}
