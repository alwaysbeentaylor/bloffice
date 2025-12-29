'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Briefcase, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f9fafb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
        }}>
            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link href="/" className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <div className="logo-icon">
                            <Briefcase size={20} />
                        </div>
                        BureauLink
                    </Link>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginTop: '1rem' }}>
                        Welkom terug
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                        Log in op je account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label className="label">E-mailadres</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{
                                position: 'absolute',
                                left: '0.875rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af',
                            }} />
                            <input
                                type="email"
                                className="input"
                                placeholder="naam@bedrijf.nl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '2.75rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label className="label">Wachtwoord</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{
                                position: 'absolute',
                                left: '0.875rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af',
                            }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.875rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: 0,
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: '#1e3a5f' }} />
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Onthoud mij</span>
                        </label>
                        <Link href="#" style={{
                            fontSize: '0.875rem',
                            color: '#1e3a5f',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>
                            Wachtwoord vergeten?
                        </Link>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>
                        Inloggen
                    </button>
                </form>

                <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem' }}>
                    Nog geen account?{' '}
                    <Link href="/registreer" style={{ color: '#1e3a5f', fontWeight: '600', textDecoration: 'none' }}>
                        Registreer je bureau
                    </Link>
                </div>
            </div>
        </div>
    );
}
