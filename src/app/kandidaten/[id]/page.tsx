'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Euro, Building2, Phone, Mail, MessageSquare, User, Calendar } from 'lucide-react';
import { getKandidaatById, getBureauById } from '@/lib/data';
import Rating from '@/components/Rating';

export default function KandidaatDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const kandidaat = getKandidaatById(resolvedParams.id);
    const bureau = kandidaat ? getBureauById(kandidaat.bureauId) : undefined;

    if (!kandidaat) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h1>Kandidaat niet gevonden</h1>
                <Link href="/kandidaten" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Terug naar overzicht
                </Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <Link href="/kandidaten" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#6b7280',
                        textDecoration: 'none',
                        marginBottom: '1rem',
                    }}>
                        <ArrowLeft size={18} />
                        Terug naar overzicht
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: '#e5e7eb',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <User size={32} color="#6b7280" />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.25rem' }}>{kandidaat.functie}</h1>
                            <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>{kandidaat.categorie} • {kandidaat.regio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                    {/* Main Content */}
                    <main>
                        {/* Quick Info */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                gap: '1.5rem',
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        <MapPin size={16} />
                                        <span style={{ fontSize: '0.875rem' }}>Locatie</span>
                                    </div>
                                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{kandidaat.locatie}</div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        <Clock size={16} />
                                        <span style={{ fontSize: '0.875rem' }}>Ervaring</span>
                                    </div>
                                    <div style={{ fontWeight: '600', color: '#1f2937' }}>{kandidaat.ervaring}</div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        <Calendar size={16} />
                                        <span style={{ fontSize: '0.875rem' }}>Beschikbaarheid</span>
                                    </div>
                                    <div style={{
                                        fontWeight: '600',
                                        color: kandidaat.beschikbaarheid === 'direct' ? '#059669' : '#1f2937',
                                    }}>
                                        {kandidaat.beschikbaarheid === 'direct' ? 'Direct beschikbaar' :
                                            kandidaat.beschikbaarheid === 'binnen 2 weken' ? 'Binnen 2 weken' : 'In overleg'}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        <span style={{ fontSize: '0.875rem' }}>Categorie</span>
                                    </div>
                                    <span className="badge badge-primary">{kandidaat.categorie}</span>
                                </div>
                            </div>
                        </div>

                        {/* Profiel beschrijving */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Profiel
                            </h2>
                            <div style={{ color: '#374151', lineHeight: '1.75', whiteSpace: 'pre-line' }}>
                                {kandidaat.samenvatting}
                            </div>
                        </div>

                        {/* Commissie Info */}
                        <div className="card" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#166534', marginBottom: '1rem' }}>
                                Commissie afspraken
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1.5rem',
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '0.25rem' }}>
                                        Uurtarief kandidaat
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Euro size={20} />
                                        {kandidaat.uurtarief}/uur
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '0.25rem' }}>
                                        Commissie voorstel
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534' }}>
                                        {kandidaat.commissieVoorstel}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside>
                        {/* Bureau Info */}
                        <div className="sidebar-box" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Aangeboden door
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#e5e7eb',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <Building2 size={24} color="#6b7280" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                        De aanbieder
                                    </h4>
                                    <Rating rating={kandidaat.bureauRating} size={14} />
                                </div>
                            </div>

                            {bureau && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                        <Mail size={16} />
                                        {bureau.email}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                        <Phone size={16} />
                                        {bureau.telefoon}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="sidebar-box">
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Interesse in deze kandidaat?
                            </h3>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                Neem contact op met de aanbieder om deze kandidaat te bespreken.
                            </p>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                Voorkeurscontact: <strong>{kandidaat.contactVoorkeur === 'beide' ? 'Telefoon of e-mail' : kandidaat.contactVoorkeur === 'telefoon' ? 'Telefoon' : 'E-mail'}</strong>
                            </p>
                            <button className="btn btn-primary" style={{ width: '100%' }}>
                                <MessageSquare size={18} style={{ marginRight: '0.5rem' }} />
                                Neem contact op
                            </button>
                            <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.75rem' }}>
                                Geplaatst op {new Date(kandidaat.geplaatst).toLocaleDateString('nl-NL')}
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
