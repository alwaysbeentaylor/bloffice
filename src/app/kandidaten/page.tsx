'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { MapPin, Clock, Building2, Filter, Plus, User, Euro, Calendar, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { kandidaten, specialisaties, locaties } from '@/lib/data';
import Rating from '@/components/Rating';

// Regios voor filter
const regios = ['Noord-Holland', 'Zuid-Holland', 'Utrecht', 'Noord-Brabant', 'Limburg', 'Gelderland', 'Overijssel', 'Friesland', 'Groningen', 'Drenthe', 'Zeeland', 'Flevoland'];

const ITEMS_PER_PAGE = 10;

export default function KandidatenPage() {
    // Filters
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedRegio, setSelectedRegio] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedBeschikbaarheid, setSelectedBeschikbaarheid] = useState('');
    const [selectedContractvorm, setSelectedContractvorm] = useState('');
    const [minErvaring, setMinErvaring] = useState('');
    const [maxReistijd, setMaxReistijd] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Filter and sort kandidaten
    const filteredKandidaten = useMemo(() => {
        let result = kandidaten.filter(k => {
            if (selectedSector && k.categorie !== selectedSector) return false;
            if (selectedRegio && k.regio !== selectedRegio) return false;
            if (selectedStatus && k.status !== selectedStatus) return false;
            if (selectedBeschikbaarheid && k.beschikbaarheid !== selectedBeschikbaarheid) return false;
            if (selectedContractvorm && k.contractvorm !== selectedContractvorm) return false;
            if (minErvaring && k.ervaringJaren < parseInt(minErvaring)) return false;
            if (maxReistijd && k.maxReistijd > parseInt(maxReistijd)) return false;
            return true;
        });

        // Sort by laatsteUpdate (most recent first)
        result.sort((a, b) => new Date(b.laatsteUpdate).getTime() - new Date(a.laatsteUpdate).getTime());

        return result;
    }, [selectedSector, selectedRegio, selectedStatus, selectedBeschikbaarheid, selectedContractvorm, minErvaring, maxReistijd]);

    // Pagination logic
    const totalPages = Math.ceil(filteredKandidaten.length / ITEMS_PER_PAGE);
    const paginatedKandidaten = filteredKandidaten.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset to page 1 when filters change
    const resetFilters = () => {
        setSelectedSector('');
        setSelectedRegio('');
        setSelectedStatus('');
        setSelectedBeschikbaarheid('');
        setSelectedContractvorm('');
        setMinErvaring('');
        setMaxReistijd('');
        setCurrentPage(1);
    };

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
                            <label className="filter-label">Status</label>
                            <select
                                className="input"
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Alle statussen</option>
                                <option value="beschikbaar">Beschikbaar</option>
                                <option value="in gesprek">In gesprek</option>
                                <option value="geplaatst">Geplaatst</option>
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Beschikbaarheid</label>
                            <select
                                className="input"
                                value={selectedBeschikbaarheid}
                                onChange={(e) => { setSelectedBeschikbaarheid(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Alle</option>
                                <option value="direct">Direct beschikbaar</option>
                                <option value="binnen 2 weken">Binnen 2 weken</option>
                                <option value="in overleg">In overleg</option>
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Sector</label>
                            <select
                                className="input"
                                value={selectedSector}
                                onChange={(e) => { setSelectedSector(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Alle sectoren</option>
                                {specialisaties.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Regio</label>
                            <select
                                className="input"
                                value={selectedRegio}
                                onChange={(e) => { setSelectedRegio(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Alle regio's</option>
                                {regios.map(regio => (
                                    <option key={regio} value={regio}>{regio}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Max reistijd (min)</label>
                            <select
                                className="input"
                                value={maxReistijd}
                                onChange={(e) => { setMaxReistijd(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Geen limiet</option>
                                <option value="15">Max 15 min</option>
                                <option value="30">Max 30 min</option>
                                <option value="45">Max 45 min</option>
                                <option value="60">Max 60 min</option>
                                <option value="90">Max 90 min</option>
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Min. ervaring (jaren)</label>
                            <select
                                className="input"
                                value={minErvaring}
                                onChange={(e) => { setMinErvaring(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Alle</option>
                                <option value="1">1+ jaar</option>
                                <option value="3">3+ jaar</option>
                                <option value="5">5+ jaar</option>
                                <option value="10">10+ jaar</option>
                            </select>
                        </div>

                        <div className="filter-section">
                            <label className="filter-label">Contractvorm</label>
                            <select
                                className="input"
                                value={selectedContractvorm}
                                onChange={(e) => { setSelectedContractvorm(e.target.value); setCurrentPage(1); }}
                            >
                                <option value="">Alle</option>
                                <option value="fulltime">Fulltime</option>
                                <option value="parttime">Parttime</option>
                                <option value="freelance">Freelance</option>
                                <option value="flexibel">Flexibel</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', marginTop: '1rem' }}
                            onClick={resetFilters}
                        >
                            Filters wissen
                        </button>
                    </aside>

                    {/* Kandidaten Grid */}
                    <main>
                        {/* Results info */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            color: '#6b7280'
                        }}>
                            <span>
                                Toont {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredKandidaten.length)} van {filteredKandidaten.length} kandidaten
                            </span>
                            <span>Gesorteerd op: meest recent bijgewerkt</span>
                        </div>

                        {paginatedKandidaten.length > 0 ? (
                            <>
                                <div className="grid-cards">
                                    {paginatedKandidaten.map(kandidaat => (
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
                                                    background: kandidaat.status === 'beschikbaar' ? '#d1fae5' : kandidaat.status === 'in gesprek' ? '#fef3c7' : '#e5e7eb',
                                                    color: kandidaat.status === 'beschikbaar' ? '#065f46' : kandidaat.status === 'in gesprek' ? '#92400e' : '#374151',
                                                }}>
                                                    {kandidaat.status === 'beschikbaar' ? 'Beschikbaar' : kandidaat.status === 'in gesprek' ? 'In gesprek' : 'Geplaatst'}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
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
                                                        {kandidaat.functie}
                                                    </h3>
                                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                                        {kandidaat.contractvorm.charAt(0).toUpperCase() + kandidaat.contractvorm.slice(1)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                color: '#6b7280',
                                                fontSize: '0.8rem',
                                                marginBottom: '0.75rem',
                                            }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <MapPin size={14} />
                                                    {kandidaat.regio}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Clock size={14} />
                                                    {kandidaat.ervaring}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Briefcase size={14} />
                                                    Max {kandidaat.maxReistijd} min
                                                </span>
                                            </div>

                                            {/* Gewenste functies */}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.75rem' }}>
                                                {kandidaat.gewensteFuncties.slice(0, 2).map((functie, idx) => (
                                                    <span key={idx} style={{
                                                        fontSize: '0.7rem',
                                                        padding: '0.2rem 0.5rem',
                                                        background: '#f3f4f6',
                                                        borderRadius: '0.25rem',
                                                        color: '#4b5563',
                                                    }}>
                                                        {functie}
                                                    </span>
                                                ))}
                                                {kandidaat.gewensteFuncties.length > 2 && (
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        padding: '0.2rem 0.5rem',
                                                        background: '#e5e7eb',
                                                        borderRadius: '0.25rem',
                                                        color: '#6b7280',
                                                    }}>
                                                        +{kandidaat.gewensteFuncties.length - 2}
                                                    </span>
                                                )}
                                            </div>

                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                background: '#f9fafb',
                                                borderRadius: '0.5rem',
                                                marginBottom: '0.75rem',
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                        Uurtarief
                                                    </div>
                                                    <div style={{ fontWeight: '600', color: '#1e3a5f', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                                                        <Euro size={14} />
                                                        {kandidaat.uurtarief}/uur
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                                        Commissie
                                                    </div>
                                                    <div style={{ fontWeight: '600', color: '#10b981', fontSize: '0.9rem' }}>
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
                                                        width: '28px',
                                                        height: '28px',
                                                        background: '#e5e7eb',
                                                        borderRadius: '0.375rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Building2 size={14} color="#6b7280" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1f2937' }}>
                                                            {kandidaat.bureauNaam}
                                                        </div>
                                                        <Rating rating={kandidaat.bureauRating} size={10} />
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                                                    <Calendar size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                                                    {new Date(kandidaat.laatsteUpdate).toLocaleDateString('nl-NL')}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginTop: '2rem',
                                    }}>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            style={{
                                                padding: '0.5rem',
                                                background: currentPage === 1 ? '#e5e7eb' : 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '0.375rem',
                                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                                opacity: currentPage === 1 ? 0.5 : 1,
                                            }}
                                        >
                                            <ChevronLeft size={20} />
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                style={{
                                                    padding: '0.5rem 0.875rem',
                                                    background: currentPage === page ? '#1e3a5f' : 'white',
                                                    color: currentPage === page ? 'white' : '#374151',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '0.375rem',
                                                    cursor: 'pointer',
                                                    fontWeight: currentPage === page ? '600' : '400',
                                                }}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            style={{
                                                padding: '0.5rem',
                                                background: currentPage === totalPages ? '#e5e7eb' : 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '0.375rem',
                                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                                opacity: currentPage === totalPages ? 0.5 : 1,
                                            }}
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                )}
                            </>
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
