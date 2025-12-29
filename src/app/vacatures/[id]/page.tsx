import Link from 'next/link';
import { ArrowLeft, MapPin, Euro, Phone, Mail, Building2, CheckCircle, Calendar } from 'lucide-react';
import { vacatures, getBureauById } from '@/lib/data';
import Rating from '@/components/Rating';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function VacatureDetailPage({ params }: PageProps) {
    const { id } = await params;
    const vacature = vacatures.find(v => v.id === id);

    if (!vacature) {
        notFound();
    }

    const bureau = getBureauById(vacature.bureauId);

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
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>{vacature.categorie}</span>
                            <h1 style={{ marginTop: '0.5rem' }}>{vacature.functietitel}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <MapPin size={16} />
                                    {vacature.locatie}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Calendar size={16} />
                                    Geplaatst op {new Date(vacature.geplaatst).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '2rem 1rem' }}>
                <div className="detail-layout">
                    {/* Main Content */}
                    <main>
                        {/* Commission Box */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1e3a5f 0%, #2a4d7a 100%)',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            color: 'white',
                            marginBottom: '1.5rem',
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                                        Verwachte maandelijkse opbrengst
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Euro size={20} />
                                        {vacature.verwachteOpbrengst.toLocaleString('nl-NL')}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                                        Commissie voor aanbrenger
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                                        {vacature.commissieVoorstel}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Vacature omschrijving
                            </h2>
                            <div style={{
                                color: '#4b5563',
                                lineHeight: '1.8',
                                whiteSpace: 'pre-line',
                            }}>
                                {vacature.beschrijving}
                            </div>
                        </div>

                        {/* Contact Preference */}
                        <div className="card">
                            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                                Contactvoorkeur
                            </h2>
                            <p style={{ color: '#6b7280' }}>
                                {vacature.contactVoorkeur === 'telefoon' && 'Dit bureau heeft voorkeur voor telefonisch contact.'}
                                {vacature.contactVoorkeur === 'email' && 'Dit bureau heeft voorkeur voor contact via e-mail.'}
                                {vacature.contactVoorkeur === 'beide' && 'Je kunt dit bureau zowel telefonisch als per e-mail bereiken.'}
                            </p>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside>
                        <div className="sidebar-box" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    background: '#e5e7eb',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Building2 size={28} color="#6b7280" />
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                                        {vacature.bureauNaam}
                                    </h3>
                                    {bureau?.geverifieerd && (
                                        <span className="verified-badge">
                                            <CheckCircle size={14} />
                                            Geverifieerd
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <Rating rating={vacature.bureauRating} />
                                <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.5rem' }}>
                                    ({bureau?.aantalReviews || 0} reviews)
                                </span>
                            </div>

                            {bureau && (
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                        Specialisaties
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {bureau.specialisaties.map(spec => (
                                            <span key={spec} className="badge">{spec}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{
                                borderTop: '1px solid #e5e7eb',
                                paddingTop: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                            }}>
                                {bureau && (
                                    <>
                                        <a
                                            href={`tel:${bureau.telefoon}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: '#4b5563',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            <Phone size={16} />
                                            {bureau.telefoon}
                                        </a>
                                        <a
                                            href={`mailto:${bureau.email}`}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: '#4b5563',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            <Mail size={16} />
                                            {bureau.email}
                                        </a>
                                    </>
                                )}
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                                Neem contact op
                            </button>

                            <Link
                                href={`/bureaus/${vacature.bureauId}`}
                                className="btn btn-outline"
                                style={{ width: '100%', marginTop: '0.75rem', textAlign: 'center' }}
                            >
                                Bekijk bureau profiel
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

// Generate static params for all vacatures
export async function generateStaticParams() {
    return vacatures.map(v => ({ id: v.id }));
}
