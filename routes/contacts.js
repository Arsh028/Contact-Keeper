const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
//@route GET api/contacts
//@desc get all contacts
//@access Public

router.get("/", auth, async (req,res) =>{ 
    try {
        const contacts = await Contact.find({user : req.user}).sort({date :-1});
        res.json(contacts);
    } catch (error) {
        console.log("ERROR IN routes/contacts "+error);
        console.log("server error");
    }
    
});

//@route POST api/contacts
//@desc To Add a contact
//@access Public

router.post("/",(req,res) =>{ 
    res.send("Add a contact");
});


//@route PUT api/contacts/:id
//@desc To update contacts
//@access Public

router.put("/:id",(req,res) =>{ 
    res.send("update contacts");
});

//@route DELETE api/contacts/:id
//@desc To delete contacts
//@access Public

router.delete("/:id",(req,res) =>{ 
    res.send("To delete contacts");
});


module.exports = router;