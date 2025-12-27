const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function runTests() {
    console.log('--- Démarrage des tests CRUD Produits ---\n');

    let adminToken = '';

    // 1. Connexion Admin
    console.log('1. Connexion Admin (Jean Admin)...');
    const loginRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, {
        email: 'admin@shop.com',
        mot_de_passe: 'admin123'
    });

    if (loginRes.status === 200) {
        adminToken = loginRes.body.token;
        console.log('Admin connecté.');
    } else {
        console.error('Échec connexion admin.', loginRes.body);
        return;
    }

    // 2. Récupérer tous les produits
    console.log('\n2. GET /api/products (Tout)');
    const getAllRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/products',
        method: 'GET'
    });
    console.log(`Produits trouvés: ${getAllRes.body.length}`);

    // 3. Créer un produit
    console.log('\n3. POST /api/products (Création)');
    const createRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/products',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        }
    }, {
        titre: 'Nouveau Produit Test',
        description: 'Description test',
        prix: 99.99,
        stock: 10,
        categorie: 'Test',
        image_url: 'http://test.com/img.jpg'
    });
    console.log(`Status: ${createRes.status}`, createRes.body.id ? 'OK' : 'Erreur');
    const newProductId = createRes.body.id;

    // 4. Modifier le produit
    if (newProductId) {
        console.log(`\n4. PUT /api/products/${newProductId} (Modification)`);
        const updateRes = await request({
            hostname: 'localhost',
            port: 3000,
            path: `/api/products/${newProductId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            }
        }, {
            prix: 150.00
        });
        console.log(`Status: ${updateRes.status}`, updateRes.body.prix === 150.00 ? 'Prix mis à jour' : 'Erreur');
    }

    // 5. Filtrage
    console.log('\n5. GET /api/products?minPrice=100 (Filtre Prix)');
    const filterRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/products?minPrice=100',
        method: 'GET'
    });
    console.log(`Produits > 100€: ${filterRes.body.length}`);

    // 6. Suppression
    if (newProductId) {
        console.log(`\n6. DELETE /api/products/${newProductId} (Suppression)`);
        const deleteRes = await request({
            hostname: 'localhost',
            port: 3000,
            path: `/api/products/${newProductId}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        console.log(`Status: ${deleteRes.status}`, deleteRes.body.message);
    }
}

setTimeout(runTests, 2000);
