import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  subtitle?: string;
  back?: { href: string; label: string };
}

export function Header({ subtitle, back }: HeaderProps) {
  return (
    <header style={{ background: 'var(--red)' }}>
      <div
        style={{
          height: '3px',
          background: 'linear-gradient(to right, var(--gold) 0%, rgba(255,255,255,0.35) 60%, transparent 100%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4 no-underline group">
          <div className="relative" style={{ width: 120, height: 36 }}>
            <Image
              src="/logo-mikami.png"
              alt="Mikami"
              fill
              sizes="120px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </div>
          {subtitle && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1.25rem', fontWeight: 300 }}>
                |
              </span>
              <span
                className="display"
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}
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
            style={{ color: 'rgba(255,255,255,0.75)' }}
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
