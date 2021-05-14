const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

// "backend-frontend conversations (data exchange)"
app.post('/api', (request, response) => {
    const unit = request.body;
    // "backend database query"
    database.find(unit, (err, data) => {
        if (err) {
          response.end();
          return;
        }
        response.json(data);
      });
  });