const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user
 */
router.post('/', async (req, res) => {
  const { email, name } = req.body;
  try {
    const newUser = await prisma.user.create({ data: { email, name } });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user
 */
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, name } = req.body;
  try {
    const updatedUser = await prisma.user.update({ where: { id: userId }, data: { email, name } });
    res.json(updatedUser);
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
