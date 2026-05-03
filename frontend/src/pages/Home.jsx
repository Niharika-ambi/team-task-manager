import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .feature-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px rgba(139,109,56,0.12) !important;
        }
        .fill-btn:hover {
          background: #7a6035 !important;
          transform: translateY(-1px);
        }
        .outline-btn:hover {
          background: rgba(139,109,56,0.08) !important;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(139,109,56,0.1) !important;
        }
      `}</style>

      {/* Navbar */}
      <nav style={styles.nav}>
        <span style={styles.logo}>TaskFlow</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="outline-btn"
            style={styles.outlineBtn}
            onClick={() => navigate('/login')}
          >Login</button>
          <button
            className="fill-btn"
            style={styles.fillBtn}
            onClick={() => navigate('/signup')}
          >Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        ...styles.hero,
        animation: visible ? 'fadeUp 0.9s ease forwards' : 'none',
        opacity: 0,
      }}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Role-Based Team Collaboration
        </div>

        <h1 style={styles.heroTitle}>
          The Smarter Way<br />
          Your Team <span style={styles.accentText}>Gets Things Done</span>
        </h1>

        <p style={styles.heroSub}>
          TaskFlow brings your projects, tasks, and team together in one place.
          Assign work, track progress, and hit deadlines — without the chaos.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="fill-btn"
            style={{ ...styles.fillBtn, padding: '14px 36px', fontSize: '16px' }}
            onClick={() => navigate('/signup')}
          >
            Start for Free →
          </button>
          <button
            className="outline-btn"
            style={{ ...styles.outlineBtn, padding: '14px 36px', fontSize: '16px' }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Stats */}
      <div style={{
        ...styles.statsRow,
        animation: visible ? 'fadeIn 1.3s ease forwards' : 'none',
        opacity: 0,
      }}>
        {[
          { number: '100%', label: 'Free to Use' },
          { number: 'RBAC', label: 'Role Based Access' },
          { number: 'Live', label: 'Real Time Tracking' },
          { number: 'JWT', label: 'Secure Auth' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={styles.statCard}>
            <p style={styles.statNumber}>{s.number}</p>
            <p style={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={styles.featuresSection}>
        <p style={styles.sectionTag}>WHY TASKFLOW</p>
        <h2 style={styles.sectionTitle}>Everything your team needs</h2>
        <p style={styles.sectionSub}>
          Built for small teams that want to move fast without losing track.
        </p>
        <div style={styles.featuresGrid}>
          {[
            {
              title: 'Project Management',
              desc: 'Create projects, set goals, and keep your entire team aligned from day one.',
              accent: '#8B6D38',
            },
            {
              title: 'Task Assignment',
              desc: 'Break work into tasks, assign to the right people, and set clear deadlines.',
              accent: '#A0785A',
            },
            {
              title: 'Progress Tracking',
              desc: 'Move tasks from To Do → In Progress → Done. Always know where things stand.',
              accent: '#6B7C5C',
            },
            {
              title: 'Admin Controls',
              desc: 'Admins create and assign. Members execute and update. Clean separation of power.',
              accent: '#8B6D38',
            },
            {
              title: 'Live Dashboard',
              desc: 'Your personal command center. See total tasks, completed work, and overdue items instantly.',
              accent: '#A0785A',
            },
            {
              title: 'Secure by Design',
              desc: 'JWT authentication, hashed passwords, and role-based access keep your data protected.',
              accent: '#6B7C5C',
            },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{
              ...styles.featureCard,
              borderTop: `3px solid ${f.accent}`,
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                width: '36px', height: '3px',
                borderRadius: '2px',
                background: f.accent,
                marginBottom: '20px'
              }} />
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaBanner}>
        <h2 style={styles.ctaTitle}>Ready to get your team on track?</h2>
        <p style={styles.ctaSub}>Sign up in seconds. No credit card required.</p>
        <button
          className="fill-btn"
          style={{ ...styles.fillBtn, padding: '14px 40px', fontSize: '16px' }}
          onClick={() => navigate('/signup')}
        >
          Create Free Account →
        </button>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ color: '#B8A99A', fontSize: '13px' }}>
          © 2026 TaskFlow. Built for teams that move fast.
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F5F0E8',
    fontFamily: "'Inter', sans-serif",
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 48px',
    background: '#F5F0E8',
    borderBottom: '1px solid #E8DDD0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#8B6D38',
    letterSpacing: '-0.5px',
  },
  outlineBtn: {
    padding: '8px 20px',
    background: 'transparent',
    color: '#8B6D38',
    border: '1px solid #C4A882',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  fillBtn: {
    padding: '8px 20px',
    background: '#8B6D38',
    color: '#F5F0E8',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  hero: {
    textAlign: 'center',
    padding: '100px 24px 70px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    background: 'rgba(139,109,56,0.1)',
    border: '1px solid rgba(139,109,56,0.25)',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#8B6D38',
    marginBottom: '28px',
    fontWeight: '500',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#8B6D38',
    display: 'inline-block',
  },
  heroTitle: {
    fontSize: '58px',
    fontWeight: '800',
    lineHeight: '1.12',
    marginBottom: '24px',
    color: '#3D2B1F',
    letterSpacing: '-1.5px',
  },
  accentText: {
    color: '#8B6D38',
  },
  heroSub: {
    fontSize: '18px',
    color: '#7D6B5D',
    marginBottom: '40px',
    lineHeight: '1.8',
    maxWidth: '580px',
    margin: '0 auto 40px',
  },
  divider: {
    width: '80px',
    height: '2px',
    background: '#C4A882',
    margin: '0 auto 60px',
    borderRadius: '2px',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '0 24px 80px',
  },
  statCard: {
    background: '#EDE5D8',
    border: '1px solid #DDD0BE',
    borderRadius: '12px',
    padding: '20px 36px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  statNumber: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#8B6D38',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#A08878',
    fontWeight: '500',
  },
  featuresSection: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 24px 100px',
  },
  sectionTag: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#8B6D38',
    marginBottom: '12px',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '800',
    color: '#3D2B1F',
    marginBottom: '12px',
    letterSpacing: '-0.5px',
  },
  sectionSub: {
    textAlign: 'center',
    color: '#7D6B5D',
    fontSize: '16px',
    marginBottom: '48px',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  featureCard: {
    background: '#EDE5D8',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #DDD0BE',
    cursor: 'default',
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#3D2B1F',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#7D6B5D',
    lineHeight: '1.7',
  },
  ctaBanner: {
    textAlign: 'center',
    padding: '80px 24px',
    background: '#EDE5D8',
    borderTop: '1px solid #DDD0BE',
    borderBottom: '1px solid #DDD0BE',
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '12px',
    color: '#3D2B1F',
    letterSpacing: '-0.5px',
  },
  ctaSub: {
    color: '#7D6B5D',
    marginBottom: '28px',
    fontSize: '16px',
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    background: '#F5F0E8',
  },
}