const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'bhaskar_db',
});


// Create a new record
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const values = [name, email];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'An error occurred while adding a new user.' });
      } else {
        res.json({ id: results.insertId,
                    "message":"success" });
      }
    });
  });
  
  // Read all records
  app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
  
    pool.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Update a record
  app.put('/api/users/:id', (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    const values = [name, email, id];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'An error occurred while updating the user.' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Delete a record
  app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    const values = [id];
  
    pool.query(query, values, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
      } else {
        res.json(results);
      }
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});