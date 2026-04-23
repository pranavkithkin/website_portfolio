'use client';

import Image from 'next/image';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#portfolio', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

const SERVICE_LINKS = [
  { label: 'Business Websites' },
  { label: 'E-commerce Platforms' },
  { label: 'Educational Platforms' },
  { label: 'Corporate Portals' },
];

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/synops-labs/',
    // inline SVG path for LinkedIn
    svgPath:
      'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/synopslabs',
    svgPath:
      'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/synopslabs',
    svgPath:
      'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/synopslabs',
    svgPath:
      'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
];

function SocialIcon({ path }: { path: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        backgroundColor: 'var(--foreground)',
        color: 'rgba(250,250,248,0.9)',
      }}
    >
      <div className="container-main">
        {/* 4-column grid */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div
              className="mb-4 inline-block rounded-lg px-3 py-2"
              style={{ backgroundColor: 'rgba(250,250,248,0.08)' }}
            >
              <Image
                src="/images/synopslabs-logo.svg"
                alt="SynopsLabs AI"
                width={140}
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <p
              className="font-body mb-4 text-sm leading-relaxed"
              style={{ color: 'rgba(250,250,248,0.55)' }}
            >
              Transforming businesses with premium web development across UAE,
              India &amp; KSA.
            </p>
            <p
              className="font-body mb-1 text-xs"
              style={{ color: 'rgba(250,250,248,0.45)' }}
            >
              pranav@synopslabs.com
            </p>
            <p
              className="font-body mb-5 text-xs"
              style={{ color: 'rgba(250,250,248,0.45)' }}
            >
              +971 56 627 2141 · Dubai, UAE
            </p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--wa-green)', color: '#fff' }}
            >
              <MessageCircle size={13} />
              WhatsApp Chat
            </a>
          </div>

          {/* Navigation column */}
          <div>
            <h4
              className="font-body mb-4 text-xs font-medium uppercase tracking-widest"
              style={{ color: 'rgba(250,250,248,0.4)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="font-body text-sm transition-opacity hover:opacity-100"
                    style={{ color: 'rgba(250,250,248,0.65)' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h4
              className="font-body mb-4 text-xs font-medium uppercase tracking-widest"
              style={{ color: 'rgba(250,250,248,0.4)' }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(({ label }) => (
                <li key={label}>
                  <button
                    onClick={() => handleNavClick('#services')}
                    className="font-body text-sm transition-opacity hover:opacity-100"
                    style={{ color: 'rgba(250,250,248,0.65)' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Connect column */}
          <div>
            <h4
              className="font-body mb-4 text-xs font-medium uppercase tracking-widest"
              style={{ color: 'rgba(250,250,248,0.4)' }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ label, href, svgPath }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-100"
                  style={{ color: 'rgba(250,250,248,0.65)' }}
                  aria-label={`${label} — opens in new tab`}
                >
                  <SocialIcon path={svgPath} />
                  {label}
                  <ExternalLink size={10} style={{ opacity: 0.4 }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Warm accent gradient line */}
        <div
          className="mb-6 h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--accent-warm), transparent)',
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p
            className="font-body text-xs"
            style={{ color: 'rgba(250,250,248,0.35)' }}
          >
            © {year} SynopsLabs AI. All rights reserved.
          </p>
          <div className="flex gap-5">
            <span
              className="font-body text-xs"
              style={{ color: 'rgba(250,250,248,0.35)' }}
            >
              Privacy Policy
            </span>
            <span
              className="font-body text-xs"
              style={{ color: 'rgba(250,250,248,0.35)' }}
            >
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
