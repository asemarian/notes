const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post("/notes", auth, async (req, res) => {
    try {
        const note = new Note({ ...req.body, author: req.user._id });
        await note.save();
        res.json(note);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

router.get("/notes", auth, async (req, res) => {
    try {
        const notes = await Note.find({ author: req.user._id });
        res.json(notes);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

router.patch("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send();
        note.title = req.body.title || note.title;
        note.body = req.body.body || note.body;
        note.updatedAt = req.body.updatedAt || note.updatedAt;
        await note.save();
        res.json(note);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

router.delete("/notes/:id", auth, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).send();
        res.json(note);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

module.exports = router;