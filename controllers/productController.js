const Product = require("../models/Product");


// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {

    const { title, price, description, image } = req.body;

    if (!title || !price || !description || !image) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const product = await Product.create({
      title,
      price,
      description,
      image
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL PRODUCTS (SEARCH + PAGINATION)
exports.getProducts = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const query = {
      title: { $regex: search, $options: "i" }
    };

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
