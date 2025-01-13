const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/auth');
const { currentUser, register, login, logout, getAllUsers, sendForgetPasswordOtp } = require('../controllers/userController');



router.post("/",isAuthenticated,currentUser);
router.get("/getallusers",isAuthenticated,getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.post("/logout",isAuthenticated,logout);




module.exports = router;