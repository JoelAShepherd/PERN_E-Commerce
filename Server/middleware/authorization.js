const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
    try{

        //get token
        const jwtToken = req.header("token")

        if (!jwtToken) {
            return res.status(403).json("Not Authorized")
        }

        //check token validity

        const payload = jwt.verify(jwtToken, process.env.jwtsecret)
        req.user = payload.user;

        next();

    } catch(err){
        console.log(err.message);
        return res.status(403).json("Not Authorized")
    }
}