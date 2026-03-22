import { motion } from "framer-motion";
import ComboOffersComponent from "@/components/ComboOffers";

const ComboOffers = () => {
  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 py-12 px-4 mt-8"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Combo Offers
          </h1>
          <p className="text-lg text-muted-foreground">
            Get amazing discounts with our exclusive combo bundles
          </p>
        </div>
      </motion.div>

      <ComboOffersComponent />
    </div>
  );
};

export default ComboOffers;
