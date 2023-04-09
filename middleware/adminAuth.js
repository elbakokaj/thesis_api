const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode")
const config = require("config");


function studentAuth(req, res, next) {
    const authorization = req.headers.authorization;
    // console.log("authorizationauthorizationauthorization", authorization)
    if (authorization) {
        const decode = jwtDecode(authorization)
        if (decode?.role == "admin") {
            // console.log("you are a admin ")
            // console.log('decoded', decode)
            req._id = decode?.id;
            req.email = decode?.email;
            req.role = decode?.role;
            next(); // call next() to move to the next middleware or route
        } else {
            res.status(401).json("You are not a admin!");
        }
    } else {
        res.status(401).json("You are not authenticated!");
    }
}


module.exports = studentAuth;