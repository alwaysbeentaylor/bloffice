'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Upload, Mail, Phone, Save, Star, User, ChevronRight, Check } from 'lucide-react';
import { currentBureau, getVacaturesByBureauId, getReviewsByBureauId, getKandidatenByBureauId, specialisaties } from '@/lib/data';

export default function ProfielPage() {
    const [formData, setFormData] = useState({
        bedrijfsnaam: currentBureau.naam,
        contactpersoon: currentBureau.contactpersoon,
        email: currentBureau.email,
        telefoon: currentBureau.telefoon,
        selectedSpecialisaties: currentBureau.specialisaties as string[],
    });
    const [saved, setSaved] = useState(false);

    const myVacatures = getVacaturesByBureauId(currentBureau.id);
    const myReviews = getReviewsByBureauId(currentBureau.id);
    const myKandidaten = getKandidatenByBureauId(currentBureau.id);

    const toggleSpecialisatie = (spec: string) => {
        setFormData(prev => ({
            ...prev,
            selectedSpecialisaties: prev.selectedSpecialisaties.includes(spec)
                ? prev.selectedSpecialisaties.filter(s => s !== spec)
                : [...prev.selectedSpecialisaties, spec],
        }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="profiel-page">
            <style jsx>{`
                .profiel-page {
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

                .btn-save {
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
                    transition: background 0.15s;
                }

                .btn-save:hover {
                    background: #0284c7;
                }

                .btn-save.saved {
                    background: #10b981;
                }

                .main-content {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 1.5rem 2rem;
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 1.5rem;
                }

                /* Form Card */
                .form-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                .card-header {
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f8fafc;
                }

                .card-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0;
                }

                .card-body {
                    padding: 1.25rem;
                }

                /* Form Table */
                .form-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .form-table tr {
                    border-bottom: 1px solid #e2e8f0;
                }

                .form-table tr:last-child {
                    border-bottom: none;
                }

                .form-table th {
                    text-align: left;
                    padding: 0.875rem 1rem;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: #64748b;
                    background: #f8fafc;
                    width: 180px;
                    vertical-align: middle;
                }

                .form-table td {
                    padding: 0.625rem 1rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.8125rem;
                    outline: none;
                    transition: border-color 0.15s;
                }

                .form-input:focus {
                    border-color: #0ea5e9;
                    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
                }

                .input-with-icon {
                    position: relative;
                }

                .input-with-icon .icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                .input-with-icon input {
                    padding-left: 2.25rem;
                }

                /* Logo Upload */
                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo-placeholder {
                    width: 60px;
                    height: 60px;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                }

                .btn-upload {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.375rem;
                    padding: 0.375rem 0.75rem;
                    background: white;
                    color: #64748b;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.75rem;
                    cursor: pointer;
                    transition: all 0.15s;
                }

                .btn-upload:hover {
                    background: #f8fafc;
                    color: #334155;
                }

                /* Specialisaties */
                .spec-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .spec-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.25rem;
                    padding: 0.375rem 0.75rem;
                    background: #f1f5f9;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.375rem;
                    font-size: 0.75rem;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.15s;
                }

                .spec-tag:hover {
                    background: #e2e8f0;
                }

                .spec-tag.selected {
                    background: #0ea5e9;
                    border-color: #0ea5e9;
                    color: white;
                }

                .spec-tag .check {
                    width: 14px;
                    height: 14px;
                }

                /* Sidebar */
                .sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                /* Mini Table Card */
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
                    padding: 0.875rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f8fafc;
                }

                .table-title {
                    font-size: 0.8125rem;
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
                    gap: 0.125rem;
                }

                .table-link:hover {
                    text-decoration: underline;
                }

                .mini-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.75rem;
                }

                .mini-table td {
                    padding: 0.625rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                    color: #475569;
                }

                .mini-table tr {
                    transition: background 0.15s;
                    cursor: pointer;
                }

                .mini-table tr:hover {
                    background: #f8fafc;
                }

                .mini-table tr:last-child td {
                    border-bottom: none;
                }

                .item-title {
                    font-weight: 500;
                    color: #1e293b;
                    font-size: 0.8125rem;
                }

                .item-subtitle {
                    color: #64748b;
                    font-size: 0.6875rem;
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                    font-size: 0.625rem;
                    font-weight: 500;
                    background: #dcfce7;
                    color: #166534;
                }

                .empty-message {
                    padding: 1.5rem 1rem;
                    text-align: center;
                    color: #64748b;
                    font-size: 0.8125rem;
                }

                /* Rating Card */
                .rating-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    padding: 1.25rem;
                    text-align: center;
                }

                .rating-value {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .rating-star {
                    color: #f59e0b;
                }

                .rating-number {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1e293b;
                }

                .rating-label {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .reviews-count {
                    font-size: 0.6875rem;
                    color: #94a3b8;
                    margin-top: 0.25rem;
                }

                /* Reviews List */
                .review-item {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }

                .review-item:last-child {
                    border-bottom: none;
                }

                .review-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.375rem;
                }

                .review-author {
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: #1e293b;
                }

                .review-rating {
                    display: flex;
                    gap: 0.125rem;
                }

                .review-rating .star {
                    color: #f59e0b;
                    font-size: 0.625rem;
                }

                .review-text {
                    font-size: 0.6875rem;
                    color: #64748b;
                    line-height: 1.4;
                }

                /* Responsive */
                @media (max-width: 1100px) {
                    .main-content {
                        grid-template-columns: 1fr;
                    }

                    .sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 700px) {
                    .sidebar {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Mijn Profiel</h1>
                    <div className="header-actions">
                        <button onClick={handleSave} className={`btn-save ${saved ? 'saved' : ''}`}>
                            {saved ? <Check size={16} /> : <Save size={16} />}
                            {saved ? 'Opgeslagen' : 'Opslaan'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-content">
                {/* Main Form */}
                <div>
                    {/* Company Details */}
                    <div className="form-card" style={{ marginBottom: '1rem' }}>
                        <div className="card-header">
                            <h2 className="card-title">Bedrijfsgegevens</h2>
                        </div>
                        <table className="form-table">
                            <tbody>
                                <tr>
                                    <th>Bedrijfslogo</th>
                                    <td>
                                        <div className="logo-section">
                                            <div className="logo-placeholder">
                                                <Building2 size={24} />
                                            </div>
                                            <button className="btn-upload">
                                                <Upload size={12} />
                                                Upload
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Bedrijfsnaam</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.bedrijfsnaam}
                                            onChange={(e) => setFormData({ ...formData, bedrijfsnaam: e.target.value })}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Contactpersoon</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.contactpersoon}
                                            onChange={(e) => setFormData({ ...formData, contactpersoon: e.target.value })}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>E-mailadres</th>
                                    <td>
                                        <div className="input-with-icon">
                                            <Mail size={14} className="icon" />
                                            <input
                                                type="email"
                                                className="form-input"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Telefoonnummer</th>
                                    <td>
                                        <div className="input-with-icon">
                                            <Phone size={14} className="icon" />
                                            <input
                                                type="tel"
                                                className="form-input"
                                                value={formData.telefoon}
                                                onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>KVK Nummer</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={currentBureau.kvkNummer}
                                            disabled
                                            style={{ background: '#f8fafc', color: '#64748b' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>BTW Nummer</th>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={currentBureau.btwNummer}
                                            disabled
                                            style={{ background: '#f8fafc', color: '#64748b' }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Specialisaties */}
                    <div className="form-card">
                        <div className="card-header">
                            <h2 className="card-title">Specialisaties</h2>
                        </div>
                        <div className="card-body">
                            <div className="spec-grid">
                                {specialisaties.map(spec => (
                                    <button
                                        key={spec}
                                        className={`spec-tag ${formData.selectedSpecialisaties.includes(spec) ? 'selected' : ''}`}
                                        onClick={() => toggleSpecialisatie(spec)}
                                    >
                                        {formData.selectedSpecialisaties.includes(spec) && <Check size={12} className="check" />}
                                        {spec}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    {/* Rating Card */}
                    <div className="rating-card">
                        <div className="rating-value">
                            <Star size={24} className="rating-star" fill="#f59e0b" />
                            <span className="rating-number">{currentBureau.rating.toFixed(1)}</span>
                        </div>
                        <div className="rating-label">Gemiddelde rating</div>
                        <div className="reviews-count">{currentBureau.aantalReviews} reviews</div>
                    </div>

                    {/* My Vacatures */}
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">Mijn vacatures ({myVacatures.length})</h3>
                            <Link href="/vacatures/nieuw" className="table-link">
                                + Nieuw
                            </Link>
                        </div>
                        {myVacatures.length > 0 ? (
                            <table className="mini-table">
                                <tbody>
                                    {myVacatures.slice(0, 4).map(v => (
                                        <tr key={v.id} onClick={() => window.location.href = `/vacatures/${v.id}`}>
                                            <td style={{ flex: 1 }}>
                                                <div className="item-title">{v.functietitel}</div>
                                                <div className="item-subtitle">{v.locatie}</div>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <span className="status-badge">Actief</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-message">Geen vacatures</div>
                        )}
                    </div>

                    {/* My Kandidaten */}
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">Mijn kandidaten ({myKandidaten.length})</h3>
                            <Link href="/kandidaten/nieuw" className="table-link">
                                + Nieuw
                            </Link>
                        </div>
                        {myKandidaten.length > 0 ? (
                            <table className="mini-table">
                                <tbody>
                                    {myKandidaten.slice(0, 4).map(k => (
                                        <tr key={k.id} onClick={() => window.location.href = `/kandidaten/${k.id}`}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{ width: 24, height: 24, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <User size={12} color="#64748b" />
                                                    </div>
                                                    <div>
                                                        <div className="item-title">{k.functie}</div>
                                                        <div className="item-subtitle">{k.categorie} • {k.regio}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <span className="status-badge">Actief</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-message">Geen kandidaten</div>
                        )}
                    </div>

                    {/* Reviews */}
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">Reviews ({myReviews.length})</h3>
                        </div>
                        {myReviews.length > 0 ? (
                            <div>
                                {myReviews.slice(0, 3).map(review => (
                                    <div key={review.id} className="review-item">
                                        <div className="review-header">
                                            <span className="review-author">Bureau (anoniem)</span>
                                            <div className="review-rating">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className="star" style={{ color: i < review.rating ? '#f59e0b' : '#e2e8f0' }}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="review-text">
                                            {review.tekst.substring(0, 80)}...
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-message">Geen reviews</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
