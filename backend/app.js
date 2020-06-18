const express = require('express');
const mongoose = require('mongoose');

const noteRouter = require('./routes/notes');
const userRouter = require('./routes/users');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/notes-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(noteRouter);
app.use(userRouter);

app.listen(3000, () => console.log("Server is up and running"));