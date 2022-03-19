import userModel from "../models/user.js";
import token from "../services/token-services.js";
import productModel from "../models/products.js";
class Controller {
  async signup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        statusCode: 400,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        statusCode: 400,
        success: false,
      });
    }
    const newUser = await userModel.create({ name, email, password });
    return res.status(200).json({
      message: "User created successfully",
      statusCode: 200,
      success: true,
      token: token(newUser._id),
    });
  }
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        statusCode: 400,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        statusCode: 400,
        success: false,
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        statusCode: 400,
        success: false,
      });
    }
    return res.status(200).json({
      message: "User logged in successfully",
      statusCode: 200,
      success: true,
      token: token(user._id),
    });
  }
  async verifyUser(req, res) {
    const { id } = req.data;
    // Verify userToken
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        statusCode: 400,
        success: false,
      });
    }
    return res.status(200).json({
      message: "User verified successfully",
      statusCode: 200,
      success: true,
      data: {
        name: user.name,
        email: user.email,
      },
      address: user.address,
    });
  }
  async categoryWiseProducts(req, res) {
    const { category } = req.params;
    const regex = new RegExp(category, "i");
    const products = await productModel.find({ category: regex });
    products.length === 0
      ? res.status(400).json({
          message: "No products found",
          statusCode: 400,
          success: false,
        })
      : res
          .status(200)
          .json({ message: "Products found", statusCode: 200, data: products });
  }
  async addProduct(req, res) {
    const { title, description, price, category, subCategory, image } =
      req.body;
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !image
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        statusCode: 400,
        success: false,
      });
    }
    const newProduct = await productModel.create(req.body);
    return res.status(200).json({
      message: "Product added successfully",
      statusCode: 200,
      success: true,
      data: newProduct,
    });
  }
  async eachProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(400).json({
          message: "Product does not exist",
          statusCode: 400,
          success: false,
        });
      }
      return res.status(200).json({
        message: "Product found",
        statusCode: 200,
        success: true,
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Product does not exist",
        statusCode: 400,
        success: false,
      });
    }
  }
  async addAddress(req, res) {
    const { id } = req.data;
    try {
      userModel
        .updateOne(
          { _id: id },
          {
            $push: {
              address: {
                $each: [req.body],
              },
            },
          }
        )
        .exec()
        .then(async () => {
          const user = await userModel.findById(id);
          return res.json({
            message: "Address added successfully",
            statusCode: 200,
            success: true,
            data: user.address,
          });
        });
    } catch (error) {
      return res.json({
        message: "Failed to Update",
        data: error,
      });
    }
  }
}

export default new Controller();
