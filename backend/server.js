require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const policyRoutes = require('./routes/policyRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/policy', policyRoutes);
app.use('/payment', paymentRoutes);
app.use('/claim', claimRoutes);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
