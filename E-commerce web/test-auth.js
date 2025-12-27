const http = require('http');

// Helper to make requests
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
    console.log('--- Démarrage des tests d\'authentification ---\n');

    // 1. Inscription
    const uniqueEmail = `test_${Date.now()}@example.com`;
    console.log(`1. Tentative d'inscription avec ${uniqueEmail}...`);
    const registerRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, {
        nom: 'Test User',
        email: uniqueEmail,
        mot_de_passe: 'password123'
    });
    console.log(`Status: ${registerRes.status}`, registerRes.body);

    if (registerRes.status !== 201 && registerRes.status !== 200) {
        console.error('Échec de l\'inscription.');
        return;
    }

    // 2. Connexion
    console.log('\n2. Tentative de connexion...');
    const loginRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, {
        email: uniqueEmail,
        mot_de_passe: 'password123'
    });
    console.log(`Status: ${loginRes.status}`);

    if (loginRes.status !== 200 || !loginRes.body.token) {
        console.error('Échec de la connexion.');
        return;
    }
    const token = loginRes.body.token;
    console.log('Token reçu.');

    // 3. Accès protégé
    console.log('\n3. Test d\'accès à une route protégée (/api/profile)...');
    const profileRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/profile',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(`Status: ${profileRes.status}`, profileRes.body);

    if (profileRes.status === 200) {
        console.log('\n--- TESTS RÉUSSIS ---');
    } else {
        console.error('\n--- TEST ÉCHOUÉ SUR LA ROUTE PROTÉGÉE ---');
    }
}

// Wait for server to potentially start
setTimeout(runTests, 2000);
