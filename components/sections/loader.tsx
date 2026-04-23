'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LOADING_LINES = [
  'Fetching project data...  0_0',
  'Loading 200+ websites...   >/<',
  'Building portfolio...    +_+',
  'Crafting pixel UI...     </>',
  'All systems ready...     ^_^',
];

const SKIP_KEY = 'synopslabs_loader_v2';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hasSeenLoader = localStorage.getItem(SKIP_KEY);
    if (hasSeenLoader) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          localStorage.setItem(SKIP_KEY, '1');
          onComplete();
        },
      });

      // Fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'none' }
      );

      // Lines stagger in
      LOADING_LINES.forEach((_, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
          i === 0 ? '+=0.1' : '+=0.28'
        );
      });

      // Progress 0 → 100
      const obj = { value: 0 };
      tl.to(
        obj,
        {
          value: 100,
          duration: 2.2,
          ease: 'power1.inOut',
          onUpdate: () => {
            if (progressRef.current) {
              progressRef.current.textContent = `${Math.round(obj.value)}%`;
            }
          },
        },
        0.2
      );

      // Slide UP exit
      tl.to(
        overlayRef.current,
        {
          y: '-100%',
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.pointerEvents = 'none';
              overlayRef.current.style.display = 'none';
            }
          },
        },
        '+=0.35'
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#111111', opacity: 0 }}
      aria-hidden="true"
    >
      {/* Big progress number */}
      <span
        ref={progressRef}
        className="font-display mb-10 tabular-nums"
        style={{
          fontSize: 'clamp(5rem, 18vw, 14rem)',
          fontWeight: 700,
          color: '#FAFAF8',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        0%
      </span>

      {/* Loading lines — monospace, small */}
      <div className="flex flex-col items-center gap-1.5">
        {LOADING_LINES.map((line, i) => (
          <p
            key={line}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="text-center text-xs tracking-widest uppercase"
            style={{
              fontFamily: 'monospace',
              color: 'rgba(250,250,248,0.4)',
              opacity: 0,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Skip */}
      <button
        onClick={() => {
          gsap.to(overlayRef.current, {
            y: '-100%',
            duration: 0.55,
            ease: 'power4.inOut',
            onComplete: () => {
              if (overlayRef.current) {
                overlayRef.current.style.pointerEvents = 'none';
                overlayRef.current.style.display = 'none';
              }
              localStorage.setItem(SKIP_KEY, '1');
              onComplete();
            },
          });
        }}
        className="absolute bottom-8 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
        style={{ color: 'rgba(250,250,248,0.25)', fontFamily: 'monospace' }}
      >
        skip →
      </button>
    </div>
  );
}
