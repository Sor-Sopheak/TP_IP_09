const Users = require('../models/users');
const bcrypt = require('bcrypt');
const moment = require('moment');

const register = async(params) => {
  const {email, username, firstName, lastName, password} = params;
  console.log(params);

  try{
    var existed = await Users.findOne({email});
    if(existed){
      throw "This email is already existed!!";
    }
    existed = await Users.findOne({ username })
    if(existed){
        throw "username is already used"
    }


    //Encrypt Password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    //create a new user
    const currentDate = moment().format('DD-MM-YYYY hh:mm:ss A');
    const newUser = {
      email,
      username,
      firstName,
      lastName,
      password: hash,
      createdAt: currentDate,
      updatedAt: currentDate
    }

    const createdUser = await Users.create(newUser)
    console.log(createdUser);

    return{
      success: true,
      data: createdUser
    }
  }catch (err){

    return{
      success: false,
      error: err || 'error'
    }
  }
}

module.exports = {
  register
}
