
const joiValidation = (schema) => {
    return async(req, res, next) => {
        try {
            console.log(schema);
            const body = req.body;
            await schema.validateAsync(body);
        }catch(err){
            return res.json({success: false, error: err})
        }
        next();
    }
}

module.exports = joiValidation;
