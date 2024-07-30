const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'suman@123',
  port: 5432,
});



// Routes
app.get('/memory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM memory');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error fetching memories' });
  }
});

app.post('/memory', async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      'INSERT INTO memory (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error creating memory' }); 
  }
});

app.delete('/memory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM memory WHERE id = $1', [id]);
    res.json({ message: 'Memory deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error deleting memory' }); 
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});