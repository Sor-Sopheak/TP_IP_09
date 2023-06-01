
const joiValidation = (schema) => {
    return async(req, res, next) => {
        try {
            const body = req.body;
            console.log(body);
            await schema.validateAsync(body);
        }catch(err){
            return res.json({
                success: false, 
                error: err.details?.[0]?.message || "Unknown error"})
        }
        next();
    }
}

module.exports = joiValidation;
