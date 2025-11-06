import Product from "../model/productModel.js";
import mongoose from "mongoose";
import uploadOnCloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
      return res.status(400).json({ message: "All 4 images are required." });
    }

    const [image1, image2, image3, image4] = await Promise.all([
      uploadOnCloudinary(req.files.image1[0].path),
      uploadOnCloudinary(req.files.image2[0].path),
      uploadOnCloudinary(req.files.image3[0].path),
      uploadOnCloudinary(req.files.image4[0].path),
    ]);

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);
    return res.status(201).json(product);

  } catch (error) {
    console.error("AddProduct error:", error);
    return res.status(500).json({ message: `AddProduct error: ${error.message}` });
  }
};

export const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    console.error("ListProduct error:", error);
    return res.status(500).json({ message: `ListProduct error: ${error.message}` });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ message: "Product removed successfully", product });
  } catch (error) {
    console.error("RemoveProduct error:", error);
    return res.status(500).json({ message: `RemoveProduct error: ${error.message}` });
  }
};
