const ensureSignedIn = (req, res, next) => {
    // console.log(req.session.jwt);
    if(!req.session.jwt) {
        // console.log("hi");
        return res.json({
            success: false,
            error: `You must sign in !`
        })
    }
    next();
}

const ensureSignedOut = (req, res, next) => {
    if(req.session.jwt){
        return res.json({
            success: false,
            error: `You already signed in!!`
        })
    }
    next();
}

module.exports = {
    ensureSignedIn,
    ensureSignedOut
}