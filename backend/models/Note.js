const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        required: true,
        trim: true,
        type: String,
    },
    body: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

