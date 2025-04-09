const { verifyToken: verifyClerkToken } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

async function verifyToken(token) {
    return await verifyClerkToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
}

module.exports = { verifyToken };
