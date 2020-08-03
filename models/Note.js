const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    title: {
        type: String,
    },
    body: {
        type: String
    },
    createdAt: {
        required: true,
        type: Number
    },
    updatedAt: {
        required: true,
        type: Number
    },
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;