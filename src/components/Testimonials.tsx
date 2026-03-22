import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ayesha',
    review: 'Bubble Liquid detergent is amazing! My clothes have never been this fresh and clean. The premium grade is absolutely worth it.',
    rating: 5,
    initials: 'PS',
  },
  {
    name: 'Fathima',
    review: 'Best dishwash liquid I have used. Cuts through grease like magic and the lemon fragrance is so refreshing. Highly recommend!',
    rating: 5,
    initials: 'RM',
  },
  {
    name: 'Rahman',
    review: 'The floor cleaner leaves my marble floors sparkling. Love the combo offers too — great value for the quality you get.',
    rating: 5,
    initials: 'AD',
  },
  {
    name: 'Nilofar',
    review: 'Switched to Bubble Liquid handwash and my family loves it. Gentle on skin but very effective. Will buy again!',
    rating: 4,
    initials: 'VS',
  },
  {
    name: 'Raja',
    review: 'Ordered the complete bundle and every product exceeded my expectations. WhatsApp ordering is super convenient!',
    rating: 5,
    initials: 'SP',
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show 3 testimonials at a time on desktop
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((active + i) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">What Our Customers Say</h2>
          <div className="w-16 h-1 gradient-primary rounded-full mx-auto" />
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {getVisibleIndices().map((idx) => {
              const t = testimonials[idx];
              return (
                <motion.div
                  key={`${t.name}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-2xl p-6 shadow-product hover:shadow-product-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{t.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-secondary text-secondary' : 'text-border'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">"{t.review}"</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl p-6 shadow-product"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="font-semibold text-primary">{testimonials[active].name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < testimonials[active].rating ? 'fill-secondary text-secondary' : 'text-border'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">"{testimonials[active].review}"</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === active ? 'gradient-primary w-6' : 'bg-border'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
