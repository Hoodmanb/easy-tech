const express = require("express");
const categoryRouter = express.Router();
const category = require("../controllers/category");
const verifyToken = require("../middleware/verifyToken")

// Create a new category
categoryRouter.post("/", verifyToken, category.createCategory);

// Get all categories
categoryRouter.get("/", category.getCategories);

// Get a specific category by ID
categoryRouter.get("/:id", category.getCategoryById);

// Update a category
categoryRouter.put("/:id", verifyToken, category.updateCategory);

// Delete a category
categoryRouter.delete("/:id", verifyToken, category.deleteCategory);

module.exports = categoryRouter;
