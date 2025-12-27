const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_facturation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    url_pdf: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'invoices',
    timestamps: false
});

module.exports = Invoice;
