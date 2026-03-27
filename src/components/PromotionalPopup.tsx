import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";

const PromotionalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds of page load (on every refresh)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("FIRSTORDER10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Only close if clicking directly on backdrop, not on popup content
              if (e.target === e.currentTarget) {
                handleClose();
              }
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 mt-16"
          >
            <div className="relative w-full max-w-sm bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-3xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Content */}
              <div className="relative p-6 sm:p-8 text-center text-white">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

                {/* Main Content */}
                <div className="relative z-10">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 text-sm font-semibold"
                  >
                    🎉 Limited Time Offer
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl sm:text-3xl font-bold mb-2 leading-tight"
                  >
                    Welcome to Bubble Liquids Family!
                  </motion.h2>

                  {/* Subheading */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm sm:text-base text-white/90 mb-6"
                  >
                    For the first 20 customers only
                  </motion.p>

                  {/* Discount Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <div className="inline-block bg-white/25 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/30">
                      <p className="text-white/80 text-xs font-medium mb-0.5">
                        Get
                      </p>
                      <p className="text-4xl sm:text-5xl font-bold mb-0.5">
                        10%
                      </p>
                      <p className="text-white/80 text-xs font-medium">
                        Discount
                      </p>
                    </div>
                  </motion.div>

                  {/* Coupon Code */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <p className="text-white/80 text-xs font-medium mb-2">
                      Apply Coupon Code:
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30 flex-1 sm:flex-none">
                        <p className="text-lg sm:text-xl font-bold font-mono tracking-widest">
                          FIRSTORDER10
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyCode}
                        className="bg-white text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    onClick={handleClose}
                    className="w-full bg-white text-blue-600 py-3 rounded-2xl font-bold text-base hover:bg-gray-100 transition-all hover:shadow-lg active:scale-95"
                  >
                    Shop Now & Claim Offer
                  </motion.button>

                  {/* Footer text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs text-white/70 mt-4"
                  >
                    Valid for first 20 customers only. Offer expires soon!
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromotionalPopup;
