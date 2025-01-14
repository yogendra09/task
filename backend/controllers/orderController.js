const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({
    adminId: req.id,
  });
  if (!products) return next(new ErrorHandler("product not found", 401));

  const orders = await Order.find({
    items: {
      $elemMatch: {
        productId: {
          $in: products.map((product) => product._id),
        },
      },
    },
  }).populate("items.productId", "name");

  res
    .status(200)
    .json({
      status: true,
      data: { rows: orders },
      message: "order fetched successfully",
    });
});


exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("order not found", 401));
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedOrder) return next(new ErrorHandler("order not found", 401));
  
  res
    .status(200)
    .json({ status: true, data: updatedOrder, message: "order updated" });
});