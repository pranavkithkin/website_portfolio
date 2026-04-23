'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#home', label: 'HOME' },
  { href: '#portfolio', label: 'WORK' },
  { href: '#services', label: 'SERVICES' },
  { href: '#process', label: 'PROCESS' },
  { href: '#contact', label: 'CONTACT' },
];

interface HeaderProps {
  visible?: boolean;
}

export default function Header({ visible = true }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) =>
      document.querySelector(href)
    ).filter(Boolean) as Element[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
            break;
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled
            ? 'rgba(250, 250, 248, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          {/* Logo / Wordmark */}
          <button
            onClick={() => handleNavClick('#home')}
            className="font-display text-sm font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
            style={{ color: 'var(--foreground)' }}
            aria-label="SynopsLabs — Home"
          >
            SynopsLabs
          </button>

          {/* Desktop nav — uppercase spaced links */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                className="relative font-body text-xs uppercase tracking-widest transition-opacity"
                style={{
                  color: 'var(--foreground)',
                  opacity: active === href ? 1 : 0.4,
                  fontWeight: active === href ? 600 : 400,
                }}
                aria-current={active === href ? 'page' : undefined}
              >
                {label}
                {active === href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ backgroundColor: 'var(--foreground)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-body text-xs uppercase tracking-widest underline underline-offset-4 transition-opacity hover:opacity-60 md:block"
              style={{ color: 'var(--foreground)' }}
            >
              Let&apos;s Talk ↗
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center md:hidden"
              style={{ color: 'var(--foreground)' }}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col px-8 py-8 md:hidden"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <div className="flex justify-between">
              <span
                className="font-display text-sm font-bold uppercase tracking-[0.15em]"
                style={{ color: 'var(--foreground)' }}
              >
                SynopsLabs
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ color: 'var(--foreground)' }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-6">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  onClick={() => handleNavClick(href)}
                  className="font-display text-left uppercase"
                  style={{
                    fontSize: 'clamp(2rem, 10vw, 4rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color:
                      active === href
                        ? 'var(--foreground)'
                        : 'rgba(28,28,28,0.3)',
                  }}
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
              style={{ backgroundColor: 'var(--wa-green)', color: '#fff', width: 'fit-content' }}
            >
              WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
