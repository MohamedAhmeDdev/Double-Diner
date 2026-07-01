const Dishes = require("../models/Dishes.model.js");
const Category = require("../models/Category.model.js"); 

const createDish = async (req, res) => {
  const { name, description, price, category, quantity } = req.body;
  
  const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

  if (!name || !description || !price || !category || !quantity) {
    
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

    const findCategoryId = await Category.findOne({ 
      where: { name: category.trim() } 
    });
  
  try {
    const dish = await Dishes.create({ 
      name, 
      description, 
      price, 
      image, 
      category_id: findCategoryId.category_id,
      quantity 
    });

    return res.status(201).json({
      success: true,
      dish
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dishes.findAll({
      include: [{ model: Category }]
    });
    return res.status(200).json({
      success: true,
      dishes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getDishById = async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dishes.findOne({ 
      where: { dish_id: id },
      include: [{ model: Category }]
    });
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    return res.status(200).json({
      success: true,
      dish,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



const updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, quantity } = req.body;


  if (!id || !name || !description || !price || !category || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Required fields or ID missing",
    });
  }

   const findCategoryId = await Category.findOne({ 
      where: { name: category.trim() } 
    });

  try {
    const dish = await Dishes.findOne({ where: { dish_id: id } });
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    let info = {
      name,
      description,
      price,
      category_id: findCategoryId.category_id,
      quantity,
    };

    if (req.file) {
      info.image = req.file.path.replace(/\\/g, "/");
    }

    await Dishes.update(info, { where: { dish_id: id } });
    const updatedDish = await Dishes.findOne({ 
      where: { dish_id: id },
      include: [{ model: Category }] 
    });
    return res.status(200).json({
      success: true,
      dish: updatedDish,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};





const deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dishes.findOne({ where: { dish_id: id } });
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    await Dishes.destroy({ where: { dish_id: id } });
    return res.status(200).json({
      success: true,
      dishId: id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getDishesInCategory = async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category is missing",
    });
  }

  try {
    const dishes = await Dishes.findAll({ 
      include: [{ 
        model: Category,
        where: { name:category }
      }] 
    });
    return res.status(200).json({
      success: true,
      dishes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
  getDishesInCategory,
};
