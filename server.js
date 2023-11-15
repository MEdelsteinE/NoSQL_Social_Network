const express = require('express');
const routes = require('./routes');

const app = express();

const db = require('./config/connection');

const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use('/api', routes);

db.once('open', () => {
    console.log('db now connected');
    app.listen(PORT, () => console.log('Server listening on', PORT));
})