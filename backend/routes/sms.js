const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// POST /api/sms — Send SMS to a phone number (no auth required)
router.post('/api/sms', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Missing phone number or message' });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log('[SMS] Message sent:', response.sid);
    res.json({ success: true });
  } catch (error) {
    console.error('[SMS] Failed to send:', error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});

module.exports = router;
