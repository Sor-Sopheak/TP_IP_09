const Joi = require('joi');

module.exports = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirm_password: Joi.ref('password'),
    email: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
}).with('password', 'confirm_password');
    
