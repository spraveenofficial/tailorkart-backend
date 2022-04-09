import UserCart from "../models/cart.js";

const addToCart = async (req, res) => {
  const { id } = req.data;
  const { productId, quantity } = req.body;
  const userCart = await UserCart.findOne({ userId: id });
  if (userCart) {
    const cart = userCart.cart;
    const product = cart.find(
      (item) => item.productId.toString() === productId
    );
    if (product) {
      product.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    await userCart.save();
  }
};

const getCart = async (req, res) => {
  const { id } = req.data;
  const userCart = await UserCart.findOne({ userId: id }).populate({
    path: "cart.productId",
    model: "Product",
  });
  res.json(userCart);
};

export { getCart, addToCart };
