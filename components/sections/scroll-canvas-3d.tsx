'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 192;
const FRAME_PATHS = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`
);

// Easing
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic  = (t: number) => t * t * t;
const clamp01      = (v: number) => Math.min(1, Math.max(0, v));

// ── Annotation config ──────────────────────────────────────────────────────
// First 20% of scroll = pure 3D animation, no text.
// Cards spread evenly across 20%–98%.
const ANNOTATIONS = [
  {
    id: 0,
    enter: 0.20,  peak: 0.28,  fade: 0.37,  exit: 0.44,
    direction: 1 as const,  // right → center → left
    align: 'left' as const,
    eyebrow: '01 — Portfolio',
    headline: '200+\nWebsites\nDelivered',
    sub: 'UAE · India · KSA',
  },
  {
    id: 1,
    enter: 0.50,  peak: 0.58,  fade: 0.67,  exit: 0.74,
    direction: -1 as const, // left → center → right
    align: 'right' as const,
    eyebrow: '02 — Quality',
    headline: 'Pixel-Perfect\nBuild',
    sub: 'Every project coded to 95+ Lighthouse score',
  },
  {
    id: 2,
    enter: 0.80,  peak: 0.87,  fade: 0.93,  exit: 0.98,
    direction: 1 as const,  // right → center → left
    align: 'left' as const,
    eyebrow: '03 — Speed',
    headline: 'Launch-Ready\nin 14 Days',
    sub: 'Discovery → Design → Dev → Deploy',
  },
];

export default function ScrollCanvas3D() {
  const sectionRef    = useRef<HTMLElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const framesRef     = useRef<HTMLImageElement[]>([]);
  const tickingRef    = useRef(false);
  const currentFrame  = useRef(0);

  // Direct DOM refs — never touch React state in the RAF hot path
  const annRefs      = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const loadOverlay  = useRef<HTMLDivElement>(null);
  const loadBar      = useRef<HTMLDivElement>(null);
  const loadPct      = useRef<HTMLSpanElement>(null);

  // ── Preload all 192 frames ────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

    FRAME_PATHS.forEach((src, i) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done++;
        const pct = Math.round((done / FRAME_COUNT) * 100);
        if (loadBar.current)  loadBar.current.style.width  = pct + '%';
        if (loadPct.current)  loadPct.current.textContent  = pct + '%';
        if (done === FRAME_COUNT) {
          drawFrame(0);
          if (loadOverlay.current) {
            loadOverlay.current.style.opacity = '0';
            loadOverlay.current.style.pointerEvents = 'none';
          }
        }
      };
      img.src = src;
      imgs[i] = img;
    });
    framesRef.current = imgs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── DPR-aware canvas resize ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      drawFrame(currentFrame.current);
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();
    return () => window.removeEventListener('resize', resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll → RAF → canvas + annotation transforms ─────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const p = getProgress();

        // 1. Pick video frame
        const fi = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
        if (fi !== currentFrame.current) {
          currentFrame.current = fi;
          drawFrame(fi);
        }

        // 2. Drive each annotation's 3D transform
        ANNOTATIONS.forEach((ann, i) => {
          const el = annRefs.current[i];
          if (!el) return;

          const vw = window.innerWidth;
          let opacity = 0;
          let tx = ann.direction * vw * 0.65; // far off-screen in entry direction
          let scale = 0.25;
          let ry = ann.direction * -28;        // rotateY matching the side

          if (p >= ann.enter && p < ann.exit) {
            if (p < ann.peak) {
              // ── ENTER: flying in from the side ──────────────────────────
              const t = easeOutCubic(clamp01((p - ann.enter) / (ann.peak - ann.enter)));
              opacity = t;
              // translateX: from far side → 0
              tx    = ann.direction * vw * 0.65 * (1 - t);
              // scale: 0.25 → 1 (depth illusion)
              scale = 0.25 + 0.75 * t;
              // rotateY: flattens as it arrives
              ry    = ann.direction * -28 * (1 - t);

            } else if (p < ann.fade) {
              // ── HOLD: fully visible at center ───────────────────────────
              opacity = 1;
              tx      = 0;
              scale   = 1;
              ry      = 0;

            } else {
              // ── EXIT: flying out to the opposite side ───────────────────
              const t = easeInCubic(clamp01((p - ann.fade) / (ann.exit - ann.fade)));
              opacity = 1 - t;
              // Exit in OPPOSITE direction to entry
              tx    = -ann.direction * vw * 0.65 * t;
              scale = 1 - 0.75 * t;
              ry    = -ann.direction * 28 * t;
            }
          }

          el.style.opacity   = String(opacity);
          el.style.transform =
            `translateX(${tx}px) scale(${scale}) rotateY(${ry}deg)`;
        });

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function getProgress(): number {
    const s = sectionRef.current;
    if (!s) return 0;
    const rect = s.getBoundingClientRect();
    const scrollable = s.offsetHeight - window.innerHeight;
    return Math.min(1, Math.max(0, -rect.top / scrollable));
  }

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img?.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const isMobile = window.innerWidth < 768;
    const zoom = isMobile ? 1.3 : 1;

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (cr > ir) { dw = cw * zoom; dh = (cw / ir) * zoom; }
    else         { dh = ch * zoom; dw = ch * ir   * zoom; }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  return (
    <section
      ref={sectionRef}
      className="scroll-animation relative"
      aria-label="3D scroll animation"
    >
      {/* ── Loading overlay ── */}
      <div
        ref={loadOverlay}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8"
        style={{ backgroundColor: '#0a0a0a', transition: 'opacity 0.8s ease' }}
      >
        <span
          ref={loadPct}
          className="font-display tabular-nums"
          style={{
            fontSize: 'clamp(5rem, 18vw, 13rem)',
            fontWeight: 700,
            color: '#FAFAF8',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          0%
        </span>
        <div
          style={{
            width: 'min(260px, 65vw)', height: 1,
            backgroundColor: 'rgba(201,185,154,0.15)',
            overflow: 'hidden', borderRadius: 9999,
          }}
        >
          <div
            ref={loadBar}
            style={{
              width: '0%', height: '100%',
              backgroundColor: '#C9B99A',
              transition: 'width 0.15s linear',
            }}
          />
        </div>
        <p style={{
          fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(250,250,248,0.25)', fontFamily: 'monospace',
        }}>
          Loading 3D scene
        </p>
      </div>

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ backgroundColor: '#0a0a0a' }}
        />

        {/* Gradient — darkens edges so text is always readable */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: [
            'linear-gradient(to bottom,',
            '  rgba(0,0,0,0.4) 0%,',
            '  transparent 20%,',
            '  transparent 60%,',
            '  rgba(0,0,0,0.55) 100%)',
          ].join(''),
        }} />

        {/* ── 3D Annotation text — perspective container ── */}
        {/*
          perspective: 1200px on the container ensures rotateY looks 3D.
          Each card starts off-screen in its direction, scales up from 0.25→1,
          then exits the opposite direction. All via direct DOM refs — zero React re-renders.
        */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 60%' }}
        >
          {ANNOTATIONS.map((ann, i) => (
            <div
              key={ann.id}
              ref={el => { annRefs.current[i] = el; }}
              className="absolute bottom-[12%] left-0 right-0"
              style={{
                opacity: 0,
                transform: `translateX(${ann.direction * window?.innerWidth * 0.65 || 600}px) scale(0.25) rotateY(${ann.direction * -28}deg)`,
                willChange: 'opacity, transform',
                transformOrigin: 'center center',
                // Align text block left or right within the row
                display: 'flex',
                justifyContent: ann.align === 'left' ? 'flex-start' : 'flex-end',
                padding: '0 clamp(2rem, 8vw, 9rem)',
              }}
            >
              <div style={{ textAlign: ann.align === 'left' ? 'left' : 'right', maxWidth: '80vw' }}>

                {/* Eyebrow */}
                <p style={{
                  fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#C9B99A',
                  marginBottom: '1rem',
                  fontFamily: 'monospace',
                  textShadow: '0 0 30px rgba(0,0,0,1)',
                }}>
                  {ann.eyebrow}
                </p>

                {/* Headline — massive */}
                <h2 style={{
                  fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
                  fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: '#FAFAF8',
                  whiteSpace: 'pre-line',
                  textShadow: '0 4px 60px rgba(0,0,0,0.95), 0 0 100px rgba(0,0,0,0.6)',
                  margin: 0,
                }}>
                  {ann.headline}
                </h2>

                {/* Gold rule */}
                <div style={{
                  width: 56, height: 1,
                  backgroundColor: '#C9B99A',
                  margin: ann.align === 'right' ? '1.5rem 0 1.5rem auto' : '1.5rem auto 1.5rem 0',
                  boxShadow: '0 0 16px rgba(201,185,154,0.7)',
                }} />

                {/* Sub */}
                <p style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  color: 'rgba(250,250,248,0.72)',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 30px rgba(0,0,0,0.95)',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {ann.sub}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-7 left-0 right-0 flex flex-col items-center gap-2" aria-hidden="true">
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

      </div>
    </section>
  );
}
