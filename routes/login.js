const express = require("express");
const router = express.Router();
const sign = require('jwt-encode');
const jwt_decode = require('jwt-decode');

const Users = require("../models/users");


router.post("/", async (req, res) => {
    try {
        const foundUser = await Users.findOne({ email: req.body.email });
        var passDecode = jwt_decode(req.body.pass);
        console.log("passdecode1231223123123arton", foundUser)
        if (foundUser?.password == passDecode) {
            const secret = 'marinairPopaj';
            const data = {
                id: foundUser?._id,
                role: foundUser?.role,
                email: foundUser?.email
            }
            let jwt = sign(data, secret);
            console.log("tokeni qe me duhet", jwt);
            // console.log(decoded);
            res.json({ token: jwt });

        } else {
            res.json("Password is incorrect!");

        }





    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = router;