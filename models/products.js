import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  fastDelivery: {
    type: Boolean,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
