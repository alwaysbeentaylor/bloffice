'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Upload, Mail, Phone, Save, Star, User } from 'lucide-react';
import { currentBureau, getVacaturesByBureauId, getReviewsByBureauId, getKandidatenByBureauId, specialisaties } from '@/lib/data';
import Rating from '@/components/Rating';

export default function ProfielPage() {
    const [formData, setFormData] = useState({
        bedrijfsnaam: currentBureau.naam,
        contactpersoon: currentBureau.contactpersoon,
        email: currentBureau.email,
        telefoon: currentBureau.telefoon,
        selectedSpecialisaties: currentBureau.specialisaties as string[],
    });
    const [saved, setSaved] = useState(false);

    const myVacatures = getVacaturesByBureauId(currentBureau.id);
    const myReviews = getReviewsByBureauId(currentBureau.id);
    const myKandidaten = getKandidatenByBureauId(currentBureau.id);

    const toggleSpecialisatie = (spec: string) => {
        setFormData(prev => ({
            ...prev,
            selectedSpecialisaties: prev.selectedSpecialisaties.includes(spec)
                ? prev.selectedSpecialisaties.filter(s => s !== spec)
                : [...prev.selectedSpecialisaties, spec],
        }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1>Mijn Profiel</h1>
                    <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                        Beheer je bedrijfsgegevens en bekijk je statistieken
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                    {/* Main Content */}
                    <main>
                        {/* Profile Edit Form */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                                Bedrijfsgegevens
                            </h2>

                            {saved && (
                                <div style={{
                                    background: '#d1fae5',
                                    color: '#065f46',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.5rem',
                                    marginBottom: '1rem',
                                    fontSize: '0.9rem',
                                }}>
                                    ✓ Wijzigingen opgeslagen
                                </div>
                            )}

                            {/* Logo Upload */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label className="label">Bedrijfslogo</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: '#e5e7eb',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Building2 size={36} color="#6b7280" />
                                    </div>
                                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                        <Upload size={16} style={{ marginRight: '0.5rem' }} />
                                        Logo uploaden
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label className="label">Bedrijfsnaam</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.bedrijfsnaam}
                                        onChange={(e) => setFormData({ ...formData, bedrijfsnaam: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="label">Contactpersoon</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.contactpersoon}
                                        onChange={(e) => setFormData({ ...formData, contactpersoon: e.target.value })}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label className="label">E-mailadres</label>
                                        <div style={{ position: 'relative' }}>
                                            <Mail size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                            <input
                                                type="email"
                                                className="input"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                style={{ paddingLeft: '2.75rem' }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Telefoonnummer</label>
                                        <div style={{ position: 'relative' }}>
                                            <Phone size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                            <input
                                                type="tel"
                                                className="input"
                                                value={formData.telefoon}
                                                onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                                                style={{ paddingLeft: '2.75rem' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Specialisaties */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Specialisaties
                            </h2>
                            <div className="checkbox-group">
                                {specialisaties.map(spec => (
                                    <label key={spec} className="checkbox-item" style={{
                                        background: formData.selectedSpecialisaties.includes(spec) ? 'rgba(30, 58, 95, 0.1)' : undefined,
                                        border: formData.selectedSpecialisaties.includes(spec) ? '1px solid #1e3a5f' : '1px solid transparent',
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.selectedSpecialisaties.includes(spec)}
                                            onChange={() => toggleSpecialisatie(spec)}
                                        />
                                        {spec}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleSave} className="btn btn-primary">
                            <Save size={18} style={{ marginRight: '0.5rem' }} />
                            Wijzigingen opslaan
                        </button>
                    </main>

                    {/* Sidebar */}
                    <aside>
                        {/* My Vacatures */}
                        <div className="sidebar-box" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>
                                    Mijn vacatures ({myVacatures.length})
                                </h3>
                                <Link href="/vacatures/nieuw" style={{ fontSize: '0.875rem', color: '#1e3a5f', textDecoration: 'none' }}>
                                    + Nieuw
                                </Link>
                            </div>

                            {myVacatures.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {myVacatures.map(v => (
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
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.9rem' }}>
                                                        {v.functietitel}
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                        {v.locatie}
                                                    </div>
                                                </div>
                                                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Actief</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    Je hebt nog geen vacatures geplaatst.
                                </p>
                            )}
                        </div>

                        {/* My Kandidaten */}
                        <div className="sidebar-box" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontWeight: '600', color: '#1f2937' }}>
                                    Mijn kandidaten ({myKandidaten.length})
                                </h3>
                                <Link href="/kandidaten/nieuw" style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none' }}>
                                    + Nieuw
                                </Link>
                            </div>

                            {myKandidaten.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {myKandidaten.map(k => (
                                        <Link
                                            key={k.id}
                                            href={`/kandidaten/${k.id}`}
                                            style={{
                                                padding: '0.75rem',
                                                background: '#f9fafb',
                                                borderRadius: '0.5rem',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        background: '#e5e7eb',
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <User size={16} color="#6b7280" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.9rem' }}>
                                                            {k.functie}
                                                        </div>
                                                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                            {k.categorie} • {k.regio}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Actief</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    Je hebt nog geen kandidaten geplaatst.
                                </p>
                            )}
                        </div>

                        {/* Received Reviews */}
                        <div className="sidebar-box">
                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Ontvangen reviews ({myReviews.length})
                            </h3>

                            {myReviews.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {myReviews.map(review => (
                                        <div key={review.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                <div style={{ fontWeight: '500', color: '#1f2937', fontSize: '0.9rem' }}>
                                                    Bureau (anoniem)
                                                </div>
                                                <Rating rating={review.rating} showNumber={false} size={12} />
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                                                {review.tekst.substring(0, 100)}...
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    Je hebt nog geen reviews ontvangen.
                                </p>
                            )}

                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: '#f0f9ff',
                                borderRadius: '0.5rem',
                                textAlign: 'center',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                                    <Star size={20} fill="#f59e0b" color="#f59e0b" />
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                                        {currentBureau.rating.toFixed(1)}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
                                    Gemiddelde rating
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
