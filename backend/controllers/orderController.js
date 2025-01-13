const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Order = require("../models/orderModel");
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
      const {} = req.body;

    res.status(200).json({ message: "order created", status: true });
});