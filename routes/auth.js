const express = require("express");
const router = express.Router();

//Validate data
const { check, validationResult } = require('express-validator');
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const bcrypt = require('bcrypt');
const saltRounds = 10;

//@route GET api/auth
//@desc get logged in user
//@access Private
router.get("/",auth, async (req,res) =>{ 
    try {
        const user = await User.find(req.user).select("-password");
        //const user = await User.findOne({ '_id': req.user.id})
        //const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
});


//@route POST api/auth
//@desc log in user
//@access Private
router.post("/",
    [
        check('email', 'Email length should be 10 to 30 characters') 
                        .isEmail().isLength({ min: 10, max: 30 }),
        check('password', 'Password length should be 8 to 10 characters') 
                        .isLength({ min: 8, max: 10 }) 
    ],async (req,res) =>{ 
        const errors = validationResult(req); 
        // If some error of validation occurs, then this 
        // block of code will run 
        if (!errors.isEmpty()) 
        { 
            return res.status(400).json({"errors" : errors }) 
        } 
        try 
        {
            const {email, password} = req.body;

            let user = await User.findOne( {email : email} );
            //if user already exist
            if(!user)
            {
                return res.status(400).json({ msg : "Invalid credentials"});
            }

            //check password
            bcrypt.compare(password, user.password, function(err, result) {
                if(result == false)
                {
                    //if password matches
                    const payload = {
                        users : {
                            id : user.id
                        }
                    };
                
                    //sign in user token
                    jwt.sign(payload, config.get("TokenSECRET"),
                        function(err, token) 
                        {
                            if(err){throw err;}
                            //console.log(token);
                            res.json({token});
                        }
                    );   
                }
                else{return res.status(400).json({ msg : "Invalid credentials"});}
            });

        } catch (error) {
            console.log(error);
            res.status(500).send("server error");
        }

});
module.exports = router;