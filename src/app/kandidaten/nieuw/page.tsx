'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, User } from 'lucide-react';
import { specialisaties, locaties } from '@/lib/data';

export default function NieuweKandidaatPage() {
    const [formData, setFormData] = useState({
        naam: '',
        functie: '',
        categorie: '',
        locatie: '',
        beschikbaarheid: 'direct',
        ervaring: '',
        samenvatting: '',
        uurtarief: '',
        commissieVoorstel: '',
        contactVoorkeur: 'beide',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
                <div className="container" style={{ padding: '4rem 1rem', maxWidth: '600px', textAlign: 'center' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#d1fae5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <User size={40} color="#059669" />
                    </div>
                    <h1 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Kandidaat geplaatst!</h1>
                    <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                        Je kandidaat is succesvol geplaatst op de marktplaats. Andere bureaus kunnen nu contact met je opnemen.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/kandidaten" className="btn btn-primary">
                            Bekijk alle kandidaten
                        </Link>
                        <Link href="/dashboard" className="btn btn-outline">
                            Naar dashboard
                        </Link>
                    </div>
                </div>
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
                    <h1>Nieuwe kandidaat plaatsen</h1>
                    <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                        Deel een beschikbare kandidaat met andere uitzendbureaus
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
                <form onSubmit={handleSubmit}>
                    {/* Kandidaat Info */}
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                            Kandidaat informatie
                        </h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label className="label">Naam kandidaat *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Volledige naam"
                                        value={formData.naam}
                                        onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="label">Functie / Rol *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="bijv. Full Stack Developer"
                                        value={formData.functie}
                                        onChange={(e) => setFormData({ ...formData, functie: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label className="label">Specialisatie *</label>
                                    <select
                                        className="input"
                                        value={formData.categorie}
                                        onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                                        required
                                    >
                                        <option value="">Selecteer specialisatie</option>
                                        {specialisaties.map(spec => (
                                            <option key={spec} value={spec}>{spec}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Locatie / Regio *</label>
                                    <select
                                        className="input"
                                        value={formData.locatie}
                                        onChange={(e) => setFormData({ ...formData, locatie: e.target.value })}
                                        required
                                    >
                                        <option value="">Selecteer locatie</option>
                                        {locaties.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label className="label">Beschikbaarheid *</label>
                                    <select
                                        className="input"
                                        value={formData.beschikbaarheid}
                                        onChange={(e) => setFormData({ ...formData, beschikbaarheid: e.target.value })}
                                        required
                                    >
                                        <option value="direct">Direct beschikbaar</option>
                                        <option value="binnen 2 weken">Binnen 2 weken</option>
                                        <option value="in overleg">In overleg</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Werkervaring *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="bijv. 5 jaar"
                                        value={formData.ervaring}
                                        onChange={(e) => setFormData({ ...formData, ervaring: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="label">Profiel omschrijving *</label>
                                <textarea
                                    className="input"
                                    rows={6}
                                    placeholder="Beschrijf de kandidaat, zijn/haar kwalificaties, ervaring en sterke punten..."
                                    value={formData.samenvatting}
                                    onChange={(e) => setFormData({ ...formData, samenvatting: e.target.value })}
                                    required
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Commissie */}
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                            Tarieven & Commissie
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="label">Uurtarief (€) *</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="bijv. 65"
                                    value={formData.uurtarief}
                                    onChange={(e) => setFormData({ ...formData, uurtarief: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Commissie voorstel *</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="bijv. 15% van eerste 3 maanden"
                                    value={formData.commissieVoorstel}
                                    onChange={(e) => setFormData({ ...formData, commissieVoorstel: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.75rem' }}>
                            Tip: Gangbare commissies liggen tussen 10% en 25% van de eerste 2-3 maanden facturatie.
                        </p>
                    </div>

                    {/* Contact voorkeuren */}
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                            Contact voorkeuren
                        </h2>
                        <div className="radio-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {[
                                { value: 'telefoon', label: 'Telefoon' },
                                { value: 'email', label: 'E-mail' },
                                { value: 'beide', label: 'Telefoon & E-mail' },
                            ].map(option => (
                                <label key={option.value} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem',
                                    background: formData.contactVoorkeur === option.value ? 'rgba(30, 58, 95, 0.1)' : '#f9fafb',
                                    border: formData.contactVoorkeur === option.value ? '1px solid #1e3a5f' : '1px solid #e5e7eb',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                }}>
                                    <input
                                        type="radio"
                                        name="contactVoorkeur"
                                        value={option.value}
                                        checked={formData.contactVoorkeur === option.value}
                                        onChange={(e) => setFormData({ ...formData, contactVoorkeur: e.target.value })}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <Link href="/kandidaten" className="btn btn-outline">
                            Annuleren
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} style={{ marginRight: '0.5rem' }} />
                            Kandidaat plaatsen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
