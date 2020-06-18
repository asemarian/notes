const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    try {
        const token = req.get("Authorization").replace("Bearer ", "");
        const { id } = jwt.verify(token, "privatekey");
        const user = await User.findById(id);
        if (user && user.tokens.includes(token)) {
            req.user = user;
            req.token = token;
            next();
        } else {
            throw new Error("You are not logged in.");
        }
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
}

module.exports = auth;