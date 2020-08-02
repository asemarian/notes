const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const noteRouter = require('./routes/notes');
const userRouter = require('./routes/users');
const app = express();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(helmet());
app.use(noteRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));