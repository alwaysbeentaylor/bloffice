'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Briefcase, Building2, User, Mail, Phone, Lock, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { specialisaties } from '@/lib/data';

export default function RegistreerPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        bedrijfsnaam: '',
        kvkNummer: '',
        btwNummer: '',
        contactpersoon: '',
        email: '',
        telefoon: '',
        wachtwoord: '',
        wachtwoordBevestig: '',
        selectedSpecialisaties: [] as string[],
    });

    const toggleSpecialisatie = (spec: string) => {
        setFormData(prev => ({
            ...prev,
            selectedSpecialisaties: prev.selectedSpecialisaties.includes(spec)
                ? prev.selectedSpecialisaties.filter(s => s !== spec)
                : [...prev.selectedSpecialisaties, spec],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In prototype: direct naar success state
        setStep(4);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f9fafb',
            padding: '2rem 1rem',
        }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link href="/" className="logo" style={{ justifyContent: 'center' }}>
                        <div className="logo-icon">
                            <Briefcase size={20} />
                        </div>
                        BureauLink
                    </Link>
                </div>

                {/* Progress Steps */}
                {step < 4 && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                    }}>
                        {[1, 2, 3].map(s => (
                            <div key={s} style={{
                                width: '80px',
                                height: '4px',
                                borderRadius: '2px',
                                background: s <= step ? '#1e3a5f' : '#e5e7eb',
                                transition: 'background 0.3s ease',
                            }} />
                        ))}
                    </div>
                )}

                {/* Form Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                }}>
                    {/* Step 1: Bedrijfsgegevens */}
                    {step === 1 && (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                                    Bedrijfsgegevens
                                </h2>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                    Vul de officiële gegevens van je uitzendbureau in
                                </p>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label className="label">Bedrijfsnaam</label>
                                    <div style={{ position: 'relative' }}>
                                        <Building2 size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Bijv. Flexwerk Uitzendbureau B.V."
                                            value={formData.bedrijfsnaam}
                                            onChange={(e) => setFormData({ ...formData, bedrijfsnaam: e.target.value })}
                                            style={{ paddingLeft: '2.75rem' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label className="label">KvK-nummer</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="12345678"
                                            value={formData.kvkNummer}
                                            onChange={(e) => setFormData({ ...formData, kvkNummer: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">BTW-nummer</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="NL123456789B01"
                                            value={formData.btwNummer}
                                            onChange={(e) => setFormData({ ...formData, btwNummer: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Volgende
                                    <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </button>
                            </form>
                        </>
                    )}

                    {/* Step 2: Contactgegevens */}
                    {step === 2 && (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                                    Contactgegevens
                                </h2>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                    Wie is de contactpersoon voor BureauLink?
                                </p>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label className="label">Contactpersoon</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Volledige naam"
                                            value={formData.contactpersoon}
                                            onChange={(e) => setFormData({ ...formData, contactpersoon: e.target.value })}
                                            style={{ paddingLeft: '2.75rem' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label className="label">E-mailadres</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="email"
                                            className="input"
                                            placeholder="naam@bedrijf.nl"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            style={{ paddingLeft: '2.75rem' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label className="label">Telefoonnummer</label>
                                    <div style={{ position: 'relative' }}>
                                        <Phone size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input
                                            type="tel"
                                            className="input"
                                            placeholder="020-1234567"
                                            value={formData.telefoon}
                                            onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                                            style={{ paddingLeft: '2.75rem' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label className="label">Wachtwoord</label>
                                        <div style={{ position: 'relative' }}>
                                            <Lock size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                            <input
                                                type="password"
                                                className="input"
                                                placeholder="••••••••"
                                                value={formData.wachtwoord}
                                                onChange={(e) => setFormData({ ...formData, wachtwoord: e.target.value })}
                                                style={{ paddingLeft: '2.75rem' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Bevestig wachtwoord</label>
                                        <div style={{ position: 'relative' }}>
                                            <Lock size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                            <input
                                                type="password"
                                                className="input"
                                                placeholder="••••••••"
                                                value={formData.wachtwoordBevestig}
                                                onChange={(e) => setFormData({ ...formData, wachtwoordBevestig: e.target.value })}
                                                style={{ paddingLeft: '2.75rem' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1 }}>
                                        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
                                        Terug
                                    </button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        Volgende
                                        <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {/* Step 3: Specialisaties */}
                    {step === 3 && (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                                    Specialisaties
                                </h2>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                    Selecteer de sectoren waarin jullie bureau gespecialiseerd is
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="checkbox-group" style={{ marginBottom: '1.5rem' }}>
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

                                <div style={{
                                    background: '#fef3c7',
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.9rem',
                                    color: '#92400e',
                                }}>
                                    ⏳ Na registratie wordt je bureau geverifieerd binnen 24 uur. Je ontvangt een e-mail zodra je account is goedgekeurd.
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button type="button" onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1 }}>
                                        <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
                                        Terug
                                    </button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        Registreren
                                        <Check size={18} style={{ marginLeft: '0.5rem' }} />
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {/* Step 4: Success */}
                    {step === 4 && (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
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
                                <Check size={32} color="white" />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                                Registratie ontvangen!
                            </h2>
                            <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
                                Bedankt voor je aanmelding. We verifiëren je bureau binnen 24 uur.
                                Je ontvangt een e-mail op <strong>{formData.email || 'je opgegeven adres'}</strong> zodra je account is goedgekeurd.
                            </p>
                            <Link href="/" className="btn btn-primary">
                                Terug naar home
                            </Link>
                        </div>
                    )}
                </div>

                {/* Login link */}
                {step < 4 && (
                    <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280' }}>
                        Al een account?{' '}
                        <Link href="/login" style={{ color: '#1e3a5f', fontWeight: '600', textDecoration: 'none' }}>
                            Log hier in
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
