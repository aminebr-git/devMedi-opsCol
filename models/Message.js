const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    chatroom : {
        type:mongoose.Schema.Types.ObjectId,
        required:'chatroom is required',
        ref: "chatroom",
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        required:'user is required',
        ref:"User",
    },
    message : {
        type:String,
        required:'message is required',
    }
   
},
{
    timestamps: true, // Cela ajoute automatiquement les champs createdAt et updatedAt à votre schéma
  }
);

module.exports = mongoose.model('Message' , messageSchema);