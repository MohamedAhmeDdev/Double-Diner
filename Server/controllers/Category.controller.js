const Category = require("../models/Category.model.js");
const Dishes = require("../models/Dishes.Model.js");

// ==================== CREATE CATEGORY ====================
const createCategory = async (req, res) => {
  const { name, } = req.body;
  console.log(req.body);
  

  // Validate required fields
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  try {
    const existingCategory = await Category.findOne({ 
      where: { name: name.trim() } 
    });
    
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ==================== GET ALL CATEGORIES ====================
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ==================== GET CATEGORY BY ID ====================
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== UPDATE CATEGORY ====================
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Category ID is required",
    });
  }

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({
        where: { name: name.trim() },
      });
      
      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category with this name already exists",
        });
      }
    }

    await category.update(req.body);



    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: category
    });
  } catch (error) {
   return res.status(500).json({ success: false, message: error.message });
  }
};



const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has associated dishes
    const dishCount = await Dishes.count({ where: { category_id: id } });
    if (dishCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${dishCount} associated dishes.`,
      });
    }

    await category.destroy();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      categoryId: id,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
     return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};