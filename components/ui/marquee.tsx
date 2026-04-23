'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  'Corporate Websites',
  'Healthcare Portals',
  'E-commerce Platforms',
  'Education Systems',
  'Creative Agencies',
  'Industrial Solutions',
  'Hospitality Platforms',
  'Food & Beverage',
  'UAE · India · KSA',
  '200+ Projects Delivered',
  '200+ Websites Built',
  '5+ Years Experience',
];

interface MarqueeProps {
  speed?: number; // seconds for one loop
  reversed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Marquee({
  speed = 28,
  reversed = false,
  className = '',
  style = {},
}: MarqueeProps) {
  const items = [...ITEMS, ...ITEMS]; // duplicate for seamless loop

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={style}
      aria-hidden="true"
    >
      <motion.div
        className="inline-flex gap-0"
        animate={{ x: reversed ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center font-body text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="px-6">{item}</span>
            <span style={{ color: 'var(--accent-warm)', opacity: 0.6 }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
