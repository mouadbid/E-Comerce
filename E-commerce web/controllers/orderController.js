const { Order, User } = require('../models');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{
                model: User,
                attributes: ['nom', 'email'] // Removed adresse causing crash
            }],
            order: [['date', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des commandes.', error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    const { items, total, userId } = req.body;

    try {
        // Create Logic
        const newOrder = await Order.create({
            user_id: userId,
            statut: 'en attente',
            total: total,
            date: new Date()
        });

        // Add Items
        const orderItems = items.map(item => ({
            order_id: newOrder.id,
            product_id: item.id,
            quantité: item.quantity,
            prix_unitaire: item.prix
        }));

        const { OrderItem } = require('../models');
        await OrderItem.bulkCreate(orderItems);

        res.status(201).json({ message: 'Commande créée avec succès', orderId: newOrder.id });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['en attente', 'payé', 'expédié', 'livré', 'annulé', 'bloqué'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Statut invalide' });
        }

        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        await order.update({ statut: status });
        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour.' });
    }
};
