import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Bubble Liquid | Our Story & Values',
  description: 'Learn about Bubble Liquid, our journey, and our commitment to delivering powerful, high-quality, and eco-conscious cleaning products for your home.',
  alternates: {
    canonical: '/about-us',
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
