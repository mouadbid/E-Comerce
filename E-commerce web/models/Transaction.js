const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    methode_paiement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statut_transaction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_transaction: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'transactions',
    timestamps: false
});

module.exports = Transaction;
