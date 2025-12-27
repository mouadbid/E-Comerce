const { Product } = require('../models');
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
    try {
        const { search, categorie, minPrice, maxPrice } = req.query;
        let where = {};

        if (search) {
            where.titre = { [Op.like]: `%${search}%` };
        }
        if (categorie) {
            where.categorie = categorie;
        }
        if (minPrice || maxPrice) {
            where.prix = {};
            if (minPrice) where.prix[Op.gte] = minPrice;
            if (maxPrice) where.prix[Op.lte] = maxPrice;
        }

        const products = await Product.findAll({ where });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { titre, description, prix, stock, categorie, image_url } = req.body;

        let finalImageUrl = image_url;
        if (req.file) {
            finalImageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        const newProduct = await Product.create({
            titre,
            description,
            prix,
            stock,
            categorie,
            image_url: finalImageUrl
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du produit', error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { titre, description, prix, stock, categorie, image_url } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

        let finalImageUrl = image_url || product.image_url;
        if (req.file) {
            finalImageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        await product.update({
            titre,
            description,
            prix,
            stock,
            categorie,
            image_url: finalImageUrl
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

        await product.destroy();
        res.json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error });
    }
};
