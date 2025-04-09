const { verifyToken } = require('../utils/clerk');
const axios = require('axios');
require('dotenv').config();

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const session = await verifyToken(token);
    req.userId = session.sub || session.session?.userId || session.sessionId;

    let email = session.email || session.session?.emailAddresses?.[0]?.emailAddress;
    let name = `${session.firstName || ''} ${session.lastName || ''}`.trim();

    // Fallback: fetch full user from Clerk if basic fields are missing
    if (!email || !name) {
      try {
        const response = await axios.get(`https://api.clerk.dev/v1/users/${req.userId}`, {
          headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
        });
        const clerkUser = response.data;
        email = clerkUser.email_addresses?.[0]?.email_address;
        name = `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim();
        console.log('[Middleware] Clerk user fallback:', { email, name });
      } catch (apiErr) {
        console.error('[Middleware] Clerk API Error:', {
          status: apiErr?.response?.status,
          data: apiErr?.response?.data,
          message: apiErr?.message,
        });
      }
    }

    req.auth = { email, name };
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
