import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  subtitle?: string;
  back?: { href: string; label: string };
}

export function Header({ subtitle, back }: HeaderProps) {
  return (
    <header style={{ background: 'var(--red)' }}>
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-5 no-underline group">
          <div className="relative" style={{ width: 130, height: 40 }}>
            <Image
              src="/logo-mikami.png"
              alt="Mikami"
              fill
              sizes="130px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </div>
          {subtitle && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1.2rem', fontWeight: 200 }}>
                |
              </span>
              <span
                className="display"
                style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                {subtitle}
              </span>
            </>
          )}
        </Link>

        {back && (
          <Link
            href={back.href}
            className="flex items-center gap-2 text-sm no-underline transition-opacity hover:opacity-80"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {back.label}
          </Link>
        )}
      </div>
    </header>
  );
}
