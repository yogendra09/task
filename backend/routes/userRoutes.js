const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/auth');
const userController = require('../controllers/userController');



router.post("/",isAuthenticated,userController.currentUser);
router.get("/getallusers",isAuthenticated,userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout",isAuthenticated,userController.logout);
router.get("/getmyorders",isAuthenticated,userController.getMyOrders);
router.post("/placeorder",isAuthenticated,userController.placeOrder);


module.exports = router;