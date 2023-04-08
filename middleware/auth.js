const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode")
const config = require("config");

// function userAuth(req, res, next) {
//     const authorization = req.headers["Authorization"];
//     if (authorization) {
//         const decode = jwtDecode(authorization)
//         req?._id = `ObjectId('${decode?.id}')`;
//         req.email = decode?.email;
//         req.role = decode?.role;
//     } else {
//         res.status(401).json("You are not authenticated!");
//     }
// }
function userAuth(req, res, next) {
    const authorization = req.headers.authorization;
    // console.log("authorizationauthorizationauthorization", authorization)
    if (authorization) {
        const decode = jwtDecode(authorization)
        req._id = decode?.id;
        req.email = decode?.email;
        req.role = decode?.role;
        next(); // call next() to move to the next middleware or route
    } else {
        res.status(401).json("You are not authenticated!");
    }
}


module.exports = userAuth;