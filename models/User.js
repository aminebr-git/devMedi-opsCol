const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name : {
        type:String,
        required:'Name is required'
    },
    email:{
        type:String,
        required:'email is required'
    },
    password:{
        type:String,
        required:'password is required'
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('User', userSchema);