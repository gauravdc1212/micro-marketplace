const User = require("../models/User");
const Product = require("../models/Product");


// ADD FAVORITE
exports.addFavorite = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const productId = req.params.id;

    if (!user.favorites.includes(productId)) {

      user.favorites.push(productId);

      await user.save();
    }

    res.json({
      message: "Added to favorites"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// REMOVE FAVORITE
exports.removeFavorite = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const productId = req.params.id;

    user.favorites = user.favorites.filter(
      fav => fav.toString() !== productId
    );

    await user.save();

    res.json({
      message: "Removed from favorites"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET FAVORITES
exports.getFavorites = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("favorites");

    res.json(user.favorites);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
