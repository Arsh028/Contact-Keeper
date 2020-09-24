const express = require("express");

const connectdb = require("./config/db");

const app = express();

//connect to database
connectdb();

app.use(express.json({extended : false}));

app.get("/",function(req,res){
    res.json({msg:"welcome to API"});
});

//define routes
app.use("/api/users",require("./routes/users"));

app.use("/api/auth",require("./routes/auth"));

app.use("/api/contacts",require("./routes/contacts"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started on port " + PORT));