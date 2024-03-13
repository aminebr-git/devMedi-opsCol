const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({

    name : {
        type:String,
        required:'Name is required'
    },
    code : {
        type:String,
        required:'code is require'
    },
   
},
{
    timestamps: true, // Cela ajoute automatiquement les champs createdAt et updatedAt à votre schéma
  }
);

module.exports = mongoose.model('Chatroom' , chatroomSchema);