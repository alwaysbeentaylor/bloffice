import Link from 'next/link';
import { Briefcase, MessageSquare, Handshake, Plus, ArrowRight, TrendingUp, User } from 'lucide-react';
import { currentBureau, getVacaturesByBureauId, getKandidatenByBureauId } from '@/lib/data';

export default function DashboardPage() {
    const myVacatures = getVacaturesByBureauId(currentBureau.id);
    const recentVacatures = myVacatures.slice(0, 3);
    const myKandidaten = getKandidatenByBureauId(currentBureau.id);
    const recentKandidaten = myKandidaten.slice(0, 3);

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Welcome Header */}
            <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem 0' }}>
                <div className="container">
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                        Welkom terug, {currentBureau.naam}
                    </h1>
                    <p style={{ color: '#6b7280' }}>
                        Bekijk je statistieken en beheer je vacatures & kandidaten
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                }}>
                    <div className="stat-card">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(30, 58, 95, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                        }}>
                            <Briefcase size={24} color="#1e3a5f" />
                        </div>
                        <div className="stat-value">{currentBureau.aantalVacatures}</div>
                        <div className="stat-label">Actieve vacatures</div>
                    </div>

                    <div className="stat-card">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                        }}>
                            <User size={24} color="#3b82f6" />
                        </div>
                        <div className="stat-value" style={{ color: '#3b82f6' }}>{myKandidaten.length}</div>
                        <div className="stat-label">Actieve kandidaten</div>
                    </div>

                    <div className="stat-card">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                        }}>
                            <MessageSquare size={24} color="#10b981" />
                        </div>
                        <div className="stat-value" style={{ color: '#10b981' }}>12</div>
                        <div className="stat-label">Reacties ontvangen</div>
                    </div>

                    <div className="stat-card">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                        }}>
                            <Handshake size={24} color="#f59e0b" />
                        </div>
                        <div className="stat-value" style={{ color: '#f59e0b' }}>{currentBureau.aantalSamenwerkingen}</div>
                        <div className="stat-label">Samenwerkingen</div>
                    </div>

                    <div className="stat-card">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(139, 92, 246, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                        }}>
                            <TrendingUp size={24} color="#8b5cf6" />
                        </div>
                        <div className="stat-value" style={{ color: '#8b5cf6' }}>€24.500</div>
                        <div className="stat-label">Verdiende commissies</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    <Link href="/vacatures/nieuw" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#1e3a5f',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <Plus size={24} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                Nieuwe vacature plaatsen
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                Deel een vacature met andere bureaus
                            </p>
                        </div>
                        <ArrowRight size={20} style={{ marginLeft: 'auto', color: '#9ca3af' }} />
                    </Link>

                    <Link href="/vacatures" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(30, 58, 95, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <Briefcase size={24} color="#1e3a5f" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                Vacatures bekijken
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                Ontdek vacatures van andere bureaus
                            </p>
                        </div>
                        <ArrowRight size={20} style={{ marginLeft: 'auto', color: '#9ca3af' }} />
                    </Link>

                    <Link href="/kandidaten/nieuw" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#3b82f6',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <User size={24} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                Nieuwe kandidaat plaatsen
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                Deel een kandidaat met andere bureaus
                            </p>
                        </div>
                        <ArrowRight size={20} style={{ marginLeft: 'auto', color: '#9ca3af' }} />
                    </Link>

                    <Link href="/kandidaten" className="card" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <User size={24} color="#3b82f6" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                Kandidaten bekijken
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                Ontdek kandidaten van andere bureaus
                            </p>
                        </div>
                        <ArrowRight size={20} style={{ marginLeft: 'auto', color: '#9ca3af' }} />
                    </Link>
                </div>

                {/* Recent Vacatures */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                            Mijn recente vacatures
                        </h2>
                        <Link href="/profiel" style={{
                            fontSize: '0.875rem',
                            color: '#1e3a5f',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}>
                            Bekijk alles →
                        </Link>
                    </div>

                    {recentVacatures.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {recentVacatures.map(vacature => (
                                <Link
                                    key={vacature.id}
                                    href={`/vacatures/${vacature.id}`}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        background: '#f9fafb',
                                        borderRadius: '0.5rem',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'background 0.2s ease',
                                    }}
                                >
                                    <div>
                                        <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                            {vacature.functietitel}
                                        </h4>
                                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                                            <span>{vacature.locatie}</span>
                                            <span>•</span>
                                            <span>{vacature.categorie}</span>
                                        </div>
                                    </div>
                                    <span className="badge badge-success">Actief</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>Je hebt nog geen vacatures geplaatst</p>
                            <Link href="/vacatures/nieuw" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                Plaats je eerste vacature
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
