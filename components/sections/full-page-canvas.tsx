'use client';

import { useEffect, useRef } from 'react';

/**
 * Full-page 3D background — scroll-driven video scrubbing.
 * 
 * Uses 2 high-quality MP4 videos (1920p, CRF 23) with scroll-driven currentTime.
 * Videos preload="auto" ensures they buffer fully for smooth random seeking.
 * Cache-Control: immutable headers in next.config.ts ensure CDN edge caching.
 */

export default function FullPageCanvas() {
  const heroRef = useRef<HTMLVideoElement>(null);
  const tunnelRef = useRef<HTMLVideoElement>(null);
  const scrollY = useRef(0);
  const docHeight = useRef(1);
  const rafId = useRef(0);
  const ready = useRef({ hero: false, tunnel: false });

  // Loading overlay refs
  const loadOverlay = useRef<HTMLDivElement>(null);
  const loadBar = useRef<HTMLDivElement>(null);
  const loadPct = useRef<HTMLSpanElement>(null);

  // ── Track video readiness & show loading ──────────────────────────────────
  useEffect(() => {
    const updateProgress = () => {
      const pct = (ready.current.hero ? 50 : 0) + (ready.current.tunnel ? 50 : 0);
      if (loadBar.current) loadBar.current.style.width = pct + '%';
      if (loadPct.current) loadPct.current.textContent = pct + '%';

      if (ready.current.hero && ready.current.tunnel) {
        if (loadOverlay.current) {
          loadOverlay.current.style.pointerEvents = 'none';
          loadOverlay.current.style.opacity = '0';
          setTimeout(() => {
            if (loadOverlay.current) loadOverlay.current.style.display = 'none';
          }, 800);
        }
      }
    };

    const hero = heroRef.current;
    const tunnel = tunnelRef.current;

    if (hero) {
      const onReady = () => { ready.current.hero = true; updateProgress(); };
      hero.addEventListener('canplaythrough', onReady, { once: true });
      // Also listen for 'loadeddata' as fallback (some browsers fire this first)
      hero.addEventListener('loadeddata', onReady, { once: true });
      if (hero.readyState >= 3) onReady();
      hero.load();
    }

    if (tunnel) {
      const onReady = () => { ready.current.tunnel = true; updateProgress(); };
      tunnel.addEventListener('canplaythrough', onReady, { once: true });
      tunnel.addEventListener('loadeddata', onReady, { once: true });
      if (tunnel.readyState >= 3) onReady();
      tunnel.load();
    }

    // Safety timeout — show content after 6s regardless
    const timeout = setTimeout(() => {
      ready.current.hero = true;
      ready.current.tunnel = true;
      updateProgress();
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  // ── Scroll-driven video scrubbing ─────────────────────────────────────────
  useEffect(() => {
    const hero = heroRef.current;
    const tunnel = tunnelRef.current;
    if (!hero || !tunnel) return;

    const onScroll = () => {
      scrollY.current = window.scrollY;
      docHeight.current = document.documentElement.scrollHeight - window.innerHeight;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    let lastKey = '';

    const loop = () => {
      const progress = docHeight.current > 0
        ? Math.min(1, Math.max(0, scrollY.current / docHeight.current))
        : 0;

      if (progress < 0.5) {
        const heroProgress = progress / 0.5;
        const key = `h-${Math.round(heroProgress * 1000)}`;
        if (key !== lastKey) {
          lastKey = key;
          hero.style.opacity = '1';
          tunnel.style.opacity = '0';
          if (hero.duration && ready.current.hero) {
            hero.currentTime = heroProgress * hero.duration;
          }
        }
      } else {
        const tunnelProgress = (progress - 0.5) / 0.5;
        const key = `t-${Math.round(tunnelProgress * 1000)}`;
        if (key !== lastKey) {
          lastKey = key;
          hero.style.opacity = '0';
          tunnel.style.opacity = '1';
          if (tunnel.duration && ready.current.tunnel) {
            tunnel.currentTime = tunnelProgress * tunnel.duration;
          }
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      {/* Hero background video — scroll-driven, full quality 1920p */}
      <video
        ref={heroRef}
        src="/hero-bg.mp4"
        muted
        playsInline
        preload="auto"
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover"
        style={{ backgroundColor: '#0a0a0a' }}
      />

      {/* Tunnel background video — scroll-driven, full quality 1920p */}
      <video
        ref={tunnelRef}
        src="/tunnel-bg.mp4"
        muted
        playsInline
        preload="auto"
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen object-cover"
        style={{ backgroundColor: '#0a0a0a', opacity: 0 }}
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
              transition: 'width 0.3s linear',
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
