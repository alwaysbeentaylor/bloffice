'use client';

import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Building2, Clock, Users } from 'lucide-react';
import { bureaus, pendingBureaus } from '@/lib/data';

export default function AdminPage() {
    const [pending, setPending] = useState(pendingBureaus);
    const [verified, setVerified] = useState(bureaus);

    const handleApprove = (id: string) => {
        const bureau = pending.find(b => b.id === id);
        if (bureau) {
            setPending(prev => prev.filter(b => b.id !== id));
            setVerified(prev => [...prev, { ...bureau, geverifieerd: true }]);
        }
    };

    const handleReject = (id: string) => {
        setPending(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(30, 58, 95, 0.1)',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Shield size={20} color="#1e3a5f" />
                        </div>
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                                Beheer bureau verificaties
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}>
                    <div className="stat-card">
                        <Clock size={24} style={{ color: '#f59e0b', marginBottom: '0.5rem' }} />
                        <div className="stat-value" style={{ color: '#f59e0b' }}>{pending.length}</div>
                        <div className="stat-label">Wachtend op verificatie</div>
                    </div>
                    <div className="stat-card">
                        <CheckCircle size={24} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                        <div className="stat-value" style={{ color: '#10b981' }}>{verified.length}</div>
                        <div className="stat-label">Geverifieerde bureaus</div>
                    </div>
                    <div className="stat-card">
                        <Users size={24} style={{ color: '#1e3a5f', marginBottom: '0.5rem' }} />
                        <div className="stat-value">{pending.length + verified.length}</div>
                        <div className="stat-label">Totaal bureaus</div>
                    </div>
                </div>

                {/* Pending Verification */}
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <Clock size={20} color="#f59e0b" />
                        Wachtend op verificatie ({pending.length})
                    </h2>

                    {pending.length > 0 ? (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Bureaunaam</th>
                                        <th>KvK-nummer</th>
                                        <th>Contactpersoon</th>
                                        <th>Registratiedatum</th>
                                        <th>Specialisaties</th>
                                        <th style={{ textAlign: 'right' }}>Acties</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending.map(bureau => (
                                        <tr key={bureau.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        background: '#e5e7eb',
                                                        borderRadius: '0.375rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Building2 size={20} color="#6b7280" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '500' }}>{bureau.naam}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{bureau.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{bureau.kvkNummer}</td>
                                            <td>{bureau.contactpersoon}</td>
                                            <td>{new Date(bureau.registratieDatum).toLocaleDateString('nl-NL')}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                                    {bureau.specialisaties.slice(0, 2).map(spec => (
                                                        <span key={spec} className="badge" style={{ fontSize: '0.7rem' }}>{spec}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <button
                                                        onClick={() => handleApprove(bureau.id)}
                                                        className="btn btn-approve"
                                                    >
                                                        <CheckCircle size={16} style={{ marginRight: '0.25rem' }} />
                                                        Goedkeuren
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(bureau.id)}
                                                        className="btn btn-reject"
                                                    >
                                                        <XCircle size={16} style={{ marginRight: '0.25rem' }} />
                                                        Afwijzen
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                            Geen bureaus wachtend op verificatie
                        </p>
                    )}
                </div>

                {/* Verified Bureaus */}
                <div className="card">
                    <h2 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <CheckCircle size={20} color="#10b981" />
                        Geverifieerde bureaus ({verified.length})
                    </h2>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Bureaunaam</th>
                                    <th>KvK-nummer</th>
                                    <th>Contactpersoon</th>
                                    <th>Lid sinds</th>
                                    <th>Vacatures</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verified.slice(0, 10).map(bureau => (
                                    <tr key={bureau.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    background: '#e5e7eb',
                                                    borderRadius: '0.375rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Building2 size={20} color="#6b7280" />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{bureau.naam}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{bureau.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{bureau.kvkNummer}</td>
                                        <td>{bureau.contactpersoon}</td>
                                        <td>{new Date(bureau.registratieDatum).toLocaleDateString('nl-NL')}</td>
                                        <td>{bureau.aantalVacatures}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <span style={{ color: '#f59e0b' }}>★</span>
                                                {bureau.rating.toFixed(1)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
