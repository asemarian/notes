const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const noteRouter = require('./routes/notes');
const userRouter = require('./routes/users');
const app = express();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(express.json());
app.use(helmet());
app.use(noteRouter);
app.use(userRouter);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
}

app.listen(process.env.PORT, () => console.log("starting server"));