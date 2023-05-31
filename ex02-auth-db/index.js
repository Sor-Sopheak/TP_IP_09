var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const User = require('../ex02-auth-db/models/users');

app.use(cors({
    origin: 'http://127.0.0.1:3000'
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Connect to MongoDB
require('./db/db')()
  .then(() => {
    app.use(require('./routes'));
  
    // Login Route
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const user = await User.login(email, password);
        if(user){
          res.status(200).json({message: 'Login successful'});
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
    });

    // Start the server
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
