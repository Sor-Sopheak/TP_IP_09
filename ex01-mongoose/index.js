var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();


app.use(cors({
    origin: 'http://127.0.0.1:3000'
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to MongoDB
require('./db/db')()
  .then(() => {
    app.use(require('./routes'));

    // Start the server
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });