import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [memberEmail, setMemberEmail] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/projects', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProjects(res.data)
    } catch (err) { console.log(err) }
  }

  const createProject = async () => {
    try {
      await axios.post('http://localhost:5000/projects',
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setName('')
      setDescription('')
      setShowForm(false)
      fetchProjects()
    } catch (err) { console.log(err) }
  }

  const addMember = async (projectId) => {
    try {
      const res = await axios.get('http://localhost:5000/auth/user-by-email?email=' + memberEmail, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await axios.post(`http://localhost:5000/projects/${projectId}/members`,
        { user_id: res.data.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMemberEmail('')
      setSelectedProject(null)
      alert('Member added!')
    } catch (err) { alert('User not found or already a member') }
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.heading}>Projects</h2>
            <p style={styles.subheading}>Manage your team's projects</p>
          </div>
          {user?.role === 'admin' && (
            <button style={styles.fillBtn} onClick={() => setShowForm(!showForm)}>
              + New Project
            </button>
          )}
        </div>

        {showForm && (
          <div style={styles.form}>
            <h3 style={styles.formTitle}>Create New Project</h3>
            <input
              style={styles.input}
              placeholder="Project Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={styles.fillBtn} onClick={createProject}>Create Project</button>
              <button style={styles.outlineBtn} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyTitle}>No projects yet</p>
            <p style={styles.emptySub}>
              {user?.role === 'admin' ? 'Create your first project to get started.' : 'You have not been added to any projects yet.'}
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {projects.map(project => (
              <div key={project.id} style={styles.card}>
                <div style={styles.cardAccent} />
                <h3 style={styles.projectName}>{project.name}</h3>
                <p style={styles.projectDesc}>{project.description || 'No description provided'}</p>
                {user?.role === 'admin' && (
                  <div style={styles.memberSection}>
                    {selectedProject === project.id ? (
                      <div>
                        <input
                          style={styles.input}
                          placeholder="Member email address"
                          value={memberEmail}
                          onChange={e => setMemberEmail(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={styles.smallFillBtn} onClick={() => addMember(project.id)}>
                            Add Member
                          </button>
                          <button style={styles.smallOutlineBtn} onClick={() => setSelectedProject(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button style={styles.smallOutlineBtn} onClick={() => setSelectedProject(project.id)}>
                        + Add Member
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#F5F0E8' },
  content: { maxWidth: '960px', margin: '0 auto', padding: '40px 24px' },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '32px'
  },
  heading: { fontSize: '26px', fontWeight: '800', color: '#3D2B1F', marginBottom: '4px' },
  subheading: { fontSize: '14px', color: '#A08878' },
  form: {
    background: '#EDE5D8', padding: '28px', borderRadius: '16px',
    marginBottom: '28px', border: '1px solid #DDD0BE',
  },
  formTitle: { fontSize: '16px', fontWeight: '700', color: '#3D2B1F', marginBottom: '16px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    background: '#EDE5D8', borderRadius: '16px', padding: '28px',
    border: '1px solid #DDD0BE', position: 'relative', overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: '3px', background: '#8B6D38',
  },
  projectName: { fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#3D2B1F' },
  projectDesc: { fontSize: '13px', color: '#A08878', marginBottom: '20px', lineHeight: '1.6' },
  memberSection: { marginTop: '4px' },
  input: {
    width: '100%', padding: '10px 14px', marginBottom: '12px',
    borderRadius: '8px', border: '1px solid #C4A882',
    background: '#F5F0E8', color: '#3D2B1F', fontSize: '14px', outline: 'none',
  },
  fillBtn: {
    padding: '10px 22px', background: '#8B6D38', color: '#F5F0E8',
    border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
  },
  outlineBtn: {
    padding: '10px 22px', background: 'transparent', color: '#8B6D38',
    border: '1px solid #C4A882', borderRadius: '8px', fontSize: '14px', fontWeight: '500',
  },
  smallFillBtn: {
    padding: '7px 16px', background: '#8B6D38', color: '#F5F0E8',
    border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600',
  },
  smallOutlineBtn: {
    padding: '7px 16px', background: 'transparent', color: '#8B6D38',
    border: '1px solid #C4A882', borderRadius: '6px', fontSize: '13px', fontWeight: '500',
  },
  emptyState: {
    textAlign: 'center', padding: '80px 24px',
    background: '#EDE5D8', borderRadius: '16px', border: '1px solid #DDD0BE',
  },
  emptyTitle: { fontSize: '18px', fontWeight: '700', color: '#3D2B1F', marginBottom: '8px' },
  emptySub: { fontSize: '14px', color: '#A08878' },
}