const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user (handled by Clerk client)
 *     responses:
 *       200:
 *         description: Should be handled client-side via Clerk.
 */
router.post('/login', (req, res) => {
  res.status(200).json({ message: 'Login handled by Clerk frontend SDK. This endpoint is a placeholder.' });
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user (handled by Clerk client)
 *     responses:
 *       200:
 *         description: Logout message
 */
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out (handled client-side with Clerk)' });
});

module.exports = router;
