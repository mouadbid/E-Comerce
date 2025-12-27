const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    statut: {
        type: DataTypes.ENUM('en attente', 'payé', 'expédié', 'livré', 'annulé', 'bloqué'),
        defaultValue: 'bloqué',
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
