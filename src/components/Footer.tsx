import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem'
                }}>
                    {/* Logo & Description */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                background: 'white',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1e3a5f',
                            }}>
                                <Briefcase size={18} />
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>BureauLink</span>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Het besloten B2B platform waar geverifieerde uitzendbureaus vacatures delen.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link href="/vacatures">Vacatures</Link></li>
                            <li><Link href="/bureaus">Bureaus</Link></li>
                            <li><Link href="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Informatie */}
                    <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Informatie</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link href="#">Over ons</Link></li>
                            <li><Link href="#">Hoe het werkt</Link></li>
                            <li><Link href="#">Veelgestelde vragen</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Contact</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link href="mailto:info@bureaulink.nl">info@bureaulink.nl</Link></li>
                            <li><Link href="tel:+31201234567">020-123 45 67</Link></li>
                            <li><Link href="#">Privacybeleid</Link></li>
                            <li><Link href="#">Algemene voorwaarden</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid #374151',
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    textAlign: 'center',
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                }}>
                    © 2024 BureauLink. Alle rechten voorbehouden.
                </div>
            </div>
        </footer>
    );
}
