const express = require("express");
const router = express.Router();
const {
  fetchCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
} = require("../controllers/Cart");
const { auth } = require("../middleware/auth");

// All routes require authentication
router.get("/fetch", auth, fetchCartController);
router.post("/add", auth, addToCartController);
router.post("/remove", auth, removeFromCartController);
router.post("/clear", auth, clearCartController);

module.exports = router;