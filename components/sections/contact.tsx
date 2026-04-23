'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const REGIONS = [
  { flag: '🇦🇪', name: 'UAE', active: true },
  { flag: '🇮🇳', name: 'India', active: true },
  { flag: '🇸🇦', name: 'KSA', active: true },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Subtle gradient vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,185,154,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10" ref={ref}>
        {/* Center orb */}
        <div className="relative mx-auto mb-16 flex h-40 w-40 items-center justify-center md:mb-20">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-28 w-28 items-center justify-center rounded-full"
            style={{
              background:
                'radial-gradient(circle at 40% 35%, rgba(201,185,154,0.25), rgba(201,185,154,0.06))',
              border: '1px solid rgba(201,185,154,0.3)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <MessageCircle size={32} style={{ color: '#C9B99A' }} strokeWidth={1.2} />
          </motion.div>

          {/* Pulsing ring */}
          <motion.div
            className="absolute rounded-full border"
            style={{ borderColor: 'rgba(201,185,154,0.15)' }}
            animate={{ width: [112, 160], height: [112, 160], opacity: [0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center"
        >
          <h2
            className="font-display mb-4 uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#FAFAF8',
              lineHeight: 0.9,
            }}
          >
            Let&apos;s Build<br />Something
          </h2>
          <p
            className="font-body mx-auto mb-10 max-w-sm text-sm leading-relaxed"
            style={{ color: 'rgba(250,250,248,0.5)' }}
          >
            Drop a WhatsApp message and we&apos;ll get back to you within 2 hours
            during UAE business hours.
          </p>

          {/* Region flags */}
          <div className="mb-10 flex justify-center gap-3">
            {REGIONS.map(({ flag, name }) => (
              <span
                key={name}
                className="font-body inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                style={{
                  backgroundColor: 'rgba(201,185,154,0.1)',
                  border: '1px solid rgba(201,185,154,0.25)',
                  color: 'rgba(250,250,248,0.65)',
                }}
              >
                {flag} {name}
              </span>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
            <span
              className="font-body text-xs font-normal opacity-75"
              style={{ letterSpacing: '0.05em' }}
            >
              +971 56 627 2141
            </span>
          </a>

          {/* Response time */}
          <p
            className="font-body mt-4 text-xs"
            style={{ color: 'rgba(250,250,248,0.3)' }}
          >
            Avg. response time: &lt; 2 hours · Sun–Thu 9 AM – 7 PM GST
          </p>
        </motion.div>
      </div>
    </section>
  );
}
