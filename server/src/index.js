const express = require('express');
const cors = require('cors');
const config = require('../config/default');
const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const imageRoutes = require('./routes/image');
const historyRoutes = require('./routes/history');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/user', auth, userRoutes);
app.use('/api/image', auth, imageRoutes);
app.use('/api/history', auth, historyRoutes);

app.listen(config.port, () => {
  console.log(`API server running at http://localhost:${config.port}`);
});
