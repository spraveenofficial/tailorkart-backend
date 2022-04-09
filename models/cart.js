import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userCartSchema = new Schema({
  userId: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  cart: [],
  wishlist: [],
});

const UserCart = mongoose.model("UserCart", userCartSchema);

export default UserCart;
