'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/project-card';
import FilterTabs from '@/components/ui/filter-tabs';
import { Industry } from '@/data/projects';

type FilterValue = Industry | 'all';
type ActiveView = null | 'client' | 'demo';

const clientProjects = projects.filter((p) => !p.isDemo);
const demoProjects = projects.filter((p) => p.isDemo);

export default function Portfolio() {
  const [activeView, setActiveView] = useState<ActiveView>(null);
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const splitRef = useRef<HTMLDivElement>(null);
  const isSplitInView = useInView(splitRef, { once: true, margin: '-80px' });

  const displayProjects =
    activeView === 'client'
      ? clientProjects.filter(
          (p) => activeFilter === 'all' || p.industry === activeFilter
        )
      : activeView === 'demo'
      ? demoProjects.filter(
          (p) => activeFilter === 'all' || p.industry === activeFilter
        )
      : [];

  const counts: Partial<Record<FilterValue, number>> = { all: displayProjects.length };
  if (activeView) {
    const pool = activeView === 'client' ? clientProjects : demoProjects;
    for (const p of pool) {
      counts[p.industry] = (counts[p.industry] ?? 0) + 1;
    }
    counts.all = pool.length;
  }

  return (
    <section id="portfolio" style={{
      backgroundColor: 'rgba(250,250,248,0.92)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
    }}>
      {/* ── Section label ── */}
      <div
        className="flex items-center justify-between px-6 py-6 md:px-12"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={isSplitInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Our Work
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isSplitInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Delivered Worldwide
        </motion.p>
      </div>

      {/* ── FLEX-style Split Panels with 3D Tilt ── */}
      <div ref={splitRef} className="grid md:grid-cols-2" style={{ borderBottom: '1px solid var(--border)' }}>
        <SplitPanel
          isInView={isSplitInView}
          delay={0}
          label="Client"
          title="Websites"
          subtitle="Live projects delivered to clients"
          isActive={activeView === 'client'}
          isOtherActive={activeView === 'demo'}
          onClick={() =>
            setActiveView(activeView === 'client' ? null : 'client')
          }
          borderRight
        />
        <SplitPanel
          isInView={isSplitInView}
          delay={0.1}
          label="Demo"
          title="Projects"
          subtitle="Concept & showcase builds"
          isActive={activeView === 'demo'}
          isOtherActive={activeView === 'client'}
          onClick={() =>
            setActiveView(activeView === 'demo' ? null : 'demo')
          }
        />
      </div>

      {/* ── Expanded grid ── */}
      <AnimatePresence>
        {activeView !== null && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)' }}
          >
            <div className="px-6 py-8 md:px-12">
              <div className="mb-8 overflow-x-auto">
                <FilterTabs
                  active={activeFilter}
                  onChange={setActiveFilter}
                  counts={counts}
                />
              </div>
              <motion.div
                layout
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {displayProjects.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={i}
                  />
                ))}
              </motion.div>

              {/* View All Websites link */}
              <div className="mt-8 text-center">
                <p
                  className="font-body mb-4 text-xs uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {displayProjects.length} projects shown
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── View All Websites — always visible ── */}
      <ViewAllWebsites />
    </section>
  );
}

// ── View All Websites Section ───────────────────────────────────────────────

function ViewAllWebsites() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const allLive = projects.filter((p) => p.liveUrl);

  return (
    <div
      ref={ref}
      className="px-6 py-10 md:px-12"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        onClick={() => setExpanded(!expanded)}
        className="group flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
          <span
            className="font-body text-sm font-medium uppercase tracking-widest"
            style={{ color: 'var(--foreground)' }}
          >
            View All Live Websites
          </span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight size={18} style={{ color: 'var(--foreground)' }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {allLive.map((p) => (
                <a
                  key={p.slug}
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-black/5"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <div>
                    <p
                      className="font-body text-sm font-medium"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="font-body text-[11px]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {p.tagline}
                    </p>
                  </div>
                  <ExternalLink
                    size={12}
                    className="shrink-0 opacity-30 transition-opacity group-hover:opacity-70"
                    style={{ color: 'var(--foreground)' }}
                  />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Split Panel with 3D Tilt ────────────────────────────────────────────────

interface SplitPanelProps {
  isInView: boolean;
  delay: number;
  label: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  isOtherActive: boolean;
  onClick: () => void;
  borderRight?: boolean;
}

function SplitPanel({
  isInView,
  delay,
  label,
  title,
  subtitle,
  isActive,
  isOtherActive,
  onClick,
  borderRight,
}: SplitPanelProps) {
  const panelRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ rx: -y * 6, ry: x * 6 });
  }, []);

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.button
      ref={panelRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1],
        delay,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex w-full flex-col justify-between p-8 text-left md:p-12"
      style={{
        borderRight: borderRight ? '1px solid var(--border)' : undefined,
        backgroundColor: isActive
          ? 'var(--foreground)'
          : hovered
          ? 'rgba(28,28,28,0.04)'
          : 'var(--bg)',
        minHeight: '280px',
        opacity: isOtherActive ? 0.4 : 1,
        transition: 'background-color 0.3s ease, opacity 0.3s ease',
        perspective: '800px',
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: 'preserve-3d',
      }}
      aria-pressed={isActive}
    >
      {/* Subtle shine on hover */}
      {hovered && !isActive && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${(tilt.ry / 6 + 0.5) * 100}% ${(-tilt.rx / 6 + 0.5) * 100}%, rgba(201,185,154,0.08) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Top row — subtitle + arrow */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className="font-body text-xs uppercase tracking-widest"
          style={{
            color: isActive ? 'rgba(250,250,248,0.5)' : 'var(--text-muted)',
          }}
        >
          {subtitle}
        </span>

        <motion.div
          animate={{ rotate: isActive ? 45 : hovered ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <ArrowRight
            size={28}
            style={{
              color: isActive ? 'rgba(250,250,248,0.8)' : 'var(--foreground)',
              strokeWidth: 1.5,
            }}
          />
        </motion.div>
      </div>

      {/* Big text */}
      <div className="relative z-10">
        <p
          className="font-body mb-1 text-sm uppercase tracking-widest"
          style={{
            color: isActive ? 'rgba(250,250,248,0.5)' : 'var(--text-muted)',
          }}
        >
          {label}
        </p>
        <h2
          className="font-display uppercase leading-[0.9]"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 7rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: isActive ? '#FAFAF8' : 'var(--foreground)',
          }}
        >
          {title}
        </h2>
      </div>
    </motion.button>
  );
}
