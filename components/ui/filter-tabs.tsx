'use client';

import { motion } from 'framer-motion';
import { Industry, INDUSTRY_LABELS } from '@/data/projects';

type FilterValue = Industry | 'all';

interface FilterTabsProps {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Partial<Record<FilterValue, number>>;
}

const TABS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'corporate', label: INDUSTRY_LABELS.corporate },
  { value: 'healthcare', label: INDUSTRY_LABELS.healthcare },
  { value: 'ecommerce', label: INDUSTRY_LABELS.ecommerce },
  { value: 'education', label: INDUSTRY_LABELS.education },
  { value: 'creative', label: INDUSTRY_LABELS.creative },
  { value: 'industrial', label: INDUSTRY_LABELS.industrial },
  { value: 'hospitality', label: INDUSTRY_LABELS.hospitality },
  { value: 'food', label: INDUSTRY_LABELS.food },
];

export default function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2 pb-1"
      role="tablist"
      aria-label="Filter by industry"
    >
      {TABS.map(({ value, label }) => {
        const isActive = active === value;
        const count = counts[value];

        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className="relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200"
            style={{
              color: isActive ? 'var(--bg)' : 'var(--text-muted)',
              fontFamily: 'var(--font-inter)',
            }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              />
            )}
            <span className="relative z-10">{label}</span>
            {count !== undefined && (
              <span
                className="relative z-10 tabular-nums"
                style={{
                  opacity: isActive ? 0.7 : 0.5,
                }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
