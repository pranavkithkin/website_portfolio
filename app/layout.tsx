import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: 'SynopsLabs — Web Development Portfolio | Dubai, UAE',
  description:
    '200+ websites delivered across healthcare, education, e-commerce and corporate sectors in UAE, India & KSA. Contact SynopsLabs for premium web development.',
  keywords: [
    'web development Dubai',
    'web agency UAE',
    'Next.js developer Dubai',
    'ecommerce website UAE',
    'SynopsLabs',
  ],
  openGraph: {
    title: 'SynopsLabs — Web Development Portfolio',
    description:
      '150+ websites delivered across healthcare, education, e-commerce and corporate sectors in UAE, India & KSA.',
    url: 'https://synopslabs.com',
    siteName: 'SynopsLabs AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SynopsLabs — Web Development Portfolio',
    description:
      '150+ websites delivered across UAE, India & KSA.',
    site: '@synopslabs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload first 8 hero frames — canvas shows frame_0001 immediately */}
        {Array.from({ length: 8 }, (_, i) => (
          <link
            key={`hero-${i}`}
            rel="preload"
            as="image"
            href={`/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`}
          />
        ))}
        {/* Preload first 4 tunnel frames */}
        {Array.from({ length: 4 }, (_, i) => (
          <link
            key={`tunnel-${i}`}
            rel="preload"
            as="image"
            href={`/tunnel-frames/frame-${String(i + 1).padStart(4, '0')}.jpg`}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'SynopsLabs AI',
              description:
                'Web development agency delivering premium websites across UAE, India, and KSA.',
              url: 'https://synopslabs.com',
              telephone: '+971566272141',
              email: 'pranav@synopslabs.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Dubai',
                addressCountry: 'AE',
              },
              sameAs: [
                'https://www.linkedin.com/company/synops-labs/',
                'https://twitter.com/synopslabs',
                'https://github.com/synopslabs',
              ],
              areaServed: ['AE', 'IN', 'SA'],
              knowsAbout: [
                'Web Development',
                'E-commerce',
                'Next.js',
                'React',
              ],
            }),
          }}
        />
      </head>
      <body className="font-body bg-[var(--bg)] text-[var(--foreground)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
