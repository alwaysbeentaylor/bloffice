'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle, Phone, Mail, Briefcase, Handshake, Star, X } from 'lucide-react';
import { bureaus, getReviewsByBureauId, getVacaturesByBureauId } from '@/lib/data';
import Rating from '@/components/Rating';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function BureauProfielPage({ params }: PageProps) {
    const { id } = use(params);
    const bureau = bureaus.find(b => b.id === id);
    const [showReviewModal, setShowReviewModal] = useState(false);

    if (!bureau) {
        notFound();
    }

    const reviews = getReviewsByBureauId(bureau.id);
    const vacatures = getVacaturesByBureauId(bureau.id);

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <Link
                        href="/bureaus"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#6b7280',
                            textDecoration: 'none',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                        }}
                    >
                        <ArrowLeft size={16} />
                        Terug naar overzicht
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#e5e7eb',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <Building2 size={40} color="#6b7280" />
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>{bureau.naam}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                {bureau.geverifieerd && (
                                    <span className="verified-badge">
                                        <CheckCircle size={16} />
                                        Geverifieerd bureau
                                    </span>
                                )}
                                <Rating rating={bureau.rating} />
                                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    ({bureau.aantalReviews} reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div className="detail-layout">
                    {/* Main Content */}
                    <main>
                        {/* Specialisaties */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Specialisaties
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {bureau.specialisaties.map(spec => (
                                    <span key={spec} className="badge badge-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                        }}>
                            <div className="stat-card">
                                <Briefcase size={24} style={{ color: '#1e3a5f', marginBottom: '0.5rem' }} />
                                <div className="stat-value">{bureau.aantalVacatures}</div>
                                <div className="stat-label">Vacatures gedeeld</div>
                            </div>
                            <div className="stat-card">
                                <Handshake size={24} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                                <div className="stat-value" style={{ color: '#10b981' }}>{bureau.aantalSamenwerkingen}</div>
                                <div className="stat-label">Samenwerkingen</div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="card">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                            }}>
                                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                                    Reviews ({reviews.length})
                                </h2>
                                <button
                                    onClick={() => setShowReviewModal(true)}
                                    className="btn btn-outline"
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                >
                                    <Star size={16} style={{ marginRight: '0.5rem' }} />
                                    Schrijf een review
                                </button>
                            </div>

                            {reviews.length > 0 ? (
                                <div>
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        background: '#e5e7eb',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Building2 size={18} color="#6b7280" />
                                                    </div>
                                                    <div>
                                                        <div className="review-author">{review.reviewerBureauNaam}</div>
                                                        <Rating rating={review.rating} showNumber={false} size={12} />
                                                    </div>
                                                </div>
                                                <span className="review-date">
                                                    {new Date(review.datum).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="review-text">{review.tekst}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                                    Dit bureau heeft nog geen reviews ontvangen.
                                </p>
                            )}
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside>
                        <div className="sidebar-box">
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Contactgegevens
                            </h3>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                    Contactpersoon
                                </div>
                                <div style={{ fontWeight: '500', color: '#1f2937' }}>
                                    {bureau.contactpersoon}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <a
                                    href={`tel:${bureau.telefoon}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#4b5563',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    <Phone size={16} />
                                    {bureau.telefoon}
                                </a>
                                <a
                                    href={`mailto:${bureau.email}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#4b5563',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    <Mail size={16} />
                                    {bureau.email}
                                </a>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%' }}>
                                Neem contact op
                            </button>

                            <div style={{
                                marginTop: '1.5rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid #e5e7eb',
                                fontSize: '0.875rem',
                                color: '#6b7280',
                            }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <strong>Lid sinds:</strong>{' '}
                                    {new Date(bureau.registratieDatum).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
                                </div>
                                <div>
                                    <strong>KvK:</strong> {bureau.kvkNummer}
                                </div>
                            </div>
                        </div>

                        {/* Active vacatures */}
                        {vacatures.length > 0 && (
                            <div className="sidebar-box" style={{ marginTop: '1.5rem' }}>
                                <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                    Actieve vacatures ({vacatures.length})
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {vacatures.slice(0, 3).map(v => (
                                        <Link
                                            key={v.id}
                                            href={`/vacatures/${v.id}`}
                                            style={{
                                                padding: '0.75rem',
                                                background: '#f9fafb',
                                                borderRadius: '0.5rem',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <div style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                                                {v.functietitel}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                {v.locatie} • {v.categorie}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && (
                <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Schrijf een review</h3>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div style={{ marginBottom: '1rem' }}>
                                <label className="label">Rating</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '0.25rem',
                                            }}
                                        >
                                            <Star size={28} fill="#f59e0b" color="#f59e0b" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label className="label">Je review</label>
                                <textarea
                                    className="input"
                                    placeholder="Beschrijf je ervaring met dit bureau..."
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setShowReviewModal(false)} className="btn btn-outline">
                                Annuleren
                            </button>
                            <button onClick={() => setShowReviewModal(false)} className="btn btn-primary">
                                Plaatsen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
