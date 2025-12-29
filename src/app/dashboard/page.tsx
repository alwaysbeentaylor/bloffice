'use client';

import Link from 'next/link';
import { Briefcase, MessageSquare, Handshake, Plus, TrendingUp, User, ChevronRight, Calendar } from 'lucide-react';
import { currentBureau, getVacaturesByBureauId, getKandidatenByBureauId } from '@/lib/data';

export default function DashboardPage() {
    const myVacatures = getVacaturesByBureauId(currentBureau.id);
    const myKandidaten = getKandidatenByBureauId(currentBureau.id);

    return (
        <div className="dashboard-page">
            <style jsx>{`
                .dashboard-page {
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
                }

                .page-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0 0 0.25rem;
                }

                .page-subtitle {
                    font-size: 0.875rem;
                    color: #64748b;
                    margin: 0;
                }

                .main-content {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 1.5rem 2rem;
                }

                /* Stats Bar */
                .stats-bar {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .stat-item {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    padding: 1rem 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .stat-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-icon.vacatures {
                    background: rgba(30, 58, 95, 0.1);
                    color: #1e3a5f;
                }

                .stat-icon.kandidaten {
                    background: rgba(59, 130, 246, 0.1);
                    color: #3b82f6;
                }

                .stat-icon.reacties {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                }

                .stat-icon.samenwerkingen {
                    background: rgba(245, 158, 11, 0.1);
                    color: #f59e0b;
                }

                .stat-icon.commissies {
                    background: rgba(139, 92, 246, 0.1);
                    color: #8b5cf6;
                }

                .stat-content {
                    flex: 1;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: #64748b;
                    margin-top: 0.25rem;
                }

                /* Quick Actions */
                .quick-actions {
                    display: flex;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .quick-action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.625rem 1rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: #334155;
                    text-decoration: none;
                    transition: all 0.15s;
                }

                .quick-action-btn:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                }

                .quick-action-btn.primary {
                    background: #0ea5e9;
                    border-color: #0ea5e9;
                    color: white;
                }

                .quick-action-btn.primary:hover {
                    background: #0284c7;
                    border-color: #0284c7;
                }

                /* Content Grid */
                .content-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                /* Table Card */
                .table-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                .table-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f8fafc;
                }

                .table-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0;
                }

                .table-link {
                    font-size: 0.75rem;
                    color: #0ea5e9;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .table-link:hover {
                    text-decoration: underline;
                }

                .mini-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.8125rem;
                }

                .mini-table th {
                    background: #f8fafc;
                    padding: 0.625rem 1rem;
                    text-align: left;
                    font-weight: 600;
                    color: #64748b;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                    border-bottom: 1px solid #e2e8f0;
                }

                .mini-table td {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                    color: #475569;
                }

                .mini-table tbody tr {
                    transition: background 0.15s;
                    cursor: pointer;
                }

                .mini-table tbody tr:hover {
                    background: #f8fafc;
                }

                .mini-table tbody tr:last-child td {
                    border-bottom: none;
                }

                .cell-title {
                    font-weight: 500;
                    color: #1e293b;
                }

                .cell-subtitle {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .cell-date {
                    font-variant-numeric: tabular-nums;
                    color: #64748b;
                    font-size: 0.75rem;
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.125rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.6875rem;
                    font-weight: 500;
                }

                .status-actief {
                    background: #dcfce7;
                    color: #166534;
                }

                .status-beschikbaar {
                    background: #dcfce7;
                    color: #166534;
                }

                .empty-row {
                    text-align: center;
                    padding: 2rem 1rem;
                    color: #64748b;
                    font-size: 0.8125rem;
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    .stats-bar {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                @media (max-width: 900px) {
                    .stats-bar {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .content-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 600px) {
                    .stats-bar {
                        grid-template-columns: 1fr;
                    }

                    .quick-actions {
                        flex-wrap: wrap;
                    }
                }
            `}</style>

            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Welkom terug, {currentBureau.naam}</p>
                </div>
            </div>

            <div className="main-content">
                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-item">
                        <div className="stat-icon vacatures">
                            <Briefcase size={20} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{currentBureau.aantalVacatures}</div>
                            <div className="stat-label">Actieve vacatures</div>
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-icon kandidaten">
                            <User size={20} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{myKandidaten.length}</div>
                            <div className="stat-label">Actieve kandidaten</div>
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-icon reacties">
                            <MessageSquare size={20} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">12</div>
                            <div className="stat-label">Reacties ontvangen</div>
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-icon samenwerkingen">
                            <Handshake size={20} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{currentBureau.aantalSamenwerkingen}</div>
                            <div className="stat-label">Samenwerkingen</div>
                        </div>
                    </div>

                    <div className="stat-item">
                        <div className="stat-icon commissies">
                            <TrendingUp size={20} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">€24.5K</div>
                            <div className="stat-label">Verdiende commissies</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <Link href="/vacatures/nieuw" className="quick-action-btn primary">
                        <Plus size={16} />
                        Nieuwe vacature
                    </Link>
                    <Link href="/kandidaten/nieuw" className="quick-action-btn primary">
                        <Plus size={16} />
                        Nieuwe kandidaat
                    </Link>
                    <Link href="/vacatures" className="quick-action-btn">
                        <Briefcase size={16} />
                        Vacatures bekijken
                    </Link>
                    <Link href="/kandidaten" className="quick-action-btn">
                        <User size={16} />
                        Kandidaten bekijken
                    </Link>
                </div>

                {/* Content Grid */}
                <div className="content-grid">
                    {/* My Vacatures Table */}
                    <div className="table-card">
                        <div className="table-header">
                            <h2 className="table-title">Mijn vacatures</h2>
                            <Link href="/profiel" className="table-link">
                                Bekijk alles
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                        {myVacatures.length > 0 ? (
                            <table className="mini-table">
                                <thead>
                                    <tr>
                                        <th>Functie</th>
                                        <th>Locatie</th>
                                        <th>Geplaatst</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myVacatures.slice(0, 5).map(v => (
                                        <tr key={v.id} onClick={() => window.location.href = `/vacatures/${v.id}`}>
                                            <td>
                                                <div className="cell-title">{v.functietitel}</div>
                                                <div className="cell-subtitle">{v.categorie}</div>
                                            </td>
                                            <td>{v.locatie}</td>
                                            <td className="cell-date">
                                                {new Date(v.geplaatst).toLocaleDateString('nl-NL', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: '2-digit'
                                                })}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${v.actief ? 'status-actief' : ''}`}>
                                                    {v.actief ? 'Actief' : 'Inactief'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-row">
                                Geen vacatures gevonden
                            </div>
                        )}
                    </div>

                    {/* My Kandidaten Table */}
                    <div className="table-card">
                        <div className="table-header">
                            <h2 className="table-title">Mijn kandidaten</h2>
                            <Link href="/profiel" className="table-link">
                                Bekijk alles
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                        {myKandidaten.length > 0 ? (
                            <table className="mini-table">
                                <thead>
                                    <tr>
                                        <th>Functie</th>
                                        <th>Regio</th>
                                        <th>Bijgewerkt</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myKandidaten.slice(0, 5).map(k => (
                                        <tr key={k.id} onClick={() => window.location.href = `/kandidaten/${k.id}`}>
                                            <td>
                                                <div className="cell-title">{k.functie}</div>
                                                <div className="cell-subtitle">{k.categorie}</div>
                                            </td>
                                            <td>{k.regio}</td>
                                            <td className="cell-date">
                                                {new Date(k.laatsteUpdate).toLocaleDateString('nl-NL', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: '2-digit'
                                                })}
                                            </td>
                                            <td>
                                                <span className={`status-badge status-beschikbaar`}>
                                                    {k.status === 'beschikbaar' ? 'Beschikbaar' : k.status === 'in gesprek' ? 'In gesprek' : 'Geplaatst'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-row">
                                Geen kandidaten gevonden
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
