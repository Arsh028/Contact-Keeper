const express = require("express");
const router = express.Router();

//@route POST api/users
//@desc To register user
//@access Public

router.get("/",(req,res) =>{ 
    res.send("register a user")
});
module.exports = router;