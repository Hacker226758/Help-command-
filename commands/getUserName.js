// Replace with your actual database or API interaction
const { Pool } = require('pg'); // Example using PostgreSQL

const pool = new Pool({
  // Your database connection details here
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432, // Or your database port
});


async function getUserName(userId) {
  try {
    const result = await pool.query('SELECT name FROM users WHERE id = $1', [userId]);
    return result.rows[0]?.name || null; // Return name or null if not found
  } catch (error) {
    console.error('Error fetching user name:', error);
    return null;
  }
}

module.exports = { getUserName };
