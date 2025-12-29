'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Settings, RotateCcw, Search } from 'lucide-react';
import { kandidaten, specialisaties } from '@/lib/data';

// Regios voor filter
const regios = ['Noord-Holland', 'Zuid-Holland', 'Utrecht', 'Noord-Brabant', 'Limburg', 'Gelderland', 'Overijssel', 'Friesland', 'Groningen', 'Drenthe', 'Zeeland', 'Flevoland'];

const ITEMS_PER_PAGE = 10;

type SortField = 'laatsteUpdate' | 'status' | 'beschikbaarPer' | 'categorie' | 'regio' | 'maxReistijd' | 'ervaringJaren' | 'contractvorm';
type SortDirection = 'asc' | 'desc';

export default function KandidatenPage() {
    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Filters
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedRegio, setSelectedRegio] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedBeschikbaarheid, setSelectedBeschikbaarheid] = useState('');
    const [selectedContractvorm, setSelectedContractvorm] = useState('');
    const [minErvaring, setMinErvaring] = useState('');
    const [maxReistijd, setMaxReistijd] = useState('');

    // Sorting
    const [sortField, setSortField] = useState<SortField>('laatsteUpdate');
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
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesFunctie = k.functie.toLowerCase().includes(query);
                const matchesSamenvatting = k.samenvatting.toLowerCase().includes(query);
                const matchesGewensteFuncties = k.gewensteFuncties.some(f => f.toLowerCase().includes(query));
                if (!matchesFunctie && !matchesSamenvatting && !matchesGewensteFuncties) return false;
            }
            return true;
        });

        // Sort
        result.sort((a, b) => {
            let compareValue = 0;
            switch (sortField) {
                case 'laatsteUpdate':
                    compareValue = new Date(a.laatsteUpdate).getTime() - new Date(b.laatsteUpdate).getTime();
                    break;
                case 'status':
                    compareValue = a.status.localeCompare(b.status);
                    break;
                case 'beschikbaarPer':
                    compareValue = new Date(a.beschikbaarPer).getTime() - new Date(b.beschikbaarPer).getTime();
                    break;
                case 'categorie':
                    compareValue = a.categorie.localeCompare(b.categorie);
                    break;
                case 'regio':
                    compareValue = a.regio.localeCompare(b.regio);
                    break;
                case 'maxReistijd':
                    compareValue = a.maxReistijd - b.maxReistijd;
                    break;
                case 'ervaringJaren':
                    compareValue = a.ervaringJaren - b.ervaringJaren;
                    break;
                case 'contractvorm':
                    compareValue = a.contractvorm.localeCompare(b.contractvorm);
                    break;
            }
            return sortDirection === 'asc' ? compareValue : -compareValue;
        });

        return result;
    }, [selectedSector, selectedRegio, selectedStatus, selectedBeschikbaarheid, selectedContractvorm, minErvaring, maxReistijd, searchQuery, sortField, sortDirection]);

    // Pagination logic
    const totalPages = Math.ceil(filteredKandidaten.length / ITEMS_PER_PAGE);
    const paginatedKandidaten = filteredKandidaten.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset filters
    const resetFilters = () => {
        setSelectedSector('');
        setSelectedRegio('');
        setSelectedStatus('');
        setSelectedBeschikbaarheid('');
        setSelectedContractvorm('');
        setMinErvaring('');
        setMaxReistijd('');
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

    // Get status display
    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'beschikbaar': return 'Open';
            case 'in gesprek': return 'In gesprek';
            case 'geplaatst': return 'Geplaatst';
            default: return status;
        }
    };

    return (
        <div className="kandidaten-table-page">
            <style jsx>{`
                .kandidaten-table-page {
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
                    min-width: 120px;
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

                .btn-settings {
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

                .btn-settings:hover {
                    background: #f1f5f9;
                    color: #334155;
                }

                /* Table Container */
                .table-container {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                .data-table {
                    width: 100%;
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

                .status-open {
                    background: #dcfce7;
                    color: #166534;
                }

                .status-in-gesprek {
                    background: #fef3c7;
                    color: #92400e;
                }

                .status-geplaatst {
                    background: #e2e8f0;
                    color: #475569;
                }

                .cell-description {
                    max-width: 250px;
                }

                .description-title {
                    font-weight: 500;
                    color: #1e293b;
                    margin-bottom: 0.25rem;
                }

                .description-summary {
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

                .cell-regio {
                    white-space: nowrap;
                }

                .cell-reistijd {
                    text-align: center;
                    font-variant-numeric: tabular-nums;
                }

                .cell-ervaring {
                    max-width: 200px;
                }

                .ervaring-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                }

                .ervaring-tag {
                    display: inline-block;
                    padding: 0.125rem 0.375rem;
                    background: #f1f5f9;
                    border-radius: 0.25rem;
                    font-size: 0.6875rem;
                    color: #475569;
                    white-space: nowrap;
                }

                .cell-functies {
                    max-width: 200px;
                }

                .functies-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                }

                .functie-tag {
                    display: inline-block;
                    padding: 0.125rem 0.375rem;
                    background: #f1f5f9;
                    border-radius: 0.25rem;
                    font-size: 0.6875rem;
                    color: #475569;
                    white-space: nowrap;
                }

                .cell-contract {
                    white-space: nowrap;
                }

                .contract-types {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                }

                .contract-tag {
                    display: inline-block;
                    padding: 0.125rem 0.375rem;
                    background: #e0f2fe;
                    border-radius: 0.25rem;
                    font-size: 0.6875rem;
                    color: #0369a1;
                    white-space: nowrap;
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
                        min-width: 1100px;
                    }
                }
            `}</style>

            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Kandidaten aanbod</h1>
                    <div className="header-actions">
                        <Link href="/kandidaten/nieuw" className="btn-add">
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
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Selectie...</option>
                        <option value="beschikbaar">Open</option>
                        <option value="in gesprek">In gesprek</option>
                        <option value="geplaatst">Geplaatst</option>
                    </select>

                    <select
                        className="filter-select"
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Status...</option>
                        <option value="beschikbaar">Beschikbaar</option>
                        <option value="in gesprek">In gesprek</option>
                        <option value="geplaatst">Geplaatst</option>
                    </select>

                    <select
                        className="filter-select"
                        value={selectedContractvorm}
                        onChange={(e) => { setSelectedContractvorm(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Contractvorm...</option>
                        <option value="fulltime">Fulltime</option>
                        <option value="parttime">Parttime</option>
                        <option value="freelance">Freelance</option>
                        <option value="flexibel">Flexibel</option>
                    </select>

                    <select
                        className="filter-select"
                        value={selectedSector}
                        onChange={(e) => { setSelectedSector(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Sector...</option>
                        {specialisaties.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        value={selectedRegio}
                        onChange={(e) => { setSelectedRegio(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Provincie...</option>
                        {regios.map(regio => (
                            <option key={regio} value={regio}>{regio}</option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        value={selectedRegio}
                        onChange={(e) => { setSelectedRegio(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Regio...</option>
                        {regios.map(regio => (
                            <option key={regio} value={regio}>{regio}</option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        value={minErvaring}
                        onChange={(e) => { setMinErvaring(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Ervaring...</option>
                        <option value="1">1+ jaar</option>
                        <option value="3">3+ jaar</option>
                        <option value="5">5+ jaar</option>
                        <option value="10">10+ jaar</option>
                    </select>

                    <select
                        className="filter-select"
                        value={selectedBeschikbaarheid}
                        onChange={(e) => { setSelectedBeschikbaarheid(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Gewenste functies...</option>
                        <option value="direct">Direct beschikbaar</option>
                        <option value="binnen 2 weken">Binnen 2 weken</option>
                        <option value="in overleg">In overleg</option>
                    </select>

                    <select
                        className="filter-select"
                        value={maxReistijd}
                        onChange={(e) => { setMaxReistijd(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Max reistijd (min)...</option>
                        <option value="15">Max 15 min</option>
                        <option value="30">Max 30 min</option>
                        <option value="45">Max 45 min</option>
                        <option value="60">Max 60 min</option>
                        <option value="90">Max 90 min</option>
                    </select>

                    <div className="filter-actions">
                        <button className="btn-settings">
                            <Settings size={14} />
                            Regios
                        </button>
                        <button className="btn-reset" onClick={resetFilters}>
                            <RotateCcw size={14} />
                            Kolommen aanpassen
                        </button>
                        <button className="btn-reset" onClick={resetFilters}>
                            Kolommen resetten
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="table-container">
                    {paginatedKandidaten.length > 0 ? (
                        <>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('laatsteUpdate')}>
                                            <div className="th-content">
                                                Laatste update
                                                <SortIndicator field="laatsteUpdate" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('status')}>
                                            <div className="th-content">
                                                Status
                                                <SortIndicator field="status" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('beschikbaarPer')}>
                                            <div className="th-content">
                                                Beschikbaar per
                                                <SortIndicator field="beschikbaarPer" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-content">
                                                Beschrijving kandidaat
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('categorie')}>
                                            <div className="th-content">
                                                Sector
                                                <SortIndicator field="categorie" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('regio')}>
                                            <div className="th-content">
                                                Regio
                                                <SortIndicator field="regio" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('maxReistijd')}>
                                            <div className="th-content">
                                                Max reistijd (min)
                                                <SortIndicator field="maxReistijd" />
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('ervaringJaren')}>
                                            <div className="th-content">
                                                Ervaring
                                                <SortIndicator field="ervaringJaren" />
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-content">
                                                Gewenste functies
                                            </div>
                                        </th>
                                        <th onClick={() => handleSort('contractvorm')}>
                                            <div className="th-content">
                                                Contractvorm
                                                <SortIndicator field="contractvorm" />
                                            </div>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedKandidaten.map(kandidaat => (
                                        <tr key={kandidaat.id} onClick={() => window.location.href = `/kandidaten/${kandidaat.id}`}>
                                            <td className="cell-date">
                                                {new Date(kandidaat.laatsteUpdate).toLocaleDateString('nl-NL', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }).replace(',', '')}
                                            </td>
                                            <td>
                                                <span className={`cell-status ${kandidaat.status === 'beschikbaar' ? 'status-open' : kandidaat.status === 'in gesprek' ? 'status-in-gesprek' : 'status-geplaatst'}`}>
                                                    {getStatusDisplay(kandidaat.status)}
                                                </span>
                                            </td>
                                            <td className="cell-date">
                                                {new Date(kandidaat.beschikbaarPer).toLocaleDateString('nl-NL', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="cell-description">
                                                <div className="description-title">{kandidaat.functie}</div>
                                                <div className="description-summary">
                                                    {kandidaat.samenvatting.split('\n')[0].substring(0, 120)}...
                                                </div>
                                            </td>
                                            <td className="cell-sector">{kandidaat.categorie}</td>
                                            <td className="cell-regio">{kandidaat.regio}</td>
                                            <td className="cell-reistijd">{kandidaat.maxReistijd}</td>
                                            <td className="cell-ervaring">
                                                <div className="ervaring-list">
                                                    <span className="ervaring-tag">{kandidaat.ervaring}</span>
                                                </div>
                                            </td>
                                            <td className="cell-functies">
                                                <div className="functies-list">
                                                    {kandidaat.gewensteFuncties.slice(0, 2).map((functie, idx) => (
                                                        <span key={idx} className="functie-tag">{functie}</span>
                                                    ))}
                                                    {kandidaat.gewensteFuncties.length > 2 && (
                                                        <span className="functie-tag">+{kandidaat.gewensteFuncties.length - 2}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="cell-contract">
                                                <div className="contract-types">
                                                    <span className="contract-tag">
                                                        {kandidaat.contractvorm.charAt(0).toUpperCase() + kandidaat.contractvorm.slice(1)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <Link href={`/kandidaten/${kandidaat.id}`} className="view-btn" onClick={(e) => e.stopPropagation()}>
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
                                    Toont {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredKandidaten.length)} van {filteredKandidaten.length} kandidaten
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
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <h3>Geen kandidaten gevonden</h3>
                            <p>Pas je filters of zoekopdracht aan om resultaten te zien</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
