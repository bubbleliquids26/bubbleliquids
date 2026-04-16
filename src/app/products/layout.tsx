import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products | Bubble Liquid Shop',
  description: 'Browse our complete range of premium liquid detergents, fabric conditioners, dishwashers, and floor cleaners. Find the perfect cleaning solution for your needs.',
  alternates: {
    canonical: '/products',
  }
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
