const express  = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API running on port ${PORT}!`);
    });
});