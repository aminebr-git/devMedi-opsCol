const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  
  content: {
    type:String,
    required:'description is required',
},
  user: {
    type:mongoose.Schema.Types.ObjectId,
    required:'user is required',
    ref:"User",
},
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
},
{
    timestamps: true, // Cela ajoute automatiquement les champs createdAt et updatedAt à votre schéma
  }
);

module.exports = mongoose.model('Question', questionSchema);