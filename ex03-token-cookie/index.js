var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(session({
  secret: 'my-secret',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  name: 'token',
  cookie: {
    message: 1000*60*60*2, //2hours
    sameSite: true,
    secure: false
  }
}))

app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Hello Sor Sopheak</h1>')
})

// Connect to MongoDB
require('./db/db')()
  .then(() => {
    app.use(require('./routes/index'));

    // Start the server
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
