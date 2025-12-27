const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Invoice = require('./Invoice');
const Transaction = require('./Transaction');

// Associations

// Users <-> Orders
User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Orders <-> OrderItems
Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Products <-> OrderItems
Product.hasMany(OrderItem, { foreignKey: 'product_id', onDelete: 'RESTRICT' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Orders <-> Invoices
Order.hasOne(Invoice, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Invoice.belongsTo(Order, { foreignKey: 'order_id' });

// Orders <-> Transactions
Order.hasMany(Transaction, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Transaction.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
    sequelize,
    User,
    Product,
    Order,
    OrderItem,
    Invoice,
    Transaction
};
