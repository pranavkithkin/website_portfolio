'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ambient background video — ultra-subtle golden particles.
 * Falls back to pure CSS animated dots if video isn't available.
 * Sits behind the entire page at very low opacity.
 */
export default function AmbientBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    // Check if ambient video exists
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setHasVideo(false);
    video.addEventListener('error', handleError);
    return () => video.removeEventListener('error', handleError);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{ mixBlendMode: 'screen' }}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/ambient-bg.mp4"
          className="h-full w-full object-cover"
          style={{ opacity: 0.04 }}
        />
      ) : (
        /* CSS fallback — subtle animated gradient */
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle at 30% 40%, rgba(201,185,154,0.03) 0%, transparent 50%), ' +
              'radial-gradient(circle at 70% 60%, rgba(201,185,154,0.02) 0%, transparent 50%)',
            animation: 'ambientPulse 12s ease-in-out infinite alternate',
          }}
        />
      )}

      <style jsx>{`
        @keyframes ambientPulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
