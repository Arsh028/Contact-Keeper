const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user : { 
                type : mongoose.Schema.Types.ObjectId, ref : "users"    
            },
    name : { type : String, required : true, default : ""},
    email : { type : String, required : true, default : ""},
    phone : { type : String, default : "" },
    date : { type : Date, default : Date.now},
});

module.exports = mongoose.model("contact", contactSchema);