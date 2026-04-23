'use client';

import { motion } from 'framer-motion';

// ── CSS 3D Rotating Cube ─────────────────────────────────────────────────────
const faceStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '1px solid rgba(201,185,154,0.4)',
  backgroundColor: 'rgba(201,185,154,0.04)',
  backfaceVisibility: 'hidden',
};

export function RotatingCube({ size = 80 }: { size?: number }) {
  const half = size / 2;

  return (
    <div style={{ perspective: 600, width: size, height: size }}>
      <motion.div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        {/* Front */}
        <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
        {/* Back */}
        <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
        {/* Right */}
        <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        {/* Left */}
        <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        {/* Top */}
        <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
        {/* Bottom */}
        <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </motion.div>
    </div>
  );
}

// ── SVG Circuit Path Animation ───────────────────────────────────────────────
export function CircuitPaths() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <mask id="mask-1">
            <path
              d="M 50 250 h 200 q 10 0 10 -10 v -80 q 0 -10 10 -10 h 120"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </mask>
          <mask id="mask-2">
            <path
              d="M 750 250 h -200 q -10 0 -10 10 v 80 q 0 10 -10 10 h -120"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </mask>
          <mask id="mask-3">
            <path
              d="M 400 50 v 100 q 0 10 -10 10 h -80 q -10 0 -10 10 v 60"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </mask>
          <mask id="mask-4">
            <path
              d="M 400 450 v -100 q 0 -10 10 -10 h 80 q 10 0 10 -10 v -60"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </mask>
          <radialGradient id="dot-gold">
            <stop offset="0%" stopColor="#C9B99A" />
            <stop offset="100%" stopColor="#C9B99A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circuit paths */}
        <path d="M 50 250 h 200 q 10 0 10 -10 v -80 q 0 -10 10 -10 h 120"
          stroke="rgba(201,185,154,0.3)" strokeWidth="1" fill="none" />
        <path d="M 750 250 h -200 q -10 0 -10 10 v 80 q 0 10 -10 10 h -120"
          stroke="rgba(201,185,154,0.3)" strokeWidth="1" fill="none" />
        <path d="M 400 50 v 100 q 0 10 -10 10 h -80 q -10 0 -10 10 v 60"
          stroke="rgba(201,185,154,0.3)" strokeWidth="1" fill="none" />
        <path d="M 400 450 v -100 q 0 -10 10 -10 h 80 q 10 0 10 -10 v -60"
          stroke="rgba(201,185,154,0.3)" strokeWidth="1" fill="none" />

        {/* Center node */}
        <circle cx="400" cy="230" r="6" fill="rgba(201,185,154,0.6)" />
        <motion.circle
          cx="400" cy="230" r="16"
          fill="none" stroke="rgba(201,185,154,0.4)" strokeWidth="1"
          animate={{ r: [16, 36], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />

        {/* Animated dots on paths */}
        <g mask="url(#mask-1)">
          <motion.circle
            r="5"
            fill="url(#dot-gold)"
            style={{ offsetPath: "path('M 50 250 h 200 q 10 0 10 -10 v -80 q 0 -10 10 -10 h 120')" } as React.CSSProperties}
            animate={{ offsetDistance: ['0%', '100%'] } as Record<string, string[]>}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0 }}
          />
        </g>
        <g mask="url(#mask-2)">
          <motion.circle
            r="5"
            fill="url(#dot-gold)"
            style={{ offsetPath: "path('M 750 250 h -200 q -10 0 -10 10 v 80 q 0 10 -10 10 h -120')" } as React.CSSProperties}
            animate={{ offsetDistance: ['0%', '100%'] } as Record<string, string[]>}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1.5 }}
          />
        </g>
        <g mask="url(#mask-3)">
          <motion.circle
            r="5"
            fill="url(#dot-gold)"
            style={{ offsetPath: "path('M 400 50 v 100 q 0 10 -10 10 h -80 q -10 0 -10 10 v 60')" } as React.CSSProperties}
            animate={{ offsetDistance: ['0%', '100%'] } as Record<string, string[]>}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.8 }}
          />
        </g>
        <g mask="url(#mask-4)">
          <motion.circle
            r="5"
            fill="url(#dot-gold)"
            style={{ offsetPath: "path('M 400 450 v -100 q 0 -10 10 -10 h 80 q 10 0 10 -10 v -60')" } as React.CSSProperties}
            animate={{ offsetDistance: ['0%', '100%'] } as Record<string, string[]>}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 2.2 }}
          />
        </g>
      </svg>
    </div>
  );
}

// ── Orbiting Badge ────────────────────────────────────────────────────────────
export function OrbitBadge({
  label,
  radius = 80,
  duration = 12,
  startAngle = 0,
}: {
  label: string;
  radius?: number;
  duration?: number;
  startAngle?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{ rotate: startAngle }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider whitespace-nowrap"
          style={{
            backgroundColor: 'rgba(201,185,154,0.15)',
            border: '1px solid rgba(201,185,154,0.4)',
            color: '#C9B99A',
          }}
        >
          {label}
        </div>
      </motion.div>
    </div>
  );
}
