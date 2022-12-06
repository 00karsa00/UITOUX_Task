var mongoose = require("mongoose");

var Products = new mongoose.Schema({
  title: String,
  imageUrl: String,
  price: Number,
  offerPre: Number,
  sellerId: String,
  sellerName: String,
  review:{ type: Number, default: 0 },
  numReview:{ type: Number, default: 0 },
  totalQty: Number,
  soldQty: { type: Number, default: 0 }, 
  skuId: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", Products, "Products");
