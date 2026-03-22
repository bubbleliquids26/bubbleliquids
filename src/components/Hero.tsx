import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const heroBanners = [
  {
    bgSrc: "/hero/1.png",
    mobileSrc: "/hero/1-mobile.png",
    eyebrow: "Dishwash Gel",
    heading: "Sparkling Dishes. Gentle on Hands.",
    subtext:
      "Cuts through tough grease while keeping your hands soft and safe every wash.",
    textColor: "white",
  },
  {
    bgSrc: "/hero/2.png",
    mobileSrc: "/hero/2-mobile.png",
    eyebrow: "Perfumed Phenyl",
    heading: "Fresh Floors. Long‑Lasting Fragrance.",
    subtext:
      "Disinfects surfaces and leaves your home filled with a soothing floral scent.",
    textColor: "#2B1B2D",
  },
  {
    bgSrc: "/hero/3.png",
    mobileSrc: "/hero/3-mobile.png",
    eyebrow: "Floor Cleaner",
    heading: "Clean You Can See. Protection You Can Feel.",
    subtext:
      "Removes stubborn stains and kills germs, giving every room a bright, hygienic shine.",
    textColor: "white",
  },
  {
    bgSrc: "/hero/4.png",
    mobileSrc: "/hero/4-mobile.png",
    eyebrow: "Detergent Smart Gel",
    heading: "Powerful on Stains. Smart on Fabrics.",
    subtext:
      "Concentrated gel that dissolves quickly, caring for colors and keeping clothes fresh.",
    textColor: "#FDFBFF",
  },
  {
    bgSrc: "/hero/5.png",
    mobileSrc: "/hero/5-mobile.png",
    eyebrow: "Ultra Power Gel",
    heading: "Ultra Clean for Ultra Tough Stains.",
    subtext:
      "Advanced stain‑lifting formula for collars, cuffs, and everyday dirt in one easy wash.",
    textColor: "#FFFFFF",
  },
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroBanners.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  return (
    <section className="relative pt-36 md:pt-28 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl border"
          style={{
            backgroundImage: isMobile
              ? `url(${heroBanners[currentImage].mobileSrc})`
              : `url(${heroBanners[currentImage].bgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "white",
          }}
        >
          {/* inner padding container */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 min-h-[520px] md:min-h-[600px] flex flex-col justify-center">
            {/* Left text (only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
              style={{ color: heroBanners[currentImage].textColor }}
            >
              <span className="inline-block bg-black/10 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                {heroBanners[currentImage].eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {heroBanners[currentImage].heading}
              </h1>
              <p className="text-lg mb-8 max-w-xl leading-relaxed">
                {heroBanners[currentImage].subtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-fit">
                <Link
                  to="/products"
                  className="gradient-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:shadow-lg hover:shadow-secondary/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="border-2 border-primary text-primary px-8 py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] text-center flex items-center justify-center"
                >
                  View Products
                </Link>
              </div>
            </motion.div>

            {/* dots */}
            <div className="mt-8 flex items-center gap-2">
              {heroBanners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentImage
                      ? "w-8 gradient-primary"
                      : "w-2.5 bg-black/20 hover:bg-black/30"
                  }`}
                  aria-label={`Go to banner ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
