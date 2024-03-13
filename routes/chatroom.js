const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controllers/chatroomController");
const express = require('express');
const cors = require('cors');

const auth = require("../middlewares/auth");
const Message = require('../models/Message');
const Chatroom = require('../models/chatroom');
const multer = require("multer");
const path = require('path'); // Import the path module


//router.get("/", auth, catchErrors(chatroomController.getAllChatrooms));
router.get("/",  chatroomController.getAllChatrooms);
router.post("/", auth, catchErrors(chatroomController.createChatroom));
router.delete("/:id",  chatroomController.deleteChatroom);
router.put('/:id', chatroomController.updatechat);

      
router.get('/:chatroomId/messages', async (req, res) => {
    try {
        const { chatroomId } = req.params;
        // Adjust the query to match the 'chatroom' field instead of 'chatroomId'
        const messages = await Message.find({ chatroom: chatroomId }).populate('user', 'name');
        res.json(messages);
    } catch (error) {
        console.error('Failed to get messages:', error);
        res.status(500).json({ message: 'Failed to get messages' });
    }
});

router.get('/api/chatrooms/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // Fetch distinct chatroom IDs where the user has sent messages
        const chatroomIds = await Message.find({ user: userId }).distinct('chatroom');
        
        // Now fetch the details of these chatrooms
        const chatroomsDetails = await Chatroom.find({ 
            '_id': { $in: chatroomIds } 
        });
        
        res.json(chatroomsDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});


// Setup multer for file handling
// Set up storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Route to handle file upload
  router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
      res.json({ message: "File uploaded successfully", filepath: req.file.path });
    } else {
      res.status(400).send("Error uploading file");
    }
  });

  // show users list for each chatroom
  router.get('/:chatroomId/users', async (req, res) => {
    const { chatroomId } = req.params;

    try {
        const users = await chatroomController.getUsersInChatroom(chatroomId);
        console.log("Users in chatroom:", users);
        res.json(users);
    } catch (error) {
        console.error("Failed to get users in chatroom:", error);
        res.status(500).send({ error: error.message });
    }
});



  router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  router.get('/download/:filename', (req, res) => {
    // Construct the file's path
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    
    // Set the filename for the browser to use for the downloaded file
    // Optional: You can also set a different name to be used upon download
    const fileName = req.params.filename; // or any custom name you want to set
    
    // Trigger the download
    res.download(filePath, fileName, (err) => {
      if (err) {
        // Handle error, but don't expose file system path
        // Log the error internally (console.log or better logging mechanism)
        console.error(err);
        res.status(404).send('File was deleted');
      }
      // No need to send a response here, `res.download()` handles it
    });
  });
  
module.exports = router;