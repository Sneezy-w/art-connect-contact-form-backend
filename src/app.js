const express = require('express');
const cors = require('cors');
//const helmet = require("helmet");
const { contactValidationRules, validate } = require('./middleware/validate');
const contactController = require('./controllers/contactController');
const logger = require('./utils/logger');
const initDatabase = require('./config/initDatabase');

const app = express();

//app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize database table
initDatabase().catch((error) => {
  logger.error('Failed to initialize database:', error);
  process.exit(1);
});

// Routes
app.post(
  '/api/contact',
  contactValidationRules(),
  validate,
  contactController.submitContact
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
