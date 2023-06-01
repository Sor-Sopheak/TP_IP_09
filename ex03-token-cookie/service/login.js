const users = require('../models/users');
const bcrypt = require('bcrypt');

const login = async(email, password) =>{
    console.log(("n fnghfhf"));
    try {
        var existed = await users.findOne({email})
        var isPasswordCorrect = bcrypt.compareSync(password, existed.password);

        if(!existed){
            throw "Email is incorrected."
        } 
        if(!isPasswordCorrect){
            throw "Password is incorrected."
        }
        return {
            success: true,
            data: existed
        }
    } catch (err) {
        return {
            success: false,
            err: err
        }
    }
}

module.exports={
    login
}














// var express = require('express');
// var router = express.Router();
// var bcrypt = require('bcrypt');
// const User = require('../models/users');


// router.post('/', async function(req, res, next) {
//   const { username, password } = req.body;

//   try {
//     // Find the user by username
//     var user = await User.findOne({ username });

//     // If the user doesn't exist, return an error
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }

//     // Compare the entered password with the stored password
//     var passwordMatch = await bcrypt.compare(password, user.password);

//     // If the passwords don't match, return an error
//     if (!passwordMatch) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }

//     // Authentication successful
//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
