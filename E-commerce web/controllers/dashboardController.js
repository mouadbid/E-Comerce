const { Order, Product, User } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
    try {
        // Run all queries in parallel for performance
        const [totalRevenue, totalOrders, totalUsers, lowStockCount, recentOrders] = await Promise.all([
            // 1. Total Revenue (sum of all orders not cancelled)
            Order.sum('total', {
                where: {
                    statut: { [Op.ne]: 'annulé' }
                }
            }),

            // 2. Total Orders Count
            Order.count(),

            // 3. Total Customers Count
            User.count({ where: { role: 'customer' } }),

            // 4. Low Stock Products (less than 5 items)
            Product.count({ where: { stock: { [Op.lt]: 5 } } }),

            // 5. Recent 5 Orders with User info
            Order.findAll({
                limit: 5,
                order: [['date', 'DESC']],
                include: [{
                    model: User,
                    attributes: ['nom', 'email']
                }]
            })
        ]);

        res.json({
            revenue: totalRevenue || 0,
            orders: totalOrders,
            users: totalUsers,
            lowStock: lowStockCount,
            recentActivity: recentOrders
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
    }
};
