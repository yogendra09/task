const router = require("express").Router();
const {
  deleteProduct,
  getCartProducts,
  addProductToCart,
  removeProductFromCart,
  addUpdateProduct,
  getAllProductsWithPagination,
} = require("../controllers/productController");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");


// Product Routes
router.get("/getallproducts", getAllProductsWithPagination);
router.post("/addupdateproduct", isAuthenticated, isAdmin, addUpdateProduct);
// router.post("/updateproduct/:id", isAuthenticated, isAdmin, updateProduct);
router.post("/deleteproduct", isAuthenticated, isAdmin, deleteProduct);

// Cart Routes
router.get("/getcartproducts", isAuthenticated, getCartProducts);
router.post("/addproducttocart/:productId", isAuthenticated, addProductToCart);
router.post(
  "/removeproductfromcart/:productId",
  isAuthenticated,
  removeProductFromCart
);

module.exports = router;
