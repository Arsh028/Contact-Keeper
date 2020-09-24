const express = require("express");
const router = express.Router();

//@route GET api/contacts
//@desc get all contacts
//@access Public

router.get("/",(req,res) =>{ 
    res.send("get all contacts");
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