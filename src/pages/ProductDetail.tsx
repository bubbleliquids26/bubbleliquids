import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Tag, Check } from 'lucide-react';
import { products, getProductImage } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();

  const sizeParam = searchParams.get('size');

  const sizeIndexFromUrl = (p: NonNullable<typeof product>, param: string | null) => {
    if (param == null || param === '') return 0;
    const ml = parseInt(param, 10);
    if (Number.isNaN(ml)) return 0;
    const idx = p.sizes.findIndex((s) => s.ml === ml);
    return idx >= 0 ? idx : 0;
  };

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (!product) return;
    setSelectedSize(sizeIndexFromUrl(product, sizeParam));
    setSelectedGrade(0);
  }, [id, product, sizeParam]);

  const selectedSizeObj =
    product?.sizes[selectedSize] ?? product?.sizes[0];
  const mainImageKey =
    product && selectedSizeObj
      ? selectedSizeObj.ml >= 5000 && product.largeImage
        ? product.largeImage
        : product.image
      : "";
  const mainImage = mainImageKey ? getProductImage(mainImageKey) : "";

  const relatedProducts = useMemo(() => {
    if (!product || !selectedSizeObj) return [];
    const selectedMl = selectedSizeObj.ml;
    return products
      .filter((p) => {
        if (p.id === product.id) return false;
        return p.sizes.some((s) => s.ml === selectedMl);
      })
      .slice(0, 4);
  }, [product, selectedSizeObj]);

  const galleryImages = useMemo(() => {
    if (!product || !mainImage) return [];
    const extras = (product.detailImages ?? [])
      .map((p) => getProductImage(p))
      .filter(Boolean);
    return [mainImage, ...extras].filter(Boolean);
  }, [mainImage, product]);

  useEffect(() => {
    if (!mainImage) return;
    setActiveImage(mainImage);
  }, [selectedSize, mainImage, mainImageKey]);

  useEffect(() => {
    if (!mainImage || !galleryImages.length) return;
    if (!activeImage || !galleryImages.includes(activeImage)) {
      setActiveImage(mainImage);
    }
  }, [galleryImages, mainImage, activeImage]);

  const image = activeImage || mainImage;
  const currentPrice = selectedSizeObj?.price ?? 0;

  const handleAddToCart = () => {
    if (!product || !selectedSizeObj) return;
    addItem({
      productId: product.id,
      name: product.name,
      size: product.sizes[selectedSize].label,
      grade: product.grades[selectedGrade].label,
      price: currentPrice,
      image: mainImageKey,
    });
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().length > 0) {
      setCouponApplied(true);
    }
  };

  if (!product) {
    return (
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
          <Link to="/products" className="text-secondary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-accent/30 rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Thumbnails (bottom on mobile, left on desktop) */}
              {galleryImages.length > 1 && (
                <div className="order-2 sm:order-1 flex sm:flex-col gap-3 sm:w-24 overflow-auto sm:overflow-visible">
                  {galleryImages.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setActiveImage(src)}
                      className={`rounded-2xl p-2 bg-background/40 hover:bg-background/60 transition-colors border ${
                        src === image ? 'border-secondary' : 'border-transparent'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="h-16 w-16 object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="order-1 sm:order-2 flex-1 flex items-center justify-center">
                <img
                  src={image}
                  alt={product.name}
                  className="max-h-[380px] sm:max-h-[420px] lg:max-h-[500px] object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-medium text-secondary uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="text-3xl font-extrabold gradient-text">₹{currentPrice}</div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Select Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size, i) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(i)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedSize === i
                        ? 'gradient-primary text-primary-foreground shadow-lg shadow-secondary/20'
                        : 'border border-border text-muted-foreground hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Selection */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Quality Grade</h3>
              <div className="flex gap-3">
                {product.grades.map((grade, i) => (
                  <button
                    key={grade.label}
                    onClick={() => setSelectedGrade(i)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedGrade === i
                        ? 'gradient-primary text-primary-foreground shadow-lg shadow-secondary/20'
                        : 'border border-border text-muted-foreground hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {grade.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Combo Offers */}
            {product.combos.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3">Combo Offers</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.combos.map(combo => (
                    <div key={combo.name} className="glass-card rounded-xl p-4 relative overflow-hidden">
                      <span className="absolute top-2 right-2 gradient-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {combo.discount}% OFF
                      </span>
                      <div className="flex items-start gap-2">
                        <Tag className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-primary text-sm">{combo.name}</p>
                          <p className="text-xs text-muted-foreground">{combo.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coupon */}
            <div>
              <h3 className="text-sm font-semibold text-primary mb-3">Have a Coupon?</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={e => { setCoupon(e.target.value); setCouponApplied(false); }}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-6 py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {couponApplied ? <Check className="h-4 w-4" /> : 'Apply'}
                </button>
              </div>
              {couponApplied && <p className="text-xs text-secondary mt-2">Coupon applied! (Demo)</p>}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full gradient-primary text-primary-foreground py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99] hover:shadow-xl hover:shadow-secondary/20"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart — ₹{currentPrice}
            </button>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-border"
          >
            <h2 className="text-3xl font-bold text-primary mb-8">
              More {product.sizes[selectedSize].label} Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct, idx) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  variantMl={selectedSizeObj.ml}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
