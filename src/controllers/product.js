// create a product
const Product = require("../models/product")
const slugify = require("slugify")

const createProduct = async (req, res) => {
    try {
        const { title, price } = req.body
        // const {image} = req.file

        // create a validation just in case the front end developer doesn't test for empty fields, use joi to validate
        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: "Title required" })
        }
        if (!price) {
            return res.status(400).json({ success: false, message: "Price required" })
        }

        // Check if product exists already or is taken
        const existingProduct = await Product.findOne({ title })
        if (existingProduct) {
            return res.status(400).json({ success: false, message: "Product already exists" })
        }

        // creating a new product object
        const product = new Product({ ...req.body, slug: slugify(title) })

        // if image is included, handle image upload

        // save the new product to the database
        await product.save()
        return res.json({ success: true, product })
    }

    catch (err) {
        console.log("Error creating product", err.message);
        return res.status(500).json({ message: "Product Registration failed", err })
    }
}

// creating a function to get all products
const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find()
        res.json({ success: true, message: "Products retrieved successfully", product })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// Creating a function to get one product
const getOneProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById({ _id: productId })
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        res.json({ success: true, message: "Product retrieved successfully", product })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

// title : Blard/Product/One
// The slug will be : blard-product-one

const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({ slug })
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        res.json({ success: true, message: "Product retrieved successfully", product })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { title, price, desc, isAvailable, slug} = req.body;

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        if(title){
            const slugTitle = slugify(title)
            product.slug = slugify(title) || product.slug
        }
        // Updating the products
        product.title = title || product.title;
        product.price = price || product.price;
        product.desc = desc || product.desc;
        product.isAvailable = isAvailable || product.isAvailable;

        // Save the updated product
        const updatedProduct = await product.save();
        res.json({ success: true, message: "Product updated successfully", updatedProduct })
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
       
        // Check if product exists
        const product = await Product.deleteOne(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        return res.json({ success: true, message:"Product deleted successfully" })
    }

    catch (err) {
        console.log("Error deleting product", err.message);
        return res.status(500).json({ message: "Product deletion failed", err })
    }
}
module.exports = { createProduct, getAllProducts, getOneProduct, getProductBySlug, updateProduct, deleteProduct }