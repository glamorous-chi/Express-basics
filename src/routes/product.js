// Creating a route
// import express
const express = require('express')
// import express from 'express'
const { getAllProducts,createProduct, getOneProduct,getProductBySlug,updateProduct, deleteProduct  } = require('../controllers/product')
// create express router
const router = express.Router()
// define your routes
router.post("/create", createProduct)
router.get("/all", getAllProducts)
router.get("/:productId", getOneProduct)
router.get("/slug/:slug", getProductBySlug)
router.put("/update/:productId", updateProduct)
router.delete("/delete/:productId", deleteProduct)



module.exports = router