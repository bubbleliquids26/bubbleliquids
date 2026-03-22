import { motion } from 'framer-motion';
import { Award, IndianRupee, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'High Quality Formula',
    description: 'Lab-tested premium ingredients for powerful, safe cleaning results.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    description: 'Premium quality at prices that fit every budget. Value guaranteed.',
  },
  {
    icon: MessageCircle,
    title: 'Fast WhatsApp Ordering',
    description: 'Order instantly via WhatsApp. Quick response, fast delivery.',
  },
];

const FeatureCards = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Why Choose Bubble Liquid?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Quality, affordability, and convenience — all in one brand.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card rounded-2xl p-8 hover:shadow-product-hover transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="gradient-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
