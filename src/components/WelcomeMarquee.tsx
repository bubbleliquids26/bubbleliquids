const SLOGANS = [
  "Welcome to Bubble Liquid",
  "Feel the freshness in every drop",
  "Premium cleaning for every home",
  "Quality you can trust",
  "Sparkling clean, every time",
  "Trusted by families across India",
  "Your home deserves the best",
  "Powerful on stains, gentle on fabrics",
  "Natural care, lasting fragrance",
  "Every bubble, a promise of purity",
  "Affordable excellence, every day",
  "Clean smarter, live fresher",
] as const;

/** Repeat slogans so one track is always wider than the viewport (no empty band). */
const TRACK_SLOGANS = [...SLOGANS, ...SLOGANS, ...SLOGANS];

const LogoMark = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 p-1 shadow-sm ring-1 ring-white/35 md:h-8 md:w-8">
    <img
      src="/logo.png"
      alt=""
      className="h-full w-full object-contain"
      aria-hidden
    />
  </div>
);

/** Single continuous row: logo + slogan + dot — repeated many times */
const MarqueeTrack = () => (
  <div className="flex shrink-0 items-center gap-2 md:gap-3">
    {TRACK_SLOGANS.map((text, i) => (
      <div
        key={`${text}-${i}`}
        className="flex shrink-0 items-center gap-2 md:gap-2.5 text-primary-foreground"
      >
        <LogoMark />
        <span className="whitespace-nowrap text-xs font-semibold tracking-wide sm:text-sm md:text-[15px]">
          {text}
        </span>
        <span className="shrink-0 text-primary-foreground/50" aria-hidden>
          ·
        </span>
      </div>
    ))}
  </div>
);

const WelcomeMarquee = () => (
  <section
    className="gradient-primary border-y border-primary/30"
    aria-label="Welcome message"
  >
    <div className="group relative overflow-hidden py-5.5 md:py-6">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[hsl(237,100%,18%)] to-transparent md:w-12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[hsl(213,100%,38%)] to-transparent md:w-12"
        aria-hidden
      />
      {/*
        Two identical tracks, no gap/padding between them — translateX(-50%) loops seamlessly.
      */}
      <div className="flex w-max will-change-transform animate-welcome-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  </section>
);

export default WelcomeMarquee;
