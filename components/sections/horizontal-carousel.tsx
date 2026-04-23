'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { projects } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';

// Featured projects for the carousel
const featured = projects.filter((p) => p.isFeatured || p.isDemo).slice(0, 10);

export default function HorizontalCarousel() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: `${Math.max(200, trackWidth + window?.innerHeight || 2400)}px`,
      }}
      aria-label="Featured projects carousel"
    >
      {/* Sticky horizontal track */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Section label — top left */}
        <div
          className="absolute left-6 top-8 z-10 md:left-12"
        >
          <p
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Featured Work
          </p>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-8 left-6 right-6 z-10 h-px md:left-12 md:right-12"
          style={{ backgroundColor: 'var(--border)' }}
        >
          <motion.div
            className="h-full origin-left"
            style={{
              backgroundColor: '#C9B99A',
              scaleX: scrollYProgress,
              boxShadow: '0 0 8px rgba(201,185,154,0.5)',
            }}
          />
        </div>

        {/* Track */}
        <motion.div
          ref={trackRef}
          className="flex gap-6 px-6 md:gap-8 md:px-12"
          style={{ x }}
        >
          {/* Opening spacer for first card to start at center-ish */}
          <div className="w-[10vw] flex-shrink-0" />

          {featured.map((project, i) => (
            <CarouselCard
              key={project.slug}
              project={project}
              index={i}
              scrollProgress={scrollYProgress}
              total={featured.length}
            />
          ))}

          {/* End spacer */}
          <div className="w-[30vw] flex-shrink-0 flex items-center justify-center">
            <div className="text-center">
              <p
                className="font-display mb-3"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                200+ More
              </p>
              <a
                href="#portfolio"
                className="font-body text-xs uppercase tracking-widest underline underline-offset-4 transition-opacity hover:opacity-50"
                style={{ color: 'var(--text-muted)' }}
              >
                View All Work ↓
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Individual carousel card with 3D perspective ──────────────────────────

function CarouselCard({
  project,
  index,
  scrollProgress,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -cy * 8, ry: cx * 8 });
  }, []);

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  // Per-card scale based on how centered it is
  const center = (index + 0.5) / total;
  const cardScale = useTransform(
    scrollProgress,
    [center - 0.15, center, center + 0.15],
    [0.92, 1, 0.92]
  );
  const cardRotateY = useTransform(
    scrollProgress,
    [center - 0.2, center, center + 0.2],
    [5, 0, -5]
  );

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex-shrink-0"
      style={{
        width: 'clamp(300px, 38vw, 520px)',
        perspective: '1000px',
        scale: cardScale,
        rotateY: cardRotateY,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-2xl"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: hovered ? 'transform 0.1s ease' : 'transform 0.4s ease',
        }}
        whileHover={{ y: -4 }}
      >
        {/* Thumbnail placeholder with gradient */}
        <div
          className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(28,28,28,0.03) 0%, rgba(201,185,154,0.08) 100%)`,
            border: '1px solid var(--border)',
            borderRadius: '1rem',
          }}
        >
          {/* Project initials as large display */}
          <span
            className="font-display select-none"
            style={{
              fontSize: 'clamp(3rem, 5vw, 5rem)',
              fontWeight: 700,
              color: 'rgba(28,28,28,0.06)',
              letterSpacing: '-0.03em',
            }}
          >
            {project.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
          </span>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              backgroundColor: 'rgba(28,28,28,0.85)',
              borderRadius: '1rem',
            }}
          >
            <div className="flex items-center gap-2 text-white">
              <span className="font-body text-xs uppercase tracking-widest">
                Visit Site
              </span>
              <ArrowUpRight size={14} />
            </div>
          </motion.div>

          {/* Shine effect on hover */}
          {hovered && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${(tilt.ry / 8 + 0.5) * 100}% ${(-tilt.rx / 8 + 0.5) * 100}%, rgba(201,185,154,0.15) 0%, transparent 50%)`,
                borderRadius: '1rem',
              }}
            />
          )}
        </div>

        {/* Info bar */}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3
              className="font-display text-lg font-bold"
              style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}
            >
              {project.name}
            </h3>
            <p
              className="font-body text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {project.tagline}
            </p>
          </div>
          <div className="flex gap-1 pt-1">
            {project.techStack.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="font-body rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}
