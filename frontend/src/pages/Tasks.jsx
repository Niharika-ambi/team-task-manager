import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [members, setMembers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', due_date: '', project_id: '', assigned_to: ''
  })
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchTasks()
    fetchProjects()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(res.data)
    } catch (err) { console.log(err) }
  }

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/projects', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProjects(res.data)
    } catch (err) { console.log(err) }
  }

  const fetchMembers = async (projectId) => {
    try {
      const res = await axios.get(`http://localhost:5000/projects/${projectId}/members`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMembers(res.data)
    } catch (err) { console.log(err) }
  }

  const createTask = async () => {
    try {
      await axios.post('http://localhost:5000/tasks', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setForm({ title: '', description: '', due_date: '', project_id: '', assigned_to: '' })
      setShowForm(false)
      fetchTasks()
    } catch (err) { console.log(err) }
  }

  const updateStatus = async (taskId, status) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${taskId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks()
    } catch (err) { console.log(err) }
  }

  const statusColor = (status) => {
    if (status === 'done') return '#6B7C5C'
    if (status === 'in-progress') return '#A0785A'
    return '#8B6D38'
  }

  const statusBg = (status) => {
    if (status === 'done') return '#E8F0E4'
    if (status === 'in-progress') return '#F5EAE4'
    return '#F0E8DC'
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.heading}>Tasks</h2>
            <p style={styles.subheading}>Track and manage your work</p>
          </div>
          {user?.role === 'admin' && (
            <button style={styles.fillBtn} onClick={() => setShowForm(!showForm)}>
              + New Task
            </button>
          )}
        </div>

        {showForm && (
          <div style={styles.form}>
            <h3 style={styles.formTitle}>Create New Task</h3>
            <input
              style={styles.input}
              placeholder="Task Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
              style={styles.input}
              placeholder="Description (optional)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <input
              style={styles.input}
              type="date"
              value={form.due_date}
              onChange={e => setForm({ ...form, due_date: e.target.value })}
            />
            <select
              style={styles.input}
              value={form.project_id}
              onChange={e => {
                setForm({ ...form, project_id: e.target.value })
                fetchMembers(e.target.value)
              }}
            >
              <option value="">Select Project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <select
              style={styles.input}
              value={form.assigned_to}
              onChange={e => setForm({ ...form, assigned_to: e.target.value })}
            >
              <option value="">Assign To</option>
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={styles.fillBtn} onClick={createTask}>Create Task</button>
              <button style={styles.outlineBtn} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {tasks.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyTitle}>No tasks yet</p>
            <p style={styles.emptySub}>
              {user?.role === 'admin' ? 'Create your first task to get started.' : 'No tasks have been assigned to you yet.'}
            </p>
          </div>
        ) : (
          <div style={styles.taskList}>
            {tasks.map(task => (
              <div key={task.id} style={styles.taskCard}>
                <div style={styles.taskLeft}>
                  <h3 style={styles.taskTitle}>{task.title}</h3>
                  {task.description && (
                    <p style={styles.taskDesc}>{task.description}</p>
                  )}
                  <p style={styles.taskMeta}>
                    {task.project_name} • Assigned to: {task.assigned_to_name}
                  </p>
                  {task.due_date && (
                    <p style={styles.taskMeta}>
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div style={styles.taskRight}>
                  <span style={{
                    ...styles.badge,
                    background: statusBg(task.status),
                    color: statusColor(task.status),
                  }}>
                    {task.status}
                  </span>
                  <select
                    style={styles.statusSelect}
                    value={task.status}
                    onChange={e => updateStatus(task.id, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
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
  taskList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  taskCard: {
    background: '#EDE5D8', borderRadius: '14px', padding: '20px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    border: '1px solid #DDD0BE', borderLeft: '3px solid #8B6D38',
  },
  taskLeft: { flex: 1 },
  taskTitle: { fontSize: '15px', fontWeight: '700', marginBottom: '4px', color: '#3D2B1F' },
  taskDesc: { fontSize: '13px', color: '#7D6B5D', marginBottom: '6px' },
  taskMeta: { fontSize: '12px', color: '#A08878', marginTop: '2px' },
  taskRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' },
  badge: {
    padding: '4px 12px', borderRadius: '20px',
    fontSize: '12px', fontWeight: '600',
  },
  statusSelect: {
    background: '#F5F0E8', color: '#8B6D38',
    border: '1px solid #C4A882', borderRadius: '6px',
    padding: '5px 10px', fontSize: '12px', outline: 'none',
  },
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
  emptyState: {
    textAlign: 'center', padding: '80px 24px',
    background: '#EDE5D8', borderRadius: '16px', border: '1px solid #DDD0BE',
  },
  emptyTitle: { fontSize: '18px', fontWeight: '700', color: '#3D2B1F', marginBottom: '8px' },
  emptySub: { fontSize: '14px', color: '#A08878' },
}