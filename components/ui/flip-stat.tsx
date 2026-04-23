'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface FlipStatProps {
  value: string;   // e.g. "200+"
  label: string;
  dark?: boolean;
}

export function FlipStat({ value, label, dark }: FlipStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse number part (e.g. "200" from "200+")
    const numericPart = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/\d/g, ''); // "+"
    if (isNaN(numericPart)) { setDisplayed(value); return; }

    const duration = 1800; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * numericPart);
      setDisplayed(current + suffix);

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <motion.span
        className="font-display text-2xl font-bold leading-none"
        style={{
          color: dark ? '#FAFAF8' : 'var(--foreground)',
          perspective: '400px',
        }}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
      >
        {displayed}
      </motion.span>
      <span
        className="font-body text-[10px] uppercase tracking-widest"
        style={{ color: dark ? 'rgba(250,250,248,0.5)' : 'var(--text-muted)' }}
      >
        {label}
      </span>
    </div>
  );
}
