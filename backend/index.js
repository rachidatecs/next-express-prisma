const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { requireAuth } = require('./middleware/auth');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const meRoutes = require('./routes/me');
const smsRoutes = require('./routes/sms');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/users', requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use(meRoutes);
app.use(smsRoutes);

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
