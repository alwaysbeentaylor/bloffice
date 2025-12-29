'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Clock, Building2, Filter, Plus, User, Euro } from 'lucide-react';
import { kandidaten, specialisaties, locaties } from '@/lib/data';
import Rating from '@/components/Rating';

export default function KandidatenPage() {
    const [selectedSpecialisatie, setSelectedSpecialisatie] = useState('');
    const [selectedLocatie, setSelectedLocatie] = useState('');
    const [selectedBeschikbaarheid, setSelectedBeschikbaarheid] = useState('');

    const filteredKandidaten = kandidaten.filter(k => {
        if (selectedSpecialisatie && k.categorie !== selectedSpecialisatie) return false;
        if (selectedLocatie && k.locatie !== selectedLocatie) return false;
        if (selectedBeschikbaarheid && k.beschikbaarheid !== selectedBeschikbaarheid) return false;
        return true;
    });

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <div>
                        <h1>Kandidaat Marktplaats</h1>
                        <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                            {filteredKandidaten.length} kandidaten beschikbaar
                        </p>
                    </div>
                    <Link href="/kandidaten/nieuw" className="btn btn-primary">
                        <Plus size={18} style={{ marginRight: '0.5rem' }} />
                        Nieuwe kandidaat
                    </Link>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div className="layout-with-sidebar">
                    {/* Filter Sidebar */}
                    <aside className="filter-sidebar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <Filter size={20} color="#1e3a5f" />
                            <h3 className="filter-title" style={{ margin: 0 }}>Filters</h3>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Specialisatie</label>
                            <select
                                className="input"
                                value={selectedSpecialisatie}
                                onChange={(e) => setSelectedSpecialisatie(e.target.value)}
                            >
                                <option value="">Alle specialisaties</option>
                                {specialisaties.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Locatie</label>
                            <select
                                className="input"
                                value={selectedLocatie}
                                onChange={(e) => setSelectedLocatie(e.target.value)}
                            >
                                <option value="">Alle locaties</option>
                                {locaties.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Beschikbaarheid</label>
                            <select
                                className="input"
                                value={selectedBeschikbaarheid}
                                onChange={(e) => setSelectedBeschikbaarheid(e.target.value)}
                            >
                                <option value="">Alle beschikbaarheden</option>
                                <option value="direct">Direct beschikbaar</option>
                                <option value="binnen 2 weken">Binnen 2 weken</option>
                                <option value="in overleg">In overleg</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', marginTop: '1rem' }}
                            onClick={() => {
                                setSelectedSpecialisatie('');
                                setSelectedLocatie('');
                                setSelectedBeschikbaarheid('');
                            }}
                        >
                            Filters wissen
                        </button>
                    </aside>

                    {/* Kandidaten Grid */}
                    <main>
                        {filteredKandidaten.length > 0 ? (
                            <div className="grid-cards">
                                {filteredKandidaten.map(kandidaat => (
                                    <Link
                                        key={kandidaat.id}
                                        href={`/kandidaten/${kandidaat.id}`}
                                        className="card"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <span className="badge badge-primary">{kandidaat.categorie}</span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.25rem',
                                                background: kandidaat.beschikbaarheid === 'direct' ? '#d1fae5' : kandidaat.beschikbaarheid === 'binnen 2 weken' ? '#fef3c7' : '#e5e7eb',
                                                color: kandidaat.beschikbaarheid === 'direct' ? '#065f46' : kandidaat.beschikbaarheid === 'binnen 2 weken' ? '#92400e' : '#374151',
                                            }}>
                                                {kandidaat.beschikbaarheid === 'direct' ? 'Direct' : kandidaat.beschikbaarheid}
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <div style={{
                                                width: '48px',
                                                height: '48px',
                                                background: '#e5e7eb',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <User size={24} color="#6b7280" />
                                            </div>
                                            <div>
                                                <h3 style={{
                                                    fontSize: '1.125rem',
                                                    fontWeight: '600',
                                                    color: '#1f2937',
                                                    marginBottom: '0.125rem',
                                                }}>
                                                    {kandidaat.naam}
                                                </h3>
                                                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                                    {kandidaat.functie}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            color: '#6b7280',
                                            fontSize: '0.875rem',
                                            marginBottom: '1rem',
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <MapPin size={14} />
                                                {kandidaat.locatie}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Clock size={14} />
                                                {kandidaat.ervaring}
                                            </span>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '0.75rem',
                                            padding: '0.75rem',
                                            background: '#f9fafb',
                                            borderRadius: '0.5rem',
                                            marginBottom: '1rem',
                                        }}>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    Uurtarief
                                                </div>
                                                <div style={{ fontWeight: '600', color: '#1e3a5f', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Euro size={14} />
                                                    {kandidaat.uurtarief}/uur
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    Commissie
                                                </div>
                                                <div style={{ fontWeight: '600', color: '#10b981' }}>
                                                    {kandidaat.commissieVoorstel.split(' ')[0]}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingTop: '0.75rem',
                                            borderTop: '1px solid #e5e7eb',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    background: '#e5e7eb',
                                                    borderRadius: '0.375rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Building2 size={16} color="#6b7280" />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                                                        {kandidaat.bureauNaam}
                                                    </div>
                                                    <Rating rating={kandidaat.bureauRating} size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <User size={48} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                                <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Geen kandidaten gevonden</h3>
                                <p style={{ color: '#9ca3af' }}>Pas je filters aan om meer resultaten te zien</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
