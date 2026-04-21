import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL DEFAULT 'Marketing Lead',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(500) NOT NULL,
      type VARCHAR(100) NOT NULL,
      status VARCHAR(100) DEFAULT 'Draft',
      content TEXT,
      date_label VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Seed default users if they don't exist
  const seeds = [
    { email: 'demo@fyscaltech.com', password: 'FyscalGTM2026', name: 'Demo User', role: 'Marketing Lead' },
    { email: 'admin@fyscaltech.com', password: 'Admin@123', name: 'Admin', role: 'Administrator' },
  ];

  for (const u of seeds) {
    const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [u.email]);
    if (!rows.length) {
      const hash = await bcrypt.hash(u.password, 10);
      await pool.query(
        'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
        [u.email, hash, u.name, u.role]
      );
    }
  }

  console.log('Database initialized and seeded');
}
