const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));
app.use('/tasks', require('./routes/tasks'));

app.get('/', (req, res) => {
  res.json({ message: 'Team Task Manager API running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));