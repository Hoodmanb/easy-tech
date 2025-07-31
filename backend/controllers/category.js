const Category = require("../models/Category");

// CREATE
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const saved = await category.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("❌ Create Category Error:", error);
        res.status(500).json({ message: "Failed to create category", error });
    }
};

// GET ALL
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("❌ Fetch Categories Error:", error);
        res.status(500).json({ message: "Failed to fetch categories", error });
    }
};

// GET ONE
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (error) {
        console.error("❌ Get Category Error:", error);
        res.status(500).json({ message: "Failed to fetch category", error });
    }
};

// UPDATE
exports.updateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(updated);
    } catch (error) {
        console.error("❌ Update Category Error:", error);
        res.status(500).json({ message: "Failed to update category", error });
    }
};

// DELETE
exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("❌ Delete Category Error:", error);
        res.status(500).json({ message: "Failed to delete category", error });
    }
};
