'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Full-page 3D background — canvas-based frame painting.
 * 
 * Preloads JPG frame sequences and paints them to a fixed canvas on scroll.
 * Canvas drawImage is instant (no decode lag like video.currentTime).
 * 
 * Hero: 96 frames — golden wireframe zoom-in (first half of scroll)
 * Tunnel: 96 frames — tunnel fly-through (second half of scroll)
 */

const HERO_COUNT = 96;
const TUNNEL_COUNT = 96;

function heroPath(i: number) {
  return `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;
}
function tunnelPath(i: number) {
  return `/tunnel-frames/frame-${String(i + 1).padStart(4, '0')}.jpg`;
}

export default function FullPageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroFrames = useRef<HTMLImageElement[]>([]);
  const tunnelFrames = useRef<HTMLImageElement[]>([]);
  const scrollY = useRef(0);
  const docHeight = useRef(1);
  const rafId = useRef(0);
  const lastFrame = useRef(-1);

  // Loading overlay refs
  const loadOverlay = useRef<HTMLDivElement>(null);
  const loadBar = useRef<HTMLDivElement>(null);
  const loadPct = useRef<HTMLSpanElement>(null);

  // ── Paint a frame to canvas ───────────────────────────────────────────────
  const paint = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover fit
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // ── Resize canvas to viewport ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Preload frames with progressive loading ──────────────────────────────
  useEffect(() => {
    const totalFrames = HERO_COUNT + TUNNEL_COUNT;
    let loaded = 0;

    // Load key frames first (every 8th), then fill in the rest
    const keyIndices: number[] = [];
    const fillIndices: number[] = [];
    for (let i = 0; i < HERO_COUNT; i++) {
      if (i % 8 === 0) keyIndices.push(i);
      else fillIndices.push(i);
    }
    const keyTunnelIndices: number[] = [];
    const fillTunnelIndices: number[] = [];
    for (let i = 0; i < TUNNEL_COUNT; i++) {
      if (i % 8 === 0) keyTunnelIndices.push(i);
      else fillTunnelIndices.push(i);
    }

    const keyFrameCount = keyIndices.length + keyTunnelIndices.length;

    function onLoad() {
      loaded++;
      const pct = Math.round((loaded / totalFrames) * 100);
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

    function loadFrame(src: string, arr: HTMLImageElement[], idx: number) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = onLoad;
      img.onerror = onLoad; // count errors too
      img.src = src;
      arr[idx] = img;
    }

    // Init arrays
    heroFrames.current = new Array(HERO_COUNT);
    tunnelFrames.current = new Array(TUNNEL_COUNT);

    // Load key frames first
    keyIndices.forEach((i) => loadFrame(heroPath(i), heroFrames.current, i));
    keyTunnelIndices.forEach((i) => loadFrame(tunnelPath(i), tunnelFrames.current, i));

    // Load fill frames after a short delay
    setTimeout(() => {
      fillIndices.forEach((i) => loadFrame(heroPath(i), heroFrames.current, i));
      fillTunnelIndices.forEach((i) => loadFrame(tunnelPath(i), tunnelFrames.current, i));
    }, 300);

    // Safety timeout
    const timeout = setTimeout(() => {
      if (loadOverlay.current && loadOverlay.current.style.display !== 'none') {
        loadOverlay.current.style.pointerEvents = 'none';
        loadOverlay.current.style.opacity = '0';
        setTimeout(() => {
          if (loadOverlay.current) loadOverlay.current.style.display = 'none';
        }, 800);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  // ── Scroll-driven frame painting ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
      docHeight.current = document.documentElement.scrollHeight - window.innerHeight;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const loop = () => {
      const progress = docHeight.current > 0
        ? Math.min(1, Math.max(0, scrollY.current / docHeight.current))
        : 0;

      let frameIndex: number;
      let img: HTMLImageElement | undefined;

      if (progress < 0.5) {
        // Hero phase
        const heroProgress = progress / 0.5;
        frameIndex = Math.min(HERO_COUNT - 1, Math.floor(heroProgress * HERO_COUNT));
        img = heroFrames.current[frameIndex];
      } else {
        // Tunnel phase
        const tunnelProgress = (progress - 0.5) / 0.5;
        frameIndex = Math.min(TUNNEL_COUNT - 1, Math.floor(tunnelProgress * TUNNEL_COUNT));
        img = tunnelFrames.current[frameIndex];
        frameIndex += HERO_COUNT; // unique key
      }

      if (frameIndex !== lastFrame.current && img?.complete && img.naturalWidth) {
        lastFrame.current = frameIndex;
        paint(img);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [paint]);

  return (
    <>
      {/* Fixed canvas — GPU composited */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundColor: '#0a0a0a',
          willChange: 'transform',
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
