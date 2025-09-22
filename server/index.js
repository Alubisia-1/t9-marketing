const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const paymentRoutes = require('./routes/payment');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payment', paymentRoutes);

// MongoDB Connection
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded ✅' : 'Not Found ❌');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Enhanced connection event handlers
mongoose.connection.on('error', (err) => {
  console.error('⚠️ Mongoose runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Basic Route
app.get('/', (req, res) => {
  res.send('T9 Marketing Backend is running');
});

module.exports = app;

// Start Server
if (require.main === module) {
  const port = process.env.PORT || 5000;
  console.log(`🚀 Starting server on port ${port}`);
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
}
