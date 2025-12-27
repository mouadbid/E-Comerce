const http = require('http');

console.log('Testing connection to http://localhost:3000/api/users ...');

const req = http.get('http://localhost:3000/api/users', (res) => {
    let data = '';

    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('BODY:', data);
        console.log('--- TEST FINISHED ---');
    });

});

req.on('error', (e) => {
    console.error(`PROBLEM WITH REQUEST: ${e.message}`);
});

req.end();
