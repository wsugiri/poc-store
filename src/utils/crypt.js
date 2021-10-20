const jwt = require('jsonwebtoken');
const hash = require('hash.js');
const key = process.env.TOKEN_JWT_SECRET || 'm0Co@Cad3My';

module.exports = {
    hash: (text) => hash.sha256().update(text).digest('hex').toUpperCase(),
    sign: (data) => {
        const expiresIn = process.env.TOKEN_ACCESS_LIFETIME || 60 * 10;
        return jwt.sign(data, key, { expiresIn: parseInt(expiresIn, 10) });
    },
    verify: (token) => {
        return jwt.verify(token, key)
    },
    decode: (token) => jwt.decode(token)
};
