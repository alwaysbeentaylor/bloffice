'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Euro, MapPin, Info } from 'lucide-react';
import { specialisaties, locaties } from '@/lib/data';

export default function NieuweVacaturePage() {
    const [formData, setFormData] = useState({
        functietitel: '',
        categorie: '',
        locatie: '',
        beschrijving: '',
        verwachteOpbrengst: '',
        commissieVoorstel: '',
        contactVoorkeur: 'beide',
    });
    const [showPreview, setShowPreview] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
                <div className="container" style={{ maxWidth: '600px', textAlign: 'center', paddingTop: '4rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem' }}>
                        Vacature geplaatst!
                    </h1>
                    <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
                        Je vacature &quot;{formData.functietitel}&quot; is succesvol geplaatst en is nu zichtbaar voor andere bureaus.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/vacatures" className="btn btn-primary">
                            Naar vacature overzicht
                        </Link>
                        <Link href="/dashboard" className="btn btn-outline">
                            Terug naar dashboard
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
                    <Link
                        href="/vacatures"
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
                    <h1>Nieuwe vacature plaatsen</h1>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
                {!showPreview ? (
                    <form onSubmit={(e) => { e.preventDefault(); setShowPreview(true); }}>
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                                Vacature gegevens
                            </h2>

                            <div style={{ display: 'grid', gap: '1.25rem' }}>
                                <div>
                                    <label className="label">Functietitel *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Bijv. Senior Java Developer"
                                        value={formData.functietitel}
                                        onChange={(e) => setFormData({ ...formData, functietitel: e.target.value })}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label className="label">Categorie *</label>
                                        <select
                                            className="input"
                                            value={formData.categorie}
                                            onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                                            required
                                        >
                                            <option value="">Selecteer categorie</option>
                                            {specialisaties.map(spec => (
                                                <option key={spec} value={spec}>{spec}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">Locatie *</label>
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

                                <div>
                                    <label className="label">Beschrijving *</label>
                                    <textarea
                                        className="input"
                                        placeholder="Beschrijf de functie, eisen en wat jullie bieden..."
                                        value={formData.beschrijving}
                                        onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
                                        rows={8}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                                Financiële gegevens
                            </h2>

                            <div style={{ display: 'grid', gap: '1.25rem' }}>
                                <div>
                                    <label className="label">Verwachte maandelijkse opbrengst (€) *</label>
                                    <div style={{ position: 'relative' }}>
                                        <Euro size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="number"
                                            className="input"
                                            placeholder="Bijv. 6000"
                                            value={formData.verwachteOpbrengst}
                                            onChange={(e) => setFormData({ ...formData, verwachteOpbrengst: e.target.value })}
                                            style={{ paddingLeft: '2.75rem' }}
                                            required
                                        />
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                        Dit is de verwachte maandelijkse facturatie aan de opdrachtgever
                                    </p>
                                </div>

                                <div>
                                    <label className="label">Commissie voorstel *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Bijv. 20% van eerste 3 maanden"
                                        value={formData.commissieVoorstel}
                                        onChange={(e) => setFormData({ ...formData, commissieVoorstel: e.target.value })}
                                        required
                                    />
                                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                        Beschrijf welke commissie je aanbiedt bij een succesvolle plaatsing
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.5rem' }}>
                                Contactvoorkeur
                            </h2>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {[
                                    { value: 'telefoon', label: 'Telefoon' },
                                    { value: 'email', label: 'E-mail' },
                                    { value: 'beide', label: 'Beide' },
                                ].map(option => (
                                    <label
                                        key={option.value}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.75rem 1rem',
                                            border: formData.contactVoorkeur === option.value ? '2px solid #1e3a5f' : '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            background: formData.contactVoorkeur === option.value ? 'rgba(30, 58, 95, 0.05)' : 'white',
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="contactVoorkeur"
                                            value={option.value}
                                            checked={formData.contactVoorkeur === option.value}
                                            onChange={(e) => setFormData({ ...formData, contactVoorkeur: e.target.value })}
                                            style={{ accentColor: '#1e3a5f' }}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <Link href="/vacatures" className="btn btn-outline">
                                Annuleren
                            </Link>
                            <button type="submit" className="btn btn-primary">
                                Bekijk preview
                            </button>
                        </div>
                    </form>
                ) : (
                    /* Preview */
                    <div>
                        <div style={{
                            background: '#fef3c7',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}>
                            <Info size={20} color="#92400e" />
                            <span style={{ color: '#92400e', fontSize: '0.9rem' }}>
                                Dit is een preview van je vacature. Controleer de gegevens voordat je plaatst.
                            </span>
                        </div>

                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <span className="badge badge-primary">{formData.categorie}</span>
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                                {formData.functietitel}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                                <MapPin size={16} />
                                {formData.locatie}
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f9fafb',
                                borderRadius: '0.5rem',
                                marginBottom: '1.5rem',
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        Verwachte opbrengst
                                    </div>
                                    <div style={{ fontWeight: '600', color: '#1e3a5f' }}>
                                        €{parseInt(formData.verwachteOpbrengst).toLocaleString('nl-NL')}/maand
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        Commissie
                                    </div>
                                    <div style={{ fontWeight: '600', color: '#10b981' }}>
                                        {formData.commissieVoorstel}
                                    </div>
                                </div>
                            </div>

                            <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Beschrijving</h3>
                            <div style={{ color: '#4b5563', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                                {formData.beschrijving || 'Geen beschrijving opgegeven'}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowPreview(false)} className="btn btn-outline">
                                Terug naar bewerken
                            </button>
                            <button onClick={handleSubmit} className="btn btn-primary">
                                Vacature plaatsen
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
