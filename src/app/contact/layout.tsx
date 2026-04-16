import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Bubble Liquid',
  description: 'Get in touch with Bubble Liquid for any inquiries. Reach us via email, WhatsApp, or a direct call.',
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
