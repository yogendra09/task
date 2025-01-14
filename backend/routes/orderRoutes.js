const { isAdmin, isAuthenticated } = require("../middlewares/auth");
const orderController = require("../controllers/orderController");
const router = require("express").Router();


router.get("/getallorders", isAuthenticated,isAdmin ,orderController.getAllOrders);
router.put("/updateorder/:id", isAuthenticated,isAdmin ,orderController.updateOrder);




module.exports = router;