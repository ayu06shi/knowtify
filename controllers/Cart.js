const Cart = require("../models/Cart");
const Course = require("../models/Course");

// 🛒 Fetch Cart
exports.fetchCartController = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.json({ items: [], total: 0, totalItems: 0 });
      }
  
      const total = cart.items.reduce((acc, item) => acc + item.price, 0);
  
      return res.json({
        items: cart.items.map((item) => ({
          _id: item.courseId, // still sending ID so frontend can match
          courseName: item.courseName,
          price: item.price,
          thumbnail: item.thumbnail,
          ratingAndReviews: item.ratingAndReviews,
          category: item.category,
          quantity: item.quantity,
        })),
        total,
        totalItems: cart.items.length,
      });
      console.log("fetchCart hit")
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  

// ➕ Add to Cart
exports.addToCartController = async (req, res) => {
    try {
      console.log("Add to cart controller is hit");
      const { courseId } = req.body;
      const userId = req.user.id;
  
      // Get full course details
      const course = await Course.findById(courseId)
        .populate("category") // To access category name
        .populate("ratingAndReviews"); // Optional: if you want reviews too
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      // Find the user's cart
      let cart = await Cart.findOne({ userId });
  
      const courseAlreadyInCart = cart?.items.some(
        (item) => item.courseId.toString() === courseId
      );
  
      if (courseAlreadyInCart) {
        return res.status(400).json({ error: "Course already in cart" });
      }
  
      const newCartItem = {
        courseId: course._id,
        courseName: course.courseName,
        price: course.price,
        thumbnail: course.thumbnail,
        ratingAndReviews: course.ratingAndReviews || [],
        category: course.category?.name || "General",
        quantity: 1,
      };
  
      if (!cart) {
        // Create a new cart for the user
        cart = await Cart.create({
          userId,
          items: [newCartItem],
          totalItems: 1,
          totalAmount: course.price,
        });
      } else {
        // Add new course item to the existing cart
        cart.items.push(newCartItem);
        cart.totalItems = cart.items.length;
        cart.totalAmount += course.price;
  
        await cart.save();
      }
  
      return res.status(200).json({ message: "Course added to cart successfully", cart });
    } catch (err) {
      console.error("Error adding to cart:", err);
      return res.status(500).json({ error: err.message });
    }
  };
  

// ❌ Remove from Cart
exports.removeFromCartController = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.courseId.toString() !== courseId
    );
    await cart.save();

    return res.json({ message: "Course removed from cart" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 🧹 Clear Cart
exports.clearCartController = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    return res.json({ message: "Cart cleared" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};