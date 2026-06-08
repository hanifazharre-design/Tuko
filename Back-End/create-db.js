import mysql from 'mysql2/promise';

async function createDb() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS invofest;');
    console.log('Database invofest created successfully');
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

createDb();
