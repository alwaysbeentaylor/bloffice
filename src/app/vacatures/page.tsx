'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Euro, Building2, Filter, Plus } from 'lucide-react';
import { vacatures, specialisaties, locaties } from '@/lib/data';
import Rating from '@/components/Rating';

export default function VacaturesPage() {
    const [selectedSpecialisatie, setSelectedSpecialisatie] = useState('');
    const [selectedLocatie, setSelectedLocatie] = useState('');
    const [commissieRange, setCommissieRange] = useState('');

    const filteredVacatures = vacatures.filter(v => {
        if (selectedSpecialisatie && v.categorie !== selectedSpecialisatie) return false;
        if (selectedLocatie && v.locatie !== selectedLocatie) return false;
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
                        <h1>Vacature Marktplaats</h1>
                        <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                            {filteredVacatures.length} vacatures beschikbaar
                        </p>
                    </div>
                    <Link href="/vacatures/nieuw" className="btn btn-primary">
                        <Plus size={18} style={{ marginRight: '0.5rem' }} />
                        Nieuwe vacature
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
                            <label className="filter-label">Commissie range</label>
                            <select
                                className="input"
                                value={commissieRange}
                                onChange={(e) => setCommissieRange(e.target.value)}
                            >
                                <option value="">Alle commissies</option>
                                <option value="10-15">10% - 15%</option>
                                <option value="15-20">15% - 20%</option>
                                <option value="20+">20% en hoger</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', marginTop: '1rem' }}
                            onClick={() => {
                                setSelectedSpecialisatie('');
                                setSelectedLocatie('');
                                setCommissieRange('');
                            }}
                        >
                            Filters wissen
                        </button>
                    </aside>

                    {/* Vacature Grid */}
                    <main>
                        {filteredVacatures.length > 0 ? (
                            <div className="grid-cards">
                                {filteredVacatures.map(vacature => (
                                    <Link
                                        key={vacature.id}
                                        href={`/vacatures/${vacature.id}`}
                                        className="card"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                            <span className="badge badge-primary">{vacature.categorie}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                                {new Date(vacature.geplaatst).toLocaleDateString('nl-NL')}
                                            </span>
                                        </div>

                                        <h3 style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            marginBottom: '0.5rem',
                                        }}>
                                            {vacature.functietitel}
                                        </h3>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: '#6b7280',
                                            fontSize: '0.875rem',
                                            marginBottom: '1rem',
                                        }}>
                                            <MapPin size={16} />
                                            {vacature.locatie}
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
                                                    Verwachte opbrengst
                                                </div>
                                                <div style={{ fontWeight: '600', color: '#1e3a5f', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Euro size={14} />
                                                    {vacature.verwachteOpbrengst.toLocaleString('nl-NL')}/maand
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                    Commissie
                                                </div>
                                                <div style={{ fontWeight: '600', color: '#10b981' }}>
                                                    {vacature.commissieVoorstel.split(' ')[0]}
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
                                                        {vacature.bureauNaam}
                                                    </div>
                                                    <Rating rating={vacature.bureauRating} size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <Briefcase size={48} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                                <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Geen vacatures gevonden</h3>
                                <p style={{ color: '#9ca3af' }}>Pas je filters aan om meer resultaten te zien</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
