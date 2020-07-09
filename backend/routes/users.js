const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post("/users/signup", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) return res.status(400).send({ error: "Username already taken" });
        if (req.body.password.length < 4) return res.status(400).send({ error: "Password should be at least 4 characters long" });
        user = new User(req.body);
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        user.tokens.push(token);
        await user.save();
        res.json({ username: user.username, token });
    } catch (e) {
        console.log(e.message)
        res.status(500).send();
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send({ error: "Username does not exist" });
        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) return res.status(400).send({ error: "Invalid password" });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        user.tokens.push(token);
        await user.save();
        res.send({ username: user.username, token });
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/logout", auth, async (req, res) => {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token);
    await req.user.save();
    res.send({
        success: "User successfully logged out"
    });
});

router.post("/users/logoutAll", auth, async (req, res) => {
    req.user.tokens = [];
    await req.user.save();
    res.send({
        success: "User successfully logged out on all devices"
    });
});

module.exports = router;