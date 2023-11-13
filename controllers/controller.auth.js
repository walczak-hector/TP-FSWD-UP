require('mongoose');
const Usr = require('../models/model.user');
const jwt = require('jsonwebtoken');

const login = async(email,password) => {
    const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(password)
        .digest('hex');

    const result = await Usr.findOne({ email: email, isActive: true, password: cryptoPass });

    if (result){
        const payload = {
            userId: result.id,
            name: result.name,
            email: result.email
        };
        const expiresIn = '30s';

        const expirationTime = Math.floor(Date.now() / 1000) + parseInt(expiresIn, 10);
    
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn })
        return { token, expirationTime };
    }
    return null;
}

module.exports = {login}