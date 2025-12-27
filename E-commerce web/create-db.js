const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de données '${process.env.DB_NAME}' vérifiée/créée avec succès.`);
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la création de la base de données:', error);
        process.exit(1);
    }
}

createDatabase();
