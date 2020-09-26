const express = require("express");
const router = express.Router();
//Validate data
const { check, validationResult } = require('express-validator');
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("config");

const bcrypt = require('bcrypt');
const saltRounds = 10;

//@route POST api/users
//@desc To register user
//@access Public
router.post("/",
    [ 
        check('email', 'Email length should be 10 to 30 characters') 
                        .isEmail().isLength({ min: 10, max: 30 }), 
        check('name', 'Name length should be 1 to 20 characters') 
                        .isLength({ min: 1}), 
        check('password', 'Password length should be 8 to 10 characters') 
                        .isLength({ min: 8, max: 10 }) 
    ],async (req,res) =>{ 
        // validationResult function checks whether 
        // any occurs or not and return an object 
        const errors = validationResult(req); 
    
        // If some error occurs, then this 
        // block of code will run 
        if (!errors.isEmpty()) { 
            return res.status(400).json({"errors" : errors }) 
        } 

        //to store info of post request
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne( {email : email} );
            //if user already exist
            if(user)
            {
                return res.status(400).json({ msg : "user already exists"});
            }

            //creating a new user in db and hashing
            user = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(saltRounds, function(err, salt) {
                if(err){throw err;}
                bcrypt.hash(user.password, salt, function(err, hash) {
                    user.password = hash;
                });
            });
            user.save();
            //END-creating a new user in db and hashing
            
            //generate a token using jwt
            const payload = {
                user : {
                    id : user.id
                }
            };

            //sign in user token
            jwt.sign(payload, config.get("TokenSECRET"),
                function(err, token) 
                {
                    if(err){throw err;}
                    res.json({token});
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).send("server error");
        }
    });

module.exports = router;