// backend/routes/me.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../middleware/auth');
const { env } = require('process');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:JbJJvEMVUGwqKbYfJlbOYwFQbakiKCuF@yamabiko.proxy.rlwy.net:37054/railway", // explicitly load from env
    },
  },
});

// GET /api/user — Get current authenticated user (auto-create if needed)
router.get('/api/user', requireAuth, async (req, res) => {
  try {
    console.log('[Prisma] Using DATABASE_URL:', env.DATABASE_URL);
    const { userId, auth } = req;
    console.log('[API] Raw req.auth:', auth);
    console.log('[API] Clerk Auth Info:', auth);

    let user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      const email = auth?.email || `${userId}@example.com`;
      const name = auth?.name || 'Unnamed User';

      console.log('[API] Creating user:', { id: userId, email, name });

      user = await prisma.user.create({
        data: { id: userId, email, name },
      });
    }

    // Check if user info needs to be updated
    console.log('[API] DB User Before Update:', user);
    const updatedFields = {};

    if (auth?.email && auth.email !== user.email) updatedFields.email = auth.email;
    if (auth?.name && auth.name !== user.name) updatedFields.name = auth.name;

    if (Object.keys(updatedFields).length > 0) {
      console.log('[API] Updating user with Clerk data:', updatedFields);
      user = await prisma.user.update({
        where: { id: userId },
        data: updatedFields,
      });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching or creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
