var express = require('express');
const moment = require('moment');
var router = express.Router();
const {signInSchema, signUpSchema} = require('../schemas/index');
const { login } = require('../service/login');
const { register } = require('../service/register');
const joiValidation = require('../middlewares/joiValidation');


//Homepage route
router.get('/', function(req, res, next) {
    console.log("Router working");
    res.send("Hello From APIs");
})

// Login route
router.post('/login', joiValidation(signInSchema), async(req,res,next) => {
  const {email, password} = req.body;
  const result = await login(email, password);
  res.json(result);
});

//register
router.post('/register', joiValidation(signUpSchema), async(req, res, next) => {
  const createdUser = await register(req.body);
  res.json(createdUser);
})

module.exports = router;