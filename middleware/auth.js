const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = 
function(req,res,next)
{
    const token = req.header("x-auth-token");
    if(!token)
    {
        res.status(401).json({ msg : "auth denied"});
    }
    try {
        const decoded = jwt.verify(token,config.get("TokenSECRET"));
        // console.log("token = "+token);
        // console.log("decoded = "+decoded);
        // console.log("req.user = "+req.user);
        // console.log("decoded.user =" +decoded.user);
        req.user = decoded.user;
        next();

    } catch (error) {
        console.log("ERROR = "+error);
        res.status(401).json({"msg" : "invalid token"});
    }
}