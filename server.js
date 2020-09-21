const express = require("express");

const app = express();

app.get("/",function(req,res){
    res.json({msg:"welcome to API"});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started on port " + PORT));