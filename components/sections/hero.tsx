'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { getWhatsAppLink } from '@/lib/utils';
import { FlipStat } from '@/components/ui/flip-stat';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReducedMotion ? [1, 1] : [1, 0.92]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden"
      /* Transparent — the full-page canvas shows through */
    >
      {/* Top bar — agency info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex items-center justify-between px-6 pt-8 md:px-12"
      >
        <p
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: 'rgba(250,250,248,0.5)' }}
        >
          SynopsLabs AI — Dubai
        </p>
        <p
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: 'rgba(250,250,248,0.5)' }}
        >
          Est. 2019 · 200+ Projects
        </p>
      </motion.div>

      {/* MASSIVE HERO TEXT — floats over 3D canvas */}
      <motion.div
        style={{ scale, opacity }}
        className="pointer-events-none relative z-10 flex flex-1 flex-col justify-center px-4 md:px-10"
      >
        <div className="relative overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.0,
              ease: [0.22, 0.61, 0.36, 1],
              delay: prefersReducedMotion ? 0 : 0.15,
            }}
            className="font-display leading-[0.88] uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 15rem)',
              fontWeight: 700,
              color: '#FAFAF8',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 60px rgba(0,0,0,0.8)',
            }}
          >
            Web
          </motion.h1>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.0,
              ease: [0.22, 0.61, 0.36, 1],
              delay: prefersReducedMotion ? 0 : 0.28,
            }}
            className="font-display leading-[0.88] uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 15rem)',
              fontWeight: 700,
              color: '#FAFAF8',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 60px rgba(0,0,0,0.8)',
            }}
          >
            Development
          </motion.div>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 1.0,
              ease: [0.22, 0.61, 0.36, 1],
              delay: prefersReducedMotion ? 0 : 0.41,
            }}
            className="font-display leading-[0.88] uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 15rem)',
              fontWeight: 700,
              color: '#FAFAF8',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 60px rgba(0,0,0,0.8)',
            }}
          >
            Portfolio
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar — sub info + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 0.61, 0.36, 1],
          delay: prefersReducedMotion ? 0 : 0.7,
        }}
        className="relative z-20 flex flex-col gap-6 px-6 pb-14 md:flex-row md:items-end md:justify-between md:px-12"
      >
        {/* Left — description */}
        <p
          className="font-body max-w-xs text-sm leading-relaxed"
          style={{ color: 'rgba(250,250,248,0.6)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          200+ websites delivered across healthcare, education, e-commerce and
          corporate sectors in UAE, India &amp; KSA.
        </p>

        {/* Right — Flip Stats + CTAs */}
        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            <FlipStat value="200+" label="Websites" dark />
            <FlipStat value="3" label="Countries" dark />
            <FlipStat value="8" label="Industries" dark />
          </div>

          <div className="flex gap-3">
            <a
              href="#portfolio"
              className="rounded-full border px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-200 hover:bg-white/10"
              style={{
                borderColor: 'rgba(250,250,248,0.3)',
                color: '#FAFAF8',
              }}
            >
              View Work
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--wa-green)', color: '#fff' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex flex-col items-center gap-2" aria-hidden="true">
        <p style={{
          fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'rgba(201,185,154,0.55)', fontFamily: 'monospace',
        }}>
          Scroll
        </p>
        <div className="animate-bounce" style={{
          width: 1, height: 32, backgroundColor: 'rgba(201,185,154,0.4)',
        }} />
      </div>
    </section>
  );
}
