const { sequelize, User, Product, Order, OrderItem, Invoice, Transaction } = require('./models');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Attention: force: true supprime les tables existantes
        console.log('Base de données synchronisée.');

        const adminHash = await bcrypt.hash('admin123', 10);
        const clientHash = await bcrypt.hash('client123', 10);

        // 1. Création des utilisateurs
        const users = await User.bulkCreate([
            { nom: 'Jean Admin', email: 'admin@shop.com', mot_de_passe: adminHash, role: 'admin' },
            { nom: 'Marie Client', email: 'marie@gmail.com', mot_de_passe: clientHash, role: 'customer' }
        ]);
        console.log('Utilisateurs créés.');

        // 2. Création des produits
        const products = await Product.bulkCreate([
            {
                titre: 'Canapé STRANDMON',
                description: 'Un confort royal pour ce fauteuil à oreilles classique.',
                prix: 299.00,
                stock: 15,
                categorie: 'Salon',
                image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
            },
            {
                titre: 'Bureau MICKE',
                description: 'Un look épuré qui s\'intègre partout, pratique et fonctionnel.',
                prix: 79.99,
                stock: 45,
                categorie: 'Bureau',
                image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
            },
            {
                titre: 'Lit MALM',
                description: 'Un cadre de lit épuré, beau sous tous les angles.',
                prix: 199.00,
                stock: 20,
                categorie: 'Chambre',
                image_url: 'https://images.unsplash.com/photo-1505693416388-b3ace3cf4550?auto=format&fit=crop&w=800&q=80'
            },
            {
                titre: 'Lampe HEKTAR',
                description: 'Style industriel simple et surdimensionné.',
                prix: 59.90,
                stock: 30,
                categorie: 'Salon',
                image_url: 'https://images.unsplash.com/photo-1513506003832-8a5691979728?auto=format&fit=crop&w=800&q=80'
            },
            {
                titre: 'Plante FEJKA',
                description: 'Plante artificielle en pot, réaliste et décorative.',
                prix: 6.99,
                stock: 100,
                categorie: 'Décoration',
                image_url: 'https://images.unsplash.com/photo-1485955900006-10f6237e2a13?auto=format&fit=crop&w=800&q=80'
            }
        ]);
        console.log('Produits créés.');

        // 3. Création d'une commande pour Marie
        const order = await Order.create({
            user_id: users[1].id,
            statut: 'bloqué',
            total: 498.00 // 299 + 199
        });
        console.log('Commande créée.');

        // 4. Ajout des articles à la commande
        await OrderItem.bulkCreate([
            { order_id: order.id, product_id: products[0].id, quantité: 1, prix_unitaire: 299.00 }, // Canapé
            { order_id: order.id, product_id: products[2].id, quantité: 1, prix_unitaire: 199.00 }  // Lit
        ]);
        console.log('Articles de commande ajoutés.');

        // 5. Création de la facture
        await Invoice.create({
            order_id: order.id,
            url_pdf: '/invoices/facture_001.pdf'
        });
        console.log('Facture créée.');

        // 6. Création de la transaction
        await Transaction.create({
            order_id: order.id,
            methode_paiement: 'Carte Bancaire',
            statut_transaction: 'Succès'
        });
        console.log('Transaction créée.');

        console.log('--- SEEDING TERMINÉ AVEC SUCCÈS ---');
        process.exit(0);

    } catch (error) {
        console.error('Erreur lors du seeding :', error);
        process.exit(1);
    }
};

seedDatabase();
