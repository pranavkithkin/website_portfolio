'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/**
 * Device Showcase — scroll-driven reveal, autoplay videos.
 * 
 * - Sticky section: devices appear one-by-one as user scrolls
 * - Videos AUTOPLAY naturally (loop, muted) — NOT scroll-synced
 * - Each device fades in with 3D transforms, then fades out for the next
 */

const FEATURED = [
  { slug: 'bwmc', name: 'BWMC', device: 'laptop' as const, tagline: 'Corporate Excellence · UAE' },
  { slug: 'aurora-souq', name: 'Aurora Souq', device: 'laptop' as const, tagline: 'E-commerce · UAE' },
  { slug: 'harven-llc', name: 'Harven LLC', device: 'laptop' as const, tagline: 'Professional Services · UAE' },
  { slug: 'alrizq', name: 'Al Rizq', device: 'laptop' as const, tagline: 'Corporate · KSA' },
  { slug: 'ahalia-group', name: 'Ahalia Group', device: 'laptop' as const, tagline: 'Business Group · UAE' },
  { slug: 'malik-al-harir', name: 'Malik Al Harir', device: 'laptop' as const, tagline: 'Fashion · UAE' },
  { slug: 'payyoli-mixture', name: 'Payyoli Mixture', device: 'laptop' as const, tagline: 'Healthcare · India' },
  { slug: 'namu-ae', name: 'NAMU UAE', device: 'laptop' as const, tagline: 'Services · UAE' },
  { slug: 'pixel-and-pepper', name: 'Pixel & Pepper', device: 'laptop' as const, tagline: 'Creative Agency' },
  { slug: 'elitepoint-cs', name: 'ElitePoint CS', device: 'laptop' as const, tagline: 'Business Setup · UAE' },
];

export default function DeviceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${FEATURED.length * 100 + 50}vh` }}
      aria-label="Device showcase"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Clean dark background — no blur */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#0a0a0a',
          }}
        />

        {/* Gold accent glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(201,185,154,0.05) 0%, transparent 60%)',
          }}
        />

        {/* Section label */}
        <div className="absolute left-6 top-8 z-20 md:left-12">
          <p
            className="font-body text-[10px] uppercase tracking-[0.3em]"
            style={{ color: 'rgba(201,185,154,0.5)' }}
          >
            Featured Work
          </p>
        </div>

        {/* View All link */}
        <div className="absolute right-6 top-8 z-20 md:right-12">
          <a
            href="#portfolio"
            className="font-body text-[10px] uppercase tracking-[0.3em] transition-opacity hover:opacity-60"
            style={{ color: 'rgba(201,185,154,0.5)' }}
          >
            View All Work ↓
          </a>
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-8 left-6 right-6 z-20 h-px md:left-12 md:right-12"
          style={{ backgroundColor: 'rgba(201,185,154,0.12)' }}
        >
          <motion.div
            className="h-full origin-left"
            style={{
              backgroundColor: '#C9B99A',
              scaleX: scrollYProgress,
              boxShadow: '0 0 8px rgba(201,185,154,0.4)',
            }}
          />
        </div>

        {/* Counter */}
        <Counter scrollProgress={scrollYProgress} total={FEATURED.length} />

        {/* Device cards — one at a time */}
        {FEATURED.map((project, i) => (
          <DeviceCard
            key={project.slug}
            project={project}
            index={i}
            total={FEATURED.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

// ── Counter showing current project number ──────────────────────────────────

function Counter({
  scrollProgress,
  total,
}: {
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  total: number;
}) {
  const current = useTransform(scrollProgress, [0, 1], [1, total]);

  return (
    <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
      <motion.span
        className="font-body tabular-nums text-[10px] tracking-widest"
        style={{ color: 'rgba(201,185,154,0.4)' }}
      >
        {/* Updated via motion value */}
        <motion.span>{useTransform(current, (v) => String(Math.round(v)).padStart(2, '0'))}</motion.span>
        <span> / {String(total).padStart(2, '0')}</span>
      </motion.span>
    </div>
  );
}

// ── Individual device with scroll-driven reveal + autoplay video ────────────

function DeviceCard({
  project,
  index,
  total,
  scrollProgress,
}: {
  project: (typeof FEATURED)[number];
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Each card's scroll range
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;

  // Entrance / exit transforms
  const opacity = useTransform(
    scrollProgress,
    [cardStart, cardStart + 0.03, cardEnd - 0.03, cardEnd],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollProgress,
    [cardStart, cardStart + 0.05, cardEnd - 0.05, cardEnd],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(
    scrollProgress,
    [cardStart, cardStart + 0.04, cardEnd - 0.04, cardEnd],
    [80, 0, 0, -80]
  );
  const rotateX = useTransform(
    scrollProgress,
    [cardStart, cardStart + 0.05, cardEnd - 0.05, cardEnd],
    [12, 0, 0, -12]
  );

  // Play video when card is visible + detect when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mark ready when video actually starts playing or has data
    const markReady = () => {
      if (!videoReady) setVideoReady(true);
    };

    video.addEventListener('playing', markReady);
    video.addEventListener('loadeddata', markReady);

    // Safety timeout — if events never fire, show video anyway after 3s
    const timeout = setTimeout(markReady, 3000);

    const unsubscribe = opacity.on('change', (v) => {
      if (v > 0.3) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('playing', markReady);
      video.removeEventListener('loadeddata', markReady);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity, scale, y, rotateX, perspective: 1200 }}
    >
      {/* Device frame */}
      <div
        className="relative"
        style={{ width: 'min(85vw, 900px)' }}
      >
        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '10px 10px 0 0',
            border: '2px solid rgba(201,185,154,0.2)',
            backgroundColor: '#111',
            aspectRatio: '16/10',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(201,185,154,0.06)',
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-1.5 px-3 py-2"
            style={{ backgroundColor: 'rgba(201,185,154,0.06)' }}
          >
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#febc2e' }} />
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#28c840' }} />
            <div
              className="ml-3 flex-1 rounded px-2 py-0.5 text-center"
              style={{
                backgroundColor: 'rgba(250,250,248,0.05)',
                fontSize: '9px',
                color: 'rgba(250,250,248,0.3)',
                fontFamily: 'monospace',
              }}
            >
              {project.slug.replace(/-/g, '')}.com
            </div>
          </div>

          {/* ── Loading skeleton (shows while video buffers) ── */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              top: '28px', /* below browser chrome */
              opacity: videoReady ? 0 : 1,
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            {/* Animated gradient shimmer */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(110deg, #111 30%, #1a1a1a 50%, #111 70%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.8s ease-in-out infinite',
              }}
            />

            {/* Spinner + site name */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* Rotating ring */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: '2px solid rgba(201,185,154,0.1)',
                  borderTopColor: '#C9B99A',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p
                className="font-body text-[10px] uppercase tracking-[0.3em]"
                style={{ color: 'rgba(201,185,154,0.4)' }}
              >
                Loading {project.name}
              </p>
            </div>
          </div>

          {/* VIDEO — autoplay, crossfades in when ready */}
          <video
            ref={videoRef}
            src={`/scroll-videos/${project.slug}.mp4`}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover"
            style={{
              display: 'block',
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
        </div>

        {/* Laptop base */}
        <div
          className="mx-auto"
          style={{
            width: '104%',
            marginLeft: '-2%',
            height: '10px',
            background: 'linear-gradient(180deg, rgba(201,185,154,0.12) 0%, rgba(201,185,154,0.04) 100%)',
            borderRadius: '0 0 6px 6px',
            borderTop: '1px solid rgba(201,185,154,0.15)',
          }}
        />
      </div>

      {/* Project info */}
      <div className="mt-6 text-center">
        <p
          className="font-display text-lg font-bold md:text-2xl"
          style={{ color: '#FAFAF8', letterSpacing: '-0.02em' }}
        >
          {project.name}
        </p>
        <p
          className="font-body mt-1 text-[11px] uppercase tracking-widest"
          style={{ color: 'rgba(201,185,154,0.45)' }}
        >
          {project.tagline}
        </p>

        {/* Live indicator */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: '#28c840',
              boxShadow: '0 0 6px rgba(40,200,64,0.5)',
            }}
          />
          <span
            className="font-body text-[9px] uppercase tracking-widest"
            style={{ color: 'rgba(250,250,248,0.3)' }}
          >
            Live
          </span>
        </div>
      </div>
    </motion.div>
  );
}
