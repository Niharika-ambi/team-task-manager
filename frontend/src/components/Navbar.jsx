import { useNavigate, Link } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.logo}>TaskFlow</Link>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/projects" style={styles.link}>Projects</Link>
        <Link to="/tasks" style={styles.link}>Tasks</Link>
      </div>
      <div style={styles.right}>
        <span style={styles.username}>{user?.name}</span>
        <button style={styles.logout} onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#EDE5D8',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #DDD0BE',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#8B6D38',
    textDecoration: 'none',
    letterSpacing: '-0.5px',
  },
  links: { display: 'flex', gap: '24px' },
  link: {
    color: '#7D6B5D',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  username: { fontSize: '13px', color: '#A08878', fontWeight: '500' },
  logout: {
    background: 'transparent',
    border: '1px solid #C4A882',
    color: '#8B6D38',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
  }
}