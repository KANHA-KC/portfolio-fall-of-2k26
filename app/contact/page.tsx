import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Studio',
  description:
    'Get in touch for product design leadership, advisory, and creative collaborations.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__meta">Initiate Dialogue</div>
        <h1 className="page-hero__title">Let&apos;s start a conversation.</h1>
        <p className="page-hero__sub">
          Whether you&apos;re scoping an ambitious new product, rethinking a complex
          enterprise workflow, or exploring AI interaction patterns — drop a note.
        </p>
      </section>

      <ContactForm />
    </>
  );
}
