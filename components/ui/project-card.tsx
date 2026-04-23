'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project, INDUSTRY_LABELS } from '@/data/projects';
import { cn } from '@/lib/utils';

const REGION_FLAGS: Record<string, string> = {
  UAE: '🇦🇪',
  India: '🇮🇳',
  KSA: '🇸🇦',
};

const INDUSTRY_COLORS: Record<string, { from: string; to: string }> = {
  corporate: { from: '#1C1C2E', to: '#2D2D44' },
  healthcare: { from: '#1A3A2A', to: '#2D5E3E' },
  ecommerce: { from: '#3A1A2A', to: '#602D45' },
  education: { from: '#1A1A3A', to: '#2D2D60' },
  creative: { from: '#3A1C1A', to: '#5E2D2A' },
  industrial: { from: '#1A1A1A', to: '#3A3A2A' },
  hospitality: { from: '#1A2A3A', to: '#2D4560' },
  food: { from: '#3A1A1A', to: '#5E2D2D' },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const colors = INDUSTRY_COLORS[project.industry] ?? {
    from: '#1C1C1C',
    to: '#2D2D2D',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, rotateY: -5 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        ease: [0.22, 0.61, 0.36, 1],
        delay: (index % 3) * 0.08,
      }}
      whileHover={{ y: -8 }}
      style={{ perspective: 800 }}
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full rounded-2xl overflow-hidden"
        style={{
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          boxShadow: '0 2px 8px rgba(28,28,28,0.04)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
        aria-label={`View ${project.name} — ${project.tagline}`}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 20px 60px rgba(28,28,28,0.12)';
          (e.currentTarget as HTMLAnchorElement).style.borderColor =
            'var(--accent-warm)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 2px 8px rgba(28,28,28,0.04)';
          (e.currentTarget as HTMLAnchorElement).style.borderColor =
            'var(--border)';
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative h-48 w-full overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          }}
        >
          {/* Real screenshot */}
          <img
            src={`/screenshots/${project.slug}.jpg`}
            alt={`${project.name} website screenshot`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Hide broken image, fallback to gradient + initial
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Fallback initial (shows through if image fails) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-6xl font-bold select-none"
              style={{ color: 'rgba(255,255,255,0.12)' }}
            >
              {project.name.charAt(0)}
            </span>
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <p
              className="font-display text-xl font-semibold leading-tight"
              style={{ color: 'rgba(255,255,255,0.95)' }}
            >
              {project.name}
            </p>
          </div>

          {/* Demo badge */}
          {project.isDemo && (
            <div className="absolute top-3 right-3">
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                style={{
                  backgroundColor: 'rgba(201,185,154,0.25)',
                  color: 'var(--accent-warm)',
                  border: '1px solid rgba(201,185,154,0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Demo
              </span>
            </div>
          )}

          {/* External link icon on hover */}
          <motion.div
            className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(250,250,248,0.15)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
          >
            <ExternalLink size={12} style={{ color: 'rgba(255,255,255,0.8)' }} />
          </motion.div>
        </div>

        {/* Card content */}
        <div className="p-5">
          {/* Badges row */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                'rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider'
              )}
              style={{
                backgroundColor: 'rgba(28,28,28,0.06)',
                color: 'var(--text-muted)',
              }}
            >
              {INDUSTRY_LABELS[project.industry]}
            </span>
            {project.region && (
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: 'rgba(201,185,154,0.12)',
                  color: 'var(--accent-warm)',
                }}
              >
                {REGION_FLAGS[project.region]} {project.region}
              </span>
            )}
          </div>

          {/* Tagline */}
          <p
            className="font-body mb-4 text-sm leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {project.tagline}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: 'rgba(28,28,28,0.04)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-4 flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 group-hover:gap-2.5"
            style={{ color: 'var(--foreground)' }}
          >
            View Live
            <ExternalLink
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </a>
    </motion.article>
  );
}
