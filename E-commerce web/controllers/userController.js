const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'nom', 'email', 'role', 'date_creation']
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        // Prevent deleting the last admin or strict safeguard if needed, 
        // but for now simple delete is what user wants.
        await user.destroy();
        res.json({ message: 'Utilisateur supprimé (bloqué) avec succès' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression.' });
    }
};
