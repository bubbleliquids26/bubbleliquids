import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

type ProductVariant = {
  product: (typeof products)[number];
  sizeMl: number;
  key: string;
};

function rotate<T>(arr: T[], k: number): T[] {
  if (arr.length === 0) return arr;
  const k2 = ((k % arr.length) + arr.length) % arr.length;
  return [...arr.slice(k2), ...arr.slice(0, k2)];
}

/**
 * Mix ½L, 1L, and 5L in one stream so 5L isn’t only at the end.
 * Buckets follow product order; buckets are rotated so each triple mixes different SKUs.
 */
function interleaveVariantsMixedBuckets(): ProductVariant[] {
  const g500: ProductVariant[] = [];
  const g1000: ProductVariant[] = [];
  const g5000: ProductVariant[] = [];
  for (const p of products) {
    for (const s of p.sizes) {
      const v: ProductVariant = {
        product: p,
        sizeMl: s.ml,
        key: `${p.id}-${s.ml}`,
      };
      if (s.ml === 500) g500.push(v);
      else if (s.ml === 1000) g1000.push(v);
      else if (s.ml === 5000) g5000.push(v);
    }
  }
  const r500 = rotate(g500, 1);
  const r1000 = rotate(g1000, 2);
  const r5000 = rotate(g5000, 3);

  const out: ProductVariant[] = [];
  let i500 = 0;
  let i1000 = 0;
  let i5000 = 0;
  // 5L first in each triple so bulk sizes can appear at the top or between ½L/1L cards
  while (i500 < r500.length || i1000 < r1000.length || i5000 < r5000.length) {
    if (i5000 < r5000.length) out.push(r5000[i5000++]);
    if (i500 < r500.length) out.push(r500[i500++]);
    if (i1000 < r1000.length) out.push(r1000[i1000++]);
  }
  return out;
}

const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
const litreOptions = ['All', '½ Litre', '1 Litre', '5 Litre'] as const;

type LitreFilter = (typeof litreOptions)[number];

function sizeMatchesLitreFilter(sizeMl: number, filter: LitreFilter): boolean {
  if (filter === 'All') return true;
  if (filter === '½ Litre') return sizeMl === 500;
  if (filter === '1 Litre') return sizeMl === 1000;
  if (filter === '5 Litre') return sizeMl === 5000;
  return true;
}

const Products = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [litre, setLitre] = useState<LitreFilter>('All');

  const variants = useMemo(() => interleaveVariantsMixedBuckets(), []);

  const filtered = useMemo(() => {
    return variants.filter(({ product, sizeMl }) => {
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || product.category === category;
      const matchLitre = sizeMatchesLitreFilter(sizeMl, litre);

      return matchSearch && matchCategory && matchLitre;
    });
  }, [search, category, litre, variants]);

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Our Products</h1>
          <p className="text-muted-foreground">Premium cleaning solutions for every need</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-4 mb-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 transition"
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  category === c
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-accent text-accent-foreground hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Litre filter */}
          <select
            value={litre}
            onChange={e => setLitre(e.target.value as LitreFilter)}
            className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 min-w-[10rem]"
          >
            {litreOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'All sizes' : opt}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(({ product, sizeMl, key }, i) => (
            <ProductCard
              key={key}
              product={product}
              variantMl={sizeMl}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
