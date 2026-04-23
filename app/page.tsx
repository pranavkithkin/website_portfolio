'use client';

import { useState, lazy, Suspense } from 'react';
import Loader from '@/components/sections/loader';
import FullPageCanvas from '@/components/sections/full-page-canvas';
import Hero from '@/components/sections/hero';

// Lazy-load heavy sections — they won't block initial paint
const DeviceShowcase = lazy(() => import('@/components/sections/device-showcase'));
const Portfolio = lazy(() => import('@/components/sections/portfolio'));
const Services = lazy(() => import('@/components/sections/services'));
const Process = lazy(() => import('@/components/sections/process'));
const Contact = lazy(() => import('@/components/sections/contact'));
const Footer = lazy(() => import('@/components/layout/footer'));

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* ── FIXED 3D canvas background — entire page ── */}
          <FullPageCanvas />

          {/* ── All content floats above the canvas ── */}
          <main className="relative z-10">

            {/* ── Hero: editorial text overlay (loads immediately) ── */}
            <Hero />

            {/* ── Below-fold sections: code-split + content-visibility ── */}
            <Suspense fallback={null}>
              <div className="content-lazy">
                <DeviceShowcase />
              </div>

              <div className="content-lazy">
                <Portfolio />
              </div>

              <div className="content-lazy">
                <Services />
              </div>

              <div className="content-lazy">
                <Process />
              </div>

              <div className="content-lazy">
                <Contact />
              </div>
            </Suspense>
          </main>

          {/* ── Footer ── */}
          <Suspense fallback={null}>
            <footer className="relative z-10">
              <Footer />
            </footer>
          </Suspense>
        </>
      )}
    </>
  );
}
