const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log('--- Loading Routes ---');
// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

console.log('--- Registering Routes ---');
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Explicitly log these to ensure they are running
console.log('Registering /api/users...');
app.use('/api/users', userRoutes);

console.log('Registering /api/orders...');
app.use('/api/orders', orderRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
console.log('Registering /api/dashboard...');
app.use('/api/dashboard', dashboardRoutes);

// Protected Route for testing
app.get('/api/profile', verifyToken, (req, res) => {
    res.json({ message: 'Profil utilisateur', user: req.user });
});

// Basic Route
app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur l\'API E-commerce</h1>');
});

app.get('/test-direct', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date() });
});

// Sync Database and Start Server
sequelize.sync()
    .then(() => {
        console.log('Base de données synchronisée.');
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
            console.log('Routes disponibles :');
            console.log('- /api/auth');
            console.log('- /api/products');
            console.log('- /api/users');
            console.log('- /api/orders');
        });
    })
    .catch(err => {
        console.error('Erreur de synchronisation de la base de données:', err);
    });
