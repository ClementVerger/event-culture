const crypto = require('crypto');

function generateSecretKey() {
    return crypto.randomBytes(32).toString('hex');
}

const secretKey = generateSecretKey();
console.log(`Your secret key: ${secretKey}`);
module.exports = 'azertyuiopqsdfghjklmwxcvbn123456';