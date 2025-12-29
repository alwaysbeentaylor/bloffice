'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Building2, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if we're on a "logged in" page
    const isLoggedIn = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/vacatures') ||
        pathname.startsWith('/bureaus') ||
        pathname.startsWith('/profiel') ||
        pathname.startsWith('/admin');

    if (!isLoggedIn) return null;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/dashboard" className="logo">
                    <div className="logo-icon">
                        <Briefcase size={20} />
                    </div>
                    BureauLink
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-links" style={{ display: 'flex' }}>
                    <Link
                        href="/vacatures"
                        className="navbar-link"
                        style={{
                            color: pathname.startsWith('/vacatures') ? '#1e3a5f' : undefined,
                            fontWeight: pathname.startsWith('/vacatures') ? '600' : undefined
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Briefcase size={18} />
                            Vacatures
                        </span>
                    </Link>
                    <Link
                        href="/bureaus"
                        className="navbar-link"
                        style={{
                            color: pathname.startsWith('/bureaus') ? '#1e3a5f' : undefined,
                            fontWeight: pathname.startsWith('/bureaus') ? '600' : undefined
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Building2 size={18} />
                            Bureaus
                        </span>
                    </Link>
                    <Link
                        href="/profiel"
                        className="navbar-link"
                        style={{
                            color: pathname === '/profiel' ? '#1e3a5f' : undefined,
                            fontWeight: pathname === '/profiel' ? '600' : undefined
                        }}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={18} />
                            Mijn Profiel
                        </span>
                    </Link>
                    <Link href="/" className="navbar-link" style={{ color: '#ef4444' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={18} />
                            Uitloggen
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                    }}
                    className="mobile-menu-btn"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    borderBottom: '1px solid #e5e7eb',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    <Link href="/vacatures" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        Vacatures
                    </Link>
                    <Link href="/bureaus" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        Bureaus
                    </Link>
                    <Link href="/profiel" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        Mijn Profiel
                    </Link>
                    <Link href="/" className="navbar-link" style={{ color: '#ef4444' }} onClick={() => setMobileMenuOpen(false)}>
                        Uitloggen
                    </Link>
                </div>
            )}

            <style jsx>{`
        @media (max-width: 768px) {
          .navbar-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
        </nav>
    );
}
