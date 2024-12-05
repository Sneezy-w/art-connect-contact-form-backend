const axios = require('axios');
const logger = require('./logger');

const verifyRecaptcha = async (captcha) => {
  try {
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
    );

    return recaptchaResponse.data.success;

    // if (!recaptchaResponse.data.success) {
    //   error('reCAPTCHA verification failed');
    //   return res.json({
    //     success: false,
    //     error: 'reCAPTCHA verification failed',
    //   });
    // }
  } catch (err) {
    logger.error('reCAPTCHA verification failed:', error);
    return false;
    //return res.json({ success: false, error: 'reCAPTCHA verification error' });
  }
};

module.exports = {
  verifyRecaptcha,
};
