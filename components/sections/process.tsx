'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Search, Palette, Code2, Rocket } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We start by understanding your business, goals, audience, and competitive landscape.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design',
    description:
      'Wireframes and high-fidelity mockups crafted in your brand identity — reviewed until perfect.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build',
    description:
      'Clean, fast code delivered using modern frameworks with CMS integration and mobile-first approach.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description:
      'Thorough QA, performance optimisation, and a smooth handoff with training and post-launch support.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Drive SVG path draw with scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.9'],
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding"
      style={{
        backgroundColor: 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
    >
      <div className="container-main">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-body mb-3 text-xs uppercase tracking-widest"
            style={{ color: 'var(--accent-warm)' }}
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-section"
            style={{ color: 'var(--foreground)' }}
          >
            How We Work
          </motion.h2>
        </div>

        {/* Timeline with SVG path */}
        <div className="relative">
          {/* ── SVG connecting path (desktop) ── */}
          <div className="absolute top-[38px] left-0 right-0 hidden lg:block" aria-hidden="true">
            <svg
              viewBox="0 0 1200 6"
              fill="none"
              className="w-full"
              preserveAspectRatio="none"
              style={{ height: 6, overflow: 'visible' }}
            >
              {/* Background track */}
              <line
                x1="40" y1="3" x2="1160" y2="3"
                stroke="var(--border)"
                strokeWidth="1"
              />
              {/* Animated golden line */}
              <motion.line
                x1="40" y1="3" x2="1160" y2="3"
                stroke="#C9B99A"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  filter: 'drop-shadow(0 0 6px rgba(201,185,154,0.5))',
                }}
              />
              {/* Glowing dot at the tip */}
              <motion.circle
                r="4"
                fill="#C9B99A"
                style={{
                  cx: useTransform(scrollYProgress, [0, 1], [40, 1160]),
                  cy: 3,
                  filter: 'drop-shadow(0 0 8px rgba(201,185,154,0.8))',
                  opacity: useTransform(scrollYProgress, [0, 0.02], [0, 1]),
                }}
              />
            </svg>
          </div>

          {/* ── SVG vertical path (mobile) ── */}
          <div className="absolute left-[23px] top-0 bottom-0 lg:hidden" aria-hidden="true">
            <svg
              viewBox="0 0 6 600"
              fill="none"
              className="h-full"
              preserveAspectRatio="none"
              style={{ width: 6, overflow: 'visible' }}
            >
              <line
                x1="3" y1="30" x2="3" y2="570"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <motion.line
                x1="3" y1="30" x2="3" y2="570"
                stroke="#C9B99A"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  filter: 'drop-shadow(0 0 6px rgba(201,185,154,0.5))',
                }}
              />
            </svg>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Each step "lights up" at 25% intervals
  const threshold = index / 4;
  const nodeScale = useTransform(
    scrollProgress,
    [threshold, threshold + 0.1],
    [1, 1.15]
  );
  const nodeGlow = useTransform(
    scrollProgress,
    [threshold, threshold + 0.1],
    [0, 1]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.22, 0.61, 0.36, 1],
        delay: index * 0.12,
      }}
      className="relative flex flex-col items-start lg:items-center lg:text-center"
    >
      {/* Numbered circle — scales + glows when line reaches it */}
      <motion.div
        className="relative z-10 mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          scale: nodeScale,
          boxShadow: useTransform(
            nodeGlow,
            [0, 1],
            ['0 2px 8px rgba(28,28,28,0.06)', '0 0 20px rgba(201,185,154,0.4), 0 2px 8px rgba(28,28,28,0.06)']
          ),
        }}
      >
        <Icon size={18} style={{ color: 'var(--accent)' }} />
      </motion.div>

      {/* Step number */}
      <motion.p
        className="font-body mb-2 text-xs font-medium uppercase tracking-widest"
        style={{
          color: useTransform(
            nodeGlow,
            [0, 1],
            ['var(--accent-warm)', '#C9B99A']
          ),
        }}
      >
        {step.number}
      </motion.p>

      {/* Title */}
      <h3
        className="font-display mb-2 text-xl font-semibold"
        style={{ color: 'var(--foreground)' }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        {step.description}
      </p>
    </motion.div>
  );
}
