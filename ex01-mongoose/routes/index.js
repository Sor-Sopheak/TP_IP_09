var express = require('express');
var router = express.Router();

const { login } = require('../service/login');
const { register } = require('../service/register');

//Home page
router.get('/', function(req, res, next) {
    console.log("router up");
    res.send("Hello, this is API");
})

// Login route
router.post('/login', async (req,res,next) => {
  const {email, password} = req.body;
  const result = await login(email, password);
  res.json(result);
});

router.post('/register', async(req, res, next) => {
  const createdUser = await register(req.body);
  res.json(createdUser);
})

module.exports = router;