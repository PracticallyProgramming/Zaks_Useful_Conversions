const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

