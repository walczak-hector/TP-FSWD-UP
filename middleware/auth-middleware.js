const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("No autorizado");
    }
}

module.exports = { verify };
