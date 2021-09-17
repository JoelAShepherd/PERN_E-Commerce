module.exports = (req, res, next) => {
    try {
        if(req.user){
            console.log('User IS google Authed: ', req.user)
            next();
        } else{
            console.log("User IS NOT google Authed")
            next();
        }
    } catch(err){
        console.log('Err in googlecheck middleware: ', err)
    }

}