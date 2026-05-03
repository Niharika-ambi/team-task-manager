import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('member')
  const [adminSecret, setAdminSecret] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/auth/signup', {
        name, email, password, role, adminSecret
      })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#A08878', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </p>
        <h1 style={styles.title}>TaskFlow</h1>
        <p style={styles.subtitle}>Create your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <select
          style={styles.input}
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        {role === 'admin' && (
          <input
            style={styles.input}
            placeholder="Admin Secret Key"
            type="password"
            value={adminSecret}
            onChange={e => setAdminSecret(e.target.value)}
          />
        )}
        <button style={styles.button} onClick={handleSignup}>Create Account</button>
        <p style={styles.link}>
          Already have an account? <Link to="/login" style={styles.linkText}>Sign In</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F5F0E8',
  },
  card: {
    background: '#EDE5D8',
    padding: '40px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(139,109,56,0.12)',
    border: '1px solid #DDD0BE',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#8B6D38',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#A08878',
    marginBottom: '24px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #C4A882',
    background: '#F5F0E8',
    color: '#3D2B1F',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#8B6D38',
    color: '#F5F0E8',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  error: {
    color: '#C17B5C',
    fontSize: '13px',
    marginBottom: '12px',
  },
  link: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#A08878',
  },
  linkText: {
    color: '#8B6D38',
    textDecoration: 'none',
    fontWeight: '600',
  }
}