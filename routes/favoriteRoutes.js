const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require("../controllers/favoriteController");


// Add favorite
router.post("/:id", authMiddleware, addFavorite);


// Remove favorite
router.delete("/:id", authMiddleware, removeFavorite);


// Get favorites
router.get("/", authMiddleware, getFavorites);


module.exports = router;
