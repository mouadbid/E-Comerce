const http = require('http');

function testUrl(url) {
    console.log(`\nTesting ${url} ...`);
    const req = http.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            console.log(`[${res.statusCode}] ${url}`);
            if (res.statusCode === 200) {
                console.log('SUCCESS! Data length:', data.length);
                console.log('Sample:', data.substring(0, 100));
            } else {
                console.log('ERROR BODY:', data);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`FAILED to connect to ${url}: ${e.message}`);
    });
    req.end();
}

// Test IPv4 explicitly
testUrl('http://127.0.0.1:3000/api/users');
// Test localhost (might be IPv6)
testUrl('http://localhost:3000/api/users');
// Test Orders
testUrl('http://127.0.0.1:3000/api/orders');
// Test Direct Probe
testUrl('http://localhost:3000/test-direct');
