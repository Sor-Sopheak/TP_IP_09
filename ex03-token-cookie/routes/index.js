var express = require('express');
var router = express.Router();
const {signInSchema, signUpSchema} = require('../schemas/index');
const { login } = require('../service/login');
const { register } = require('../service/register');
const { logout } = require('../service/logout');
const joiValidation = require('../middlewares/joiValidation');
const jwt = require('jsonwebtoken');
const {ensureSignedIn, ensureSignedOut} = require('../middlewares/auth');

//Logout
router.post('/logout',ensureSignedIn, async(req, res) => {
  try {
    console.log(req.session.jwt);
    const result = logout(req.session);
    console.log("cookie", req.cookies);
    res.clearCookie('token');
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

// Login route
router.post('/login',ensureSignedOut,joiValidation(signInSchema), async(req,res,next) => {
  try {
    console.log('email')
    const {email, password} = req.body;
    const user = await login(email, password);
    const token = jwt.sign(req.body,"Secret");
    if(req.session.jwt){
      res.json({
        success: false,
        error: "You are already singed in!"
      })
    }
    
  
    // store token in session
    req.session.jwt = token;
  
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({message: err.message});
  }
  
});

//register
router.post('/register', ensureSignedOut,joiValidation(signUpSchema), async(req, res, next) => {
  try {
    const createdUser = await register(req.body);
    res.json(createdUser);
  } catch (error) {
    console.log(error);
  }
  
})

module.exports = router;