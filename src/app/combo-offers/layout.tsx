import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bubble Liquid Combo Offers | Save More on Cleaning Supplies',
  description: 'Discover the best deals on Bubble Liquid products. Shop our exclusive combo offers and family packs to get premium cleaning solutions at unbeatable prices.',
  alternates: {
    canonical: '/combo-offers',
  }
};

export default function ComboOffersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
