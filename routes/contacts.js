const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const { findByIdAndRemove } = require("../models/User");

//@route GET api/contacts
//@desc get all contacts
//@access private
router.get("/", auth, async (req,res) =>{ 
    try {
        const contacts = await Contact.find({user : req.user.id}).sort({date :-1});
        res.json(contacts);
    } catch (error) {
        console.log("ERROR IN GET:routes/contacts "+error);
        console.log("server error");
    }
});

//@route POST api/contacts
//@desc To Add a contact
//@access Private
router.post("/", 
            [
                 auth,
                 check("name","name is required").notEmpty()
            ], async (req,res) =>{ 
                // validationResult function checks whether 
                // any occurs or not and return an object 
                const errors = validationResult(req); 

                // If some error occurs, then this 
                // block of code will run 
                if (!errors.isEmpty()) { 
                    return res.status(400).json({"errors" : errors }) 
                } 

                const {name, email, phone, type} = req.body;

                try {
                    const newContact = new Contact({
                        name : name,
                        email : email,
                        phone : phone,
                        type: type,
                        user : req.user.id
                    });

                    const contact = await newContact.save();
                    res.json(contact);
                } catch (error) {
                    console.log("ERROR IN POST:routes/contact "+error);
                    console.log("server error");
                    return res.status(500).send("server error");
                }
    
});


//@route PUT api/contacts/:id
//@desc To update contacts
//@access Public
router.put("/:id",async (req,res) =>{ 
    const {name, email, phone, type} = req.body;
    

    //build contact object
    const contactfields = {};

    //check what exists in the req.body.{...} and se that
    if(name){contactfields.name = name;}
    if(email){contactfields.email = email;}
    if(phone){contactfields.phone = phone;}
    if(type){contactfields.type = type;}

    try {
        let contact = Contact.findById(req.params.id);
        //console.log(contact);
        
        if(!contact){res.status(404).json({msg : "not found"});}

        //if(contact.user.toString() !== req.user.id){res.json({msg: "access denied"})}

        contact = await Contact.findByIdAndUpdate(req.params.id,
                                             {$set:contactfields},
                                                {new:true});

         res.json(contact)                                       

    } catch (error) {
        console.log("ERROR IN PUT:routes/contact "+error);
        console.log("server error");
        return res.status(500).send("server error");
    }
});

//@route DELETE api/contacts/:id
//@desc To delete contacts
//@access Public

router.delete("/:id",async (req,res) =>{ 
    try {
        let contact = Contact.findById(req.params.id);
        //console.log(contact);
        
        if(!contact){res.status(404).json({msg : "not found"});}

        //if(contact.user.toString() !== req.user.id){res.json({msg: "access denied"})}

        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg : "contact deleted"});                                   

    } catch (error) {
        console.log("ERROR IN DELETE:routes/contact "+error);
        console.log("server error");
        return res.status(500).send("server error");
    }
});


module.exports = router;