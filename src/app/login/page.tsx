'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Senha incorreta. Tente novamente.');
        setLoading(false);
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--charcoal)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,25,33,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(170,124,74,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative', width: 160, height: 48 }}>
            <Image
              src="/logo-mikami.png"
              alt="Mikami"
              fill
              sizes="160px"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <h1 className="display" style={{ color: 'white', fontSize: '1.8rem', marginBottom: '8px' }}>
            Análise Crítica
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontFamily: 'var(--font-outfit, system-ui)' }}>
            Acesso restrito · Insira a senha para continuar
          </p>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '28px' }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '8px',
                fontFamily: 'var(--font-outfit, system-ui)',
              }}
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.07)',
                border: error ? '1px solid var(--red)' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '1rem',
                fontFamily: 'var(--font-outfit, system-ui)',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(170,124,74,0.7)'; }}
              onBlur={e => { e.target.style.borderColor = error ? 'var(--red)' : 'rgba(255,255,255,0.15)'; }}
            />
          </div>

          {error && (
            <p style={{
              color: 'var(--red)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-outfit, system-ui)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>⚠</span> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              background: loading ? 'rgba(215,25,33,0.5)' : 'var(--red)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '13px',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-outfit, system-ui)',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.15s, background 0.15s',
              marginTop: '4px',
            }}
          >
            {loading ? 'Verificando…' : 'Acessar Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
