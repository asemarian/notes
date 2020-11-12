const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Note = require("../models/Note");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/users/signup", async (req, res) => {
	try {
		let user = await User.findOne({ username: req.body.username });
		if (user)
			return res.status(400).send({ error: "Username already taken" });
		if (req.body.username.length < 4)
			return res
				.status(400)
				.send({ error: "Username must be at least 4 characters long" });
		if (!/^[a-z0-9_]*$/i.test(req.body.username))
			return res.status(400).send({
				error: "Username cannot contain special characters",
			});
		if (req.body.password.length < 4)
			return res
				.status(400)
				.send({ error: "Password must be at least 4 characters long" });
		user = new User(req.body);
		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
		user.tokens.push(token);
		await user.save();
		res.json({ username: user.username, token });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user)
			return res.status(400).send({ error: "Username does not exist" });
		const password = await bcrypt.compare(req.body.password, user.password);
		if (!password)
			return res.status(400).send({ error: "Invalid password" });
		const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
		user.tokens.push(token);
		await user.save();
		res.json({ username: user.username, token });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

router.post("/users/logout", auth, async (req, res) => {
	req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
	await req.user.save();
	res.send({ message: "User successfully logged out" });
});

router.post("/users/logout-everywhere", auth, async (req, res) => {
	req.user.tokens = [];
	await req.user.save();
	res.send({ message: "User successfully logged out on all devices" });
});

router.post("/users/validate-token", async (req, res) => {
	try {
		const token = req.get("Authorization").replace("Bearer ", "");
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(id);
		if (user && user.tokens.includes(token)) {
			res.json({
				isValid: true,
			});
		} else {
			res.json({
				isValid: false,
			});
		}
	} catch (e) {
		res.status(401).send({ error: e.message });
	}
});

router.delete("/users/", auth, async (req, res) => {
	try {
		await Note.deleteMany({ author: req.user._id });
		await User.deleteOne({ _id: req.user._id });
		res.send({ message: "User data successfully deleted" });
	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

module.exports = router;
