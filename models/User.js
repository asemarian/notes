const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		minlength: 4,
		maxlength: 32,
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
	},
	tokens: [
		{
			type: String,
		},
	],
});

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
