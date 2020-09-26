const mongoose = require("mongoose");

//used to get global varaibles set in default.json
const config = require("config");

const mongoURL = config.get("mongoURI");

const connectdb = async () => 
{
    try
    {
        await mongoose.connect(mongoURL, {useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true ,useNewUrlParser: true });
        console.log("mongodb connected..");
    }
    catch(err)
    {
        console.log("inside catch of db file");
        console.log(err);
        process.exit(1);
    }
    
}

module.exports = connectdb;