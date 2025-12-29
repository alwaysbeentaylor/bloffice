'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Building2, CheckCircle, Filter } from 'lucide-react';
import { bureaus, specialisaties } from '@/lib/data';
import Rating from '@/components/Rating';

export default function BureausPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialisatie, setSelectedSpecialisatie] = useState('');

    const filteredBureaus = bureaus.filter(bureau => {
        const matchesSearch = bureau.naam.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bureau.specialisaties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSpec = !selectedSpecialisatie || bureau.specialisaties.includes(selectedSpecialisatie as never);
        return matchesSearch && matchesSpec;
    });

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <h1>Bureau Overzicht</h1>
                    <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
                        Ontdek en verbind met {bureaus.length} geverifieerde uitzendbureaus
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                {/* Search & Filter */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '0.875rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9ca3af',
                        }} />
                        <input
                            type="text"
                            className="input"
                            placeholder="Zoek op naam of specialisatie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ paddingLeft: '2.75rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} color="#6b7280" />
                        <select
                            className="input"
                            value={selectedSpecialisatie}
                            onChange={(e) => setSelectedSpecialisatie(e.target.value)}
                            style={{ width: '200px' }}
                        >
                            <option value="">Alle specialisaties</option>
                            {specialisaties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    {filteredBureaus.length} bureaus gevonden
                </p>

                {/* Bureaus Grid */}
                {filteredBureaus.length > 0 ? (
                    <div className="grid-cards">
                        {filteredBureaus.map(bureau => (
                            <Link
                                key={bureau.id}
                                href={`/bureaus/${bureau.id}`}
                                className="card"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        background: '#e5e7eb',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Building2 size={28} color="#6b7280" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: '#1f2937',
                                            marginBottom: '0.25rem',
                                        }}>
                                            {bureau.naam}
                                        </h3>
                                        {bureau.geverifieerd && (
                                            <span className="verified-badge">
                                                <CheckCircle size={14} />
                                                Geverifieerd
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {bureau.specialisaties.slice(0, 3).map(spec => (
                                        <span key={spec} className="badge">{spec}</span>
                                    ))}
                                    {bureau.specialisaties.length > 3 && (
                                        <span className="badge" style={{ background: '#e5e7eb' }}>
                                            +{bureau.specialisaties.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid #e5e7eb',
                                }}>
                                    <div>
                                        <Rating rating={bureau.rating} size={14} />
                                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: '0.5rem' }}>
                                            ({bureau.aantalReviews} reviews)
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.875rem',
                                        color: '#1e3a5f',
                                        fontWeight: '500',
                                    }}>
                                        Bekijk profiel →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <Building2 size={48} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
                        <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Geen bureaus gevonden</h3>
                        <p style={{ color: '#9ca3af' }}>Pas je zoekopdracht of filters aan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
