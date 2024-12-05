const pool = require('../config/database');
const emailService = require('../utils/emailService');
const logger = require('../utils/logger');
const { verifyRecaptcha } = require('../utils/recaptchaService');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message, captcha } = req.body;

    // Verify reCAPTCHA
    const isValidCaptcha = await verifyRecaptcha(captcha);
    if (!isValidCaptcha) {
      logger.warn(`Invalid reCAPTCHA attempt from email: ${email}`);
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed',
      });
    }

    // Rate limiting check (optional but recommended)
    const [existingSubmissions] = await pool.execute(
      'SELECT COUNT(*) as count FROM contacts WHERE email = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)',
      [email]
    );

    if (existingSubmissions[0].count >= 5) {
      logger.warn(`Rate limit exceeded for email: ${email}`);
      return res.status(429).json({
        success: false,
        message: 'Too many submissions. Please try again later.',
      });
    }

    // Save to database
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    // Send email notification
    await emailService.sendNotification({
      name,
      email,
      subject,
      message,
    });

    logger.info(`Contact form submitted successfully - ID: ${result.insertId}`);

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    logger.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
    });
  }
};

module.exports = {
  submitContact,
};
