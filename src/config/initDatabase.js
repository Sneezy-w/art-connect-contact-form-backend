const pool = require('./database');
const logger = require('../utils/logger');

const initDatabase = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    await pool.execute(createTableQuery);
    logger.info('Database table "contacts" initialized successfully');
  } catch (error) {
    logger.error('Error initializing database table:', error);
    throw error;
  }
};

module.exports = initDatabase;
