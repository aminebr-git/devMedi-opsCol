var express = require('express');
var router = express.Router();
const {catchErrors} = require("../handlers/errorHandler")
const usercontroller = require("../controllers/userController")
const authMiddleware = require('../middlewares/auth'); // Adjust path as necessary


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", catchErrors(usercontroller.login));
router.post("/register", catchErrors(usercontroller.register));
// Fetch user information
router.get('/me',authMiddleware, catchErrors(usercontroller.getUserInfo));


module.exports = router;
