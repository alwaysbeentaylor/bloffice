'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Settings, RotateCcw, Search, Briefcase } from 'lucide-react';
import { vacatures, specialisaties, locaties } from '@/lib/data';

const ITEMS_PER_PAGE = 10;

type SortField = 'geplaatst' | 'functietitel' | 'categorie' | 'locatie' | 'verwachteOpbrengst' | 'bureauRating';
type SortDirection = 'asc' | 'desc';

export default function VacaturesPage() {
    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Filters
    const [selectedSpecialisatie, setSelectedSpecialisatie] = useState('');
    const [selectedLocatie, setSelectedLocatie] = useState('');
    const [commissieRange, setCommissieRange] = useState('');

    // Sorting
    const [sortField, setSortField] = useState<SortField>('geplaatst');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Handle column header click for sorting
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
        setCurrentPage(1);
    };

    // Filter and sort vacatures
    const filteredVacatures = useMemo(() => {
        let result = vacatures.filter(v => {
            if (selectedSpecialisatie && v.categorie !== selectedSpecialisatie) return false;
            if (selectedLocatie && v.locatie !== selectedLocatie) return false;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesFunctie = v.functietitel.toLowerCase().includes(query);
                const matchesBeschrijving = v.beschrijving.toLowerCase().includes(query);
                const matchesCategorie = v.categorie.toLowerCase().includes(query);
                if (!matchesFunctie && !matchesBeschrijving && !matchesCategorie) return false;
            }
            return true;
        });

        // Sort
        result.sort((a, b) => {
            let compareValue = 0;
            switch (sortField) {
                case 'geplaatst':
                    compareValue = new Date(a.geplaatst).getTime() - new Date(b.geplaatst).getTime();
                    break;
                case 'functietitel':
                    compareValue = a.functietitel.localeCompare(b.functietitel);
                    break;
                case 'categorie':
                    compareValue = a.categorie.localeCompare(b.categorie);
                    break;
                case 'locatie':
                    compareValue = a.locatie.localeCompare(b.locatie);
                    break;
                case 'verwachteOpbrengst':
                    compareValue = a.verwachteOpbrengst - b.verwachteOpbrengst;
                    break;
                case 'bureauRating':
                    compareValue = a.bureauRating - b.bureauRating;
                    break;
            }
            return sortDirection === 'asc' ? compareValue : -compareValue;
        });

        return result;
    }, [selectedSpecialisatie, selectedLocatie, searchQuery, sortField, sortDirection]);

    // Pagination logic
    const totalPages = Math.ceil(filteredVacatures.length / ITEMS_PER_PAGE);
    const paginatedVacatures = filteredVacatures.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset filters
    const resetFilters = () => {
        setSelectedSpecialisatie('');
        setSelectedLocatie('');
        setCommissieRange('');
        setSearchQuery('');
        setCurrentPage(1);
    };

    // Sort indicator component
    const SortIndicator = ({ field }: { field: SortField }) => (
        <span className="sort-indicator">
            <ChevronUp size={12} className={sortField === field && sortDirection === 'asc' ? 'active' : ''} />
            <ChevronDown size={12} className={sortField === field && sortDirection === 'desc' ? 'active' : ''} />
        </span>
    );

    return (
        <div className="vacatures-table-page">
            <style jsx>{`
                .vacatures-table-page {
                    min-height: 100vh;
                    background: #f8fafc;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .page-header {
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                    padding: 1.25rem 2rem;
                }

                .header-content {
                    max-width: 1600px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .page-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0;
                }

                .header-actions {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }

                .btn-add {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #0ea5e9;
                    color: white;
                    border: none;
                    border-radius: 0.375rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.15s;
                }

                .btn-add:hover {
                    background: #0284c7;
                }

                .main-content {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 1.5rem 2rem;
                }

                /* Search Bar */
                .search-bar {
                    position: relative;
                    margin-bottom: 1rem;
                }

                .search-bar input {
                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 2.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    background: white;
                    outline: none;
                }

                .search-bar input:focus {
                    border-color: #0ea5e9;
                    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
                }

                .search-bar .search-icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                /* Filter Bar */
                .filter-bar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    align-items: center;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                }

                .filter-select {
                    padding: 0.5rem 2rem 0.5rem 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.8125rem;
                    background: white;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.5rem center;
                    background-size: 1rem;
                    cursor: pointer;
                    color: #334155;
                    min-width: 140px;
                }

                .filter-select:focus {
                    outline: none;
                    border-color: #0ea5e9;
                }

                .filter-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-left: auto;
                }

                .btn-reset {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.375rem;
                    padding: 0.5rem 0.75rem;
                    background: transparent;
                    color: #64748b;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.8125rem;
                    cursor: pointer;
                    transition: all 0.15s;
                }

                .btn-reset:hover {
                    background: #f1f5f9;
                    color: #334155;
                }

                /* Table Container */
                .table-container {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    overflow-y: visible;
                }

                .table-container::-webkit-scrollbar {
                    height: 8px;
                }

                .table-container::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }

                .table-container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }

                .table-container::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }

                .data-table {
                    width: 100%;
                    min-width: 1000px;
                    border-collapse: collapse;
                    font-size: 0.8125rem;
                }

                .data-table th {
                    background: #f8fafc;
                    border-bottom: 2px solid #e2e8f0;
                    padding: 0.75rem 1rem;
                    text-align: left;
                    font-weight: 600;
                    color: #334155;
                    white-space: nowrap;
                    cursor: pointer;
                    user-select: none;
                    transition: background 0.15s;
                }

                .data-table th:hover {
                    background: #f1f5f9;
                }

                .th-content {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                }

                .sort-indicator {
                    display: flex;
                    flex-direction: column;
                    line-height: 0;
                }

                .sort-indicator :global(svg) {
                    color: #cbd5e1;
                }

                .sort-indicator :global(svg.active) {
                    color: #0ea5e9;
                }

                .data-table td {
                    padding: 0.875rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                    color: #475569;
                    vertical-align: top;
                }

                .data-table tbody tr {
                    transition: background 0.15s;
                    cursor: pointer;
                }

                .data-table tbody tr:hover {
                    background: #f8fafc;
                }

                .data-table tbody tr:last-child td {
                    border-bottom: none;
                }

                /* Cell styles */
                .cell-date {
                    font-variant-numeric: tabular-nums;
                    color: #64748b;
                    white-space: nowrap;
                }

                .cell-status {
                    display: inline-block;
                    padding: 0.25rem 0.625rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    white-space: nowrap;
                }

                .status-actief {
                    background: #dcfce7;
                    color: #166534;
                }

                .status-inactief {
                    background: #e2e8f0;
                    color: #475569;
                }

                .cell-title {
                    max-width: 280px;
                }

                .title-main {
                    font-weight: 500;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }

                .title-summary {
                    color: #64748b;
                    font-size: 0.75rem;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .cell-sector {
                    white-space: nowrap;
                }

                .sector-tag {
                    display: inline-block;
                    padding: 0.125rem 0.5rem;
                    background: #f1f5f9;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    color: #475569;
                }

                .cell-locatie {
                    white-space: nowrap;
                }

                .cell-opbrengst {
                    font-variant-numeric: tabular-nums;
                    font-weight: 500;
                    color: #1e293b;
                    white-space: nowrap;
                }

                .cell-commissie {
                    white-space: nowrap;
                }

                .commissie-tag {
                    display: inline-block;
                    padding: 0.125rem 0.5rem;
                    background: #dcfce7;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: #166534;
                }

                .cell-rating {
                    white-space: nowrap;
                }

                .rating-display {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .rating-star {
                    color: #f59e0b;
                }

                .rating-value {
                    font-weight: 500;
                    color: #1e293b;
                }

                /* View button */
                .view-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    background: transparent;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.25rem;
                    color: #64748b;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.15s;
                }

                .view-btn:hover {
                    background: #f1f5f9;
                    color: #334155;
                    border-color: #cbd5e1;
                }

                /* Pagination */
                .pagination-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                }

                .pagination-info {
                    font-size: 0.8125rem;
                    color: #64748b;
                }

                .pagination-controls {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .pagination-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 2rem;
                    height: 2rem;
                    padding: 0 0.5rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.8125rem;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.15s;
                }

                .pagination-btn:hover:not(:disabled) {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                }

                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .pagination-btn.active {
                    background: #0ea5e9;
                    border-color: #0ea5e9;
                    color: white;
                }

                /* Empty state */
                .empty-state {
                    text-align: center;
                    padding: 3rem;
                    color: #64748b;
                }

                .empty-state h3 {
                    margin: 0 0 0.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                    color: #475569;
                }

                .empty-state p {
                    margin: 0;
                    font-size: 0.875rem;
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    .table-container {
                        overflow-x: auto;
                    }

                    .data-table {
                        min-width: 900px;
                    }
                }
            `}</style>

            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Vacatures aanbod</h1>
                    <div className="header-actions">
                        <Link href="/vacatures/nieuw" className="btn-add">
                            <Plus size={16} />
                            Nieuw
                        </Link>
                    </div>
                </div>
            </div>

            <div className="main-content">
                {/* Search Bar */}
                <div className="search-bar">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Trefwoorden..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                {/* Filter Bar */}
                <div className="filter-bar">
                    <select
                        className="filter-select"
                        value={selectedSpecialisatie}
                        onChange={(e) => { setSelectedSpecialisatie(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Sector...</option>
                        {specialisaties.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        value={selectedLocatie}
                        onChange={(e) => { setSelectedLocatie(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Locatie...</option>
                        {locaties.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        value={commissieRange}
                        onChange={(e) => { setCommissieRange(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Commissie...</option>
                        <option value="10-15">10% - 15%</option>
                        <option value="15-20">15% - 20%</option>
                        <option value="20+">20% en hoger</option>
                    </select>

                    <div className="filter-actions">
                        <button className="btn-reset" onClick={resetFilters}>
                            <RotateCcw size={14} />
                            Filters resetten
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="table-container">
                    {paginatedVacatures.length > 0 ? (
                        <>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('geplaatst')}>
                                            <div className="th-content">
                                                Geplaatst
                                                <SortIndicator field="geplaatst" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-content">
                                                Status
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('functietitel')}>
                                            <div className="th-content">
                                                Functietitel
                                                <SortIndicator field="functietitel" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('categorie')}>
                                            <div className="th-content">
                                                Sector
                                                <SortIndicator field="categorie" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('locatie')}>
                                            <div className="th-content">
                                                Locatie
                                                <SortIndicator field="locatie" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('verwachteOpbrengst')}>
                                            <div className="th-content">
                                                Verwachte opbrengst
                                                <SortIndicator field="verwachteOpbrengst" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-content">
                                                Commissie
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('bureauRating')}>
                                            <div className="th-content">
                                                Bureau rating
                                                <SortIndicator field="bureauRating" />
                                            </div>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedVacatures.map(vacature => (
                                        <tr key={vacature.id} onClick={() => window.location.href = `/vacatures/${vacature.id}`}>
                                            <td className="cell-date">
                                                {new Date(vacature.geplaatst).toLocaleDateString('nl-NL', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td>
                                                <span className={`cell-status ${vacature.actief ? 'status-actief' : 'status-inactief'}`}>
                                                    {vacature.actief ? 'Actief' : 'Inactief'}
                                                </span>
                                            </td>
                                            <td className="cell-title">
                                                <div className="title-main">{vacature.functietitel}</div>
                                                <div className="title-summary">
                                                    {vacature.beschrijving.split('\n')[0].substring(0, 100)}...
                                                </div>
                                            </td>
                                            <td className="cell-sector">
                                                <span className="sector-tag">{vacature.categorie}</span>
                                            </td>
                                            <td className="cell-locatie">{vacature.locatie}</td>
                                            <td className="cell-opbrengst">
                                                €{vacature.verwachteOpbrengst.toLocaleString('nl-NL')}/mnd
                                            </td>
                                            <td className="cell-commissie">
                                                <span className="commissie-tag">
                                                    {vacature.commissieVoorstel.split(' ')[0]}
                                                </span>
                                            </td>
                                            <td className="cell-rating">
                                                <div className="rating-display">
                                                    <span className="rating-star">★</span>
                                                    <span className="rating-value">{vacature.bureauRating.toFixed(1)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <Link href={`/vacatures/${vacature.id}`} className="view-btn" onClick={(e) => e.stopPropagation()}>
                                                    ⊙
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="pagination-bar">
                                <div className="pagination-info">
                                    Toont {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredVacatures.length)} van {filteredVacatures.length} vacatures
                                </div>
                                <div className="pagination-controls">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>

                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <Briefcase size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                            <h3>Geen vacatures gevonden</h3>
                            <p>Pas je filters of zoekopdracht aan om resultaten te zien</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
