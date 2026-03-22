import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FloatingBubbles = () => {
  const [bubbleCount, setBubbleCount] = useState(8);

  useEffect(() => {
    const updateBubbleCount = () => {
      setBubbleCount(window.innerWidth >= 1024 ? 25 : 8); // 28 for desktop, 8 for mobile
    };

    updateBubbleCount();
    window.addEventListener('resize', updateBubbleCount);
    return () => window.removeEventListener('resize', updateBubbleCount);
  }, []);

  const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 80 + 30,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 12 + 15,
    opacity: Math.random() * 0.15 + 0.05,
    wobble: Math.random() * 40 - 20,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {bubbles.map(b => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: `-${b.size}px`,
          }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight + b.size + 200 : 1200)],
            x: [0, b.wobble, -b.wobble/2, b.wobble/3, 0],
            scale: [1, 1.05, 0.98, 1.02, 1],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            y: { duration: b.duration, repeat: Infinity, delay: b.delay, ease: 'linear' },
            x: { duration: b.duration / 3, repeat: Infinity, delay: b.delay, ease: 'easeInOut', repeatType: 'reverse' },
            scale: { duration: 5, repeat: Infinity, delay: b.delay, ease: 'easeInOut', repeatType: 'reverse' },
            rotate: { duration: 6, repeat: Infinity, delay: b.delay, ease: 'easeInOut', repeatType: 'reverse' },
          }}
        >
          {/* Main bubble with glass effect */}
          <div 
            className="relative w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, 
                rgba(255, 255, 255, ${b.opacity + 0.1}), 
                rgba(255, 255, 255, ${b.opacity * 0.8}) 20%, 
                rgba(200, 220, 255, ${b.opacity * 0.6}) 40%, 
                rgba(150, 200, 255, ${b.opacity * 0.4}) 60%, 
                rgba(100, 150, 255, ${b.opacity * 0.2}) 80%, 
                rgba(50, 100, 200, ${b.opacity * 0.1}))`,
              boxShadow: `
                inset -5px -5px 10px rgba(255, 255, 255, ${b.opacity + 0.1}),
                inset 5px 5px 10px rgba(100, 150, 255, ${b.opacity * 0.3}),
                0 0 20px rgba(255, 255, 255, ${b.opacity * 0.5}),
                0 0 40px rgba(200, 220, 255, ${b.opacity * 0.3}),
                0 0 60px rgba(150, 200, 255, ${b.opacity * 0.2})`,
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)',
            }}
          >
            {/* Highlight reflection */}
            <div 
              className="absolute rounded-full"
              style={{
                width: '30%',
                height: '30%',
                top: '15%',
                left: '20%',
                background: `radial-gradient(circle, 
                  rgba(255, 255, 255, ${b.opacity + 0.3}), 
                  rgba(255, 255, 255, ${b.opacity * 0.8}) 40%, 
                  transparent 70%)`,
                filter: 'blur(2px)',
              }}
            />
            
            {/* Secondary highlight */}
            <div 
              className="absolute rounded-full"
              style={{
                width: '15%',
                height: '15%',
                top: '25%',
                left: '35%',
                background: `radial-gradient(circle, 
                  rgba(255, 255, 255, ${b.opacity + 0.4}), 
                  rgba(255, 255, 255, ${b.opacity * 0.9}) 50%, 
                  transparent 80%)`,
                filter: 'blur(1px)',
              }}
            />

            {/* Edge reflection */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, 
                  transparent 30%, 
                  rgba(255, 255, 255, ${b.opacity * 0.3}) 45%, 
                  transparent 50%, 
                  rgba(255, 255, 255, ${b.opacity * 0.2}) 65%, 
                  transparent 70%)`,
              }}
            />

            {/* Inner shadow for depth */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 65% 65%, 
                  transparent 40%, 
                  rgba(0, 50, 100, ${b.opacity * 0.2}) 70%, 
                  rgba(0, 30, 80, ${b.opacity * 0.3}))`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBubbles;
