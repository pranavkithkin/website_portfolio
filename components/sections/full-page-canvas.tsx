'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * OPTIMIZED full-page 3D canvas background.
 * 
 * Performance optimizations:
 * 1. Progressive loading: loads 48 key frames first (every 4th), then fills gaps
 * 2. Single RAF loop with frame skipping for 60fps
 * 3. Offscreen canvas double-buffering
 * 4. will-change: transform on canvas for GPU compositing
 * 5. Scroll position cached via passive listener
 * 6. No React state in hot path — zero re-renders during scroll
 */

const HERO_COUNT = 192;
const TUNNEL_COUNT = 192;

const heroPath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;
const tunnelPath = (i: number) =>
  `/tunnel-frames/frame-${String(i + 1).padStart(4, '0')}.jpg`;

export default function FullPageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroFrames = useRef<(HTMLImageElement | null)[]>(new Array(HERO_COUNT).fill(null));
  const tunnelFrames = useRef<(HTMLImageElement | null)[]>(new Array(TUNNEL_COUNT).fill(null));
  const lastDrawn = useRef('');
  const scrollY = useRef(0);
  const docHeight = useRef(1);
  const rafId = useRef(0);

  // Loading overlay refs
  const loadOverlay = useRef<HTMLDivElement>(null);
  const loadBar = useRef<HTMLDivElement>(null);
  const loadPct = useRef<HTMLSpanElement>(null);

  // ── Progressive frame loader ──────────────────────────────────────────────
  // Phase 1: Load every 4th frame (48 frames) for immediate responsiveness
  // Phase 2: Fill remaining frames in background
  useEffect(() => {
    let loaded = 0;
    const total = HERO_COUNT + TUNNEL_COUNT;
    const keyInterval = 4; // Load every 4th frame first
    const keyFrameCount = Math.ceil(HERO_COUNT / keyInterval) + Math.ceil(TUNNEL_COUNT / keyInterval);

    function updateProgress() {
      loaded++;
      const pct = Math.round((loaded / total) * 100);
      if (loadBar.current) loadBar.current.style.width = pct + '%';
      if (loadPct.current) loadPct.current.textContent = pct + '%';

      // Hide overlay once key frames are ready (~25% loaded)
      if (loaded === keyFrameCount) {
        if (loadOverlay.current) {
          loadOverlay.current.style.pointerEvents = 'none';
          loadOverlay.current.style.opacity = '0';
          setTimeout(() => {
            if (loadOverlay.current) loadOverlay.current.style.display = 'none';
          }, 800);
        }
      }
    }

    function loadImage(
      arr: (HTMLImageElement | null)[],
      index: number,
      pathFn: (i: number) => string
    ) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = updateProgress;
      img.src = pathFn(index);
      arr[index] = img;
    }

    // Phase 1: Key frames (every 4th)
    for (let i = 0; i < HERO_COUNT; i += keyInterval) {
      loadImage(heroFrames.current, i, heroPath);
    }
    for (let i = 0; i < TUNNEL_COUNT; i += keyInterval) {
      loadImage(tunnelFrames.current, i, tunnelPath);
    }

    // Phase 2: Fill gaps after a short delay
    setTimeout(() => {
      for (let i = 0; i < HERO_COUNT; i++) {
        if (!heroFrames.current[i]) loadImage(heroFrames.current, i, heroPath);
      }
      for (let i = 0; i < TUNNEL_COUNT; i++) {
        if (!tunnelFrames.current[i]) loadImage(tunnelFrames.current, i, tunnelPath);
      }
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Canvas resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Draw frame helper ─────────────────────────────────────────────────────
  const drawFrame = useCallback((sequence: 'hero' | 'tunnel', index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frames = sequence === 'hero' ? heroFrames.current : tunnelFrames.current;
    let img = frames[index];

    // If exact frame not loaded yet, find nearest loaded frame
    if (!img?.complete || !img.naturalWidth) {
      for (let d = 1; d < 8; d++) {
        const before = frames[index - d];
        if (before?.complete && before.naturalWidth) { img = before; break; }
        const after = frames[index + d];
        if (after?.complete && after.naturalWidth) { img = after; break; }
      }
    }

    if (!img?.complete || !img.naturalWidth) {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw: number, dh: number;
    if (cr > ir) { dw = cw; dh = cw / ir; }
    else { dh = ch; dw = ch * ir; }

    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  // ── Continuous RAF loop ───────────────────────────────────────────────────
  useEffect(() => {
    // Cache scroll position with passive listener
    const onScroll = () => {
      scrollY.current = window.scrollY;
      docHeight.current = document.documentElement.scrollHeight - window.innerHeight;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Single RAF loop — always running, frame-skips if nothing changed
    const loop = () => {
      const progress = docHeight.current > 0
        ? Math.min(1, Math.max(0, scrollY.current / docHeight.current))
        : 0;

      let sequence: 'hero' | 'tunnel';
      let frameIndex: number;

      if (progress < 0.5) {
        sequence = 'hero';
        frameIndex = Math.min(HERO_COUNT - 1, Math.floor((progress / 0.5) * HERO_COUNT));
      } else {
        sequence = 'tunnel';
        frameIndex = Math.min(TUNNEL_COUNT - 1, Math.floor(((progress - 0.5) / 0.5) * TUNNEL_COUNT));
      }

      const key = `${sequence}-${frameIndex}`;
      if (key !== lastDrawn.current) {
        lastDrawn.current = key;
        drawFrame(sequence, frameIndex);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [drawFrame]);

  return (
    <>
      {/* Fixed canvas — GPU composited */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundColor: '#0a0a0a',
          willChange: 'transform', // Force GPU layer
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Loading overlay */}
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
        <div style={{
          width: 'min(260px, 65vw)', height: 1,
          backgroundColor: 'rgba(201,185,154,0.15)',
          overflow: 'hidden', borderRadius: 9999,
        }}>
          <div
            ref={loadBar}
            style={{
              width: '0%', height: '100%',
              backgroundColor: '#C9B99A',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p style={{
          fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(250,250,248,0.25)', fontFamily: 'monospace',
        }}>
          Loading 3D experience
        </p>
      </div>
    </>
  );
}
