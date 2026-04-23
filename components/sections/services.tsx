'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { getWhatsAppLink } from '@/lib/utils';

const SERVICES = [
  {
    number: '01',
    title: 'Business Websites',
    description:
      'Corporate and brochure sites that establish credibility, rank on search, and convert visitors into leads.',
    tags: ['WordPress', 'Next.js', 'React'],
  },
  {
    number: '02',
    title: 'E-commerce Platforms',
    description:
      'Scalable online stores with inventory management, payment gateways, and seamless mobile checkout.',
    tags: ['Shopify', 'WooCommerce', 'Custom'],
  },
  {
    number: '03',
    title: 'Educational Platforms',
    description:
      'Learning portals, student management systems, and course delivery platforms built for scale.',
    tags: ['LMS', 'Supabase', 'Firebase'],
  },
  {
    number: '04',
    title: 'Corporate Portals',
    description:
      'Multi-language enterprise portals for UAE, India and KSA operations with CMS integration.',
    tags: ['Next.js', 'i18n', 'Strapi'],
  },
];

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      style={{
        backgroundColor: 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
      }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        className="flex items-end justify-between px-6 py-12 md:px-12"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--foreground)',
            lineHeight: 0.9,
          }}
        >
          What<br />We Build
        </motion.h2>

        <motion.a
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          href={getWhatsAppLink("Hi! I'm interested in your services.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs uppercase tracking-widest underline underline-offset-4 transition-opacity hover:opacity-50"
          style={{ color: 'var(--foreground)' }}
        >
          Discuss a project ↗
        </motion.a>
      </div>

      {/* Service rows — full-width editorial */}
      <div>
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-12 items-center gap-4 px-6 py-8 transition-colors duration-200 md:px-12"
      style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: hovered ? 'rgba(28,28,28,0.03)' : 'transparent',
      }}
    >
      {/* Number */}
      <div className="col-span-1">
        <span
          className="font-body text-xs tabular-nums"
          style={{ color: 'var(--text-muted)' }}
        >
          {service.number}
        </span>
      </div>

      {/* Title */}
      <div className="col-span-5 md:col-span-4">
        <h3
          className="font-display text-xl font-bold uppercase leading-tight transition-all duration-200 md:text-2xl"
          style={{
            letterSpacing: '-0.015em',
            color: 'var(--foreground)',
          }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description — hidden on mobile */}
      <div className="col-span-4 hidden md:block">
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="col-span-6 flex flex-wrap justify-end gap-1.5 md:col-span-3">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-body rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
