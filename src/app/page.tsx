import Link from 'next/link';
import Footer from '@/components/Footer';
import { Briefcase, Users, Handshake, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        padding: '1rem 0',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="logo">
            <div className="logo-icon">
              <Briefcase size={20} />
            </div>
            BureauLink
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login" className="btn btn-outline">
              Login
            </Link>
            <Link href="/registreer" className="btn btn-primary">
              Registreren
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Bundel je krachten.<br />Deel je vacatures.</h1>
          <p>
            Het besloten B2B platform waar geverifieerde uitzendbureaus vacatures met elkaar delen
            die buiten hun eigen specialisatie vallen. Samen sterker, meer plaatsingen.
          </p>
          <div className="cta-buttons">
            <Link href="/registreer" className="btn btn-primary" style={{
              background: 'white',
              color: '#1e3a5f',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
            }}>
              Registreer je bureau
              <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link href="/login" className="btn btn-secondary" style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
            }}>
              Inloggen
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: '#1f2937' }}>
            Waarom BureauLink?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Vergroot je netwerk</h3>
              <p>
                Krijg toegang tot een besloten community van geverifieerde uitzendbureaus.
                Bouw waardevolle samenwerkingen op met collega-bureaus in heel Nederland.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">
                <Handshake size={32} />
              </div>
              <h3>Verdien aan doorverwijzingen</h3>
              <p>
                Heb je een vacature die niet bij je specialisatie past? Deel deze met andere bureaus
                en ontvang een aantrekkelijke commissie bij een succesvolle plaatsing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Alleen geverifieerde bureaus</h3>
              <p>
                Elk bureau wordt handmatig geverifieerd op KvK-registratie en betrouwbaarheid.
                Zo weet je zeker dat je met professionals werkt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: '#1f2937' }}>
            Hoe het werkt
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {[
              { step: 1, title: 'Registreer je bureau', desc: 'Vul je bedrijfsgegevens in en wacht op verificatie' },
              { step: 2, title: 'Deel je vacatures', desc: 'Upload vacatures die buiten je specialisatie vallen' },
              { step: 3, title: 'Ontvang reacties', desc: 'Andere bureaus nemen contact op voor samenwerking' },
              { step: 4, title: 'Verdien commissie', desc: 'Bij succesvolle plaatsing ontvang je je commissie' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: '#1e3a5f',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  margin: '0 auto 1rem',
                }}>
                  {step}
                </div>
                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>{title}</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 0', background: '#1e3a5f', color: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { value: '150+', label: 'Geverifieerde bureaus' },
              { value: '2.400+', label: 'Gedeelde vacatures' },
              { value: '890+', label: 'Succesvolle matches' },
              { value: '€2.1M+', label: 'Uitbetaalde commissies' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{value}</div>
                <div style={{ opacity: 0.8 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4rem 0', background: '#f9fafb', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#1f2937' }}>
            Klaar om te starten?
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Sluit je aan bij het grootste netwerk van samenwerkende uitzendbureaus in Nederland.
          </p>
          <Link href="/registreer" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            Start nu gratis
            <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
