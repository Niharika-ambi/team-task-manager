import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, overdue: 0 })
  const [tasks, setTasks] = useState([])
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchStats()
    fetchTasks()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await axios.get('https://team-task-manager-production-1006.up.railway.app/tasks/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(res.data)
    } catch (err) { console.log(err) }
  }

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://team-task-manager-production-1006.up.railway.app/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(res.data)
    } catch (err) { console.log(err) }
  }

  const statusColor = (status) => {
    if (status === 'done') return '#6B7C5C'
    if (status === 'in-progress') return '#A0785A'
    return '#8B6D38'
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Welcome back, {user?.name} 👋</h2>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{stats.total}</p>
            <p style={styles.statLabel}>Total Tasks</p>
          </div>
          <div style={{ ...styles.statCard, borderTop: '3px solid #6B7C5C' }}>
            <p style={styles.statNumber}>{stats.completed}</p>
            <p style={styles.statLabel}>Completed</p>
          </div>
          <div style={{ ...styles.statCard, borderTop: '3px solid #C17B5C' }}>
            <p style={styles.statNumber}>{stats.overdue}</p>
            <p style={styles.statLabel}>Overdue</p>
          </div>
        </div>

        <h3 style={styles.subheading}>My Tasks</h3>
        {tasks.length === 0 ? (
          <p style={styles.empty}>No tasks assigned yet.</p>
        ) : (
          <div style={styles.taskList}>
            {tasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div>
                  <p style={styles.taskTitle}>{task.title}</p>
                  <p style={styles.taskProject}>{task.project_name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ ...styles.badge, background: statusColor(task.status) }}>
                    {task.status}
                  </span>
                  {task.due_date && (
                    <p style={styles.dueDate}>
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
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
  content: { maxWidth: '900px', margin: '0 auto', padding: '40px 24px' },
  heading: { fontSize: '26px', fontWeight: '800', marginBottom: '28px', color: '#3D2B1F' },
  subheading: { fontSize: '18px', fontWeight: '700', margin: '36px 0 16px', color: '#3D2B1F' },
  statsRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  statCard: {
    background: '#EDE5D8',
    borderRadius: '14px',
    padding: '28px',
    flex: '1',
    minWidth: '160px',
    borderTop: '3px solid #8B6D38',
    border: '1px solid #DDD0BE',
    borderTopWidth: '3px',
    borderTopColor: '#8B6D38',
  },
  statNumber: { fontSize: '38px', fontWeight: '800', color: '#3D2B1F' },
  statLabel: { fontSize: '13px', color: '#A08878', marginTop: '4px', fontWeight: '500' },
  taskList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  taskCard: {
    background: '#EDE5D8',
    borderRadius: '12px',
    padding: '18px 22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #DDD0BE',
    borderLeft: '3px solid #8B6D38',
  },
  taskTitle: { fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: '#3D2B1F' },
  taskProject: { fontSize: '12px', color: '#A08878' },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
  },
  dueDate: { fontSize: '11px', color: '#A08878', marginTop: '6px' },
  empty: { color: '#A08878', fontSize: '14px' },
}