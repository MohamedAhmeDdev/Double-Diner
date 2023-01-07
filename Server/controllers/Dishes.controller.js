const Dishes = require("../models/Dishes.Model.js");

const createDish = async (req, res) => {
  const { name, description, price, category, quantity } = req.body;

  // image will be a url ,  come from upload image middleware
  const image = req.file ? req.file.path : "";

  if (!name || !description || !price || !category || !quantity) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const dish = await Dishes.create({
      name,
      description,
      price,
      image: image.replace(/\\/g, "/"),
      category,
      quantity,
    });

    return res.status(201).json({
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

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dishes.findAll();
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
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const dish = await Dishes.findOne({ where: { id } });
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

  if ( !id ||!name || !description ||!price  ||!category || !quantity) {
    return res.status(400).json({
      success: false,
      message:
        "Id or name or description or price  or category or quantity is missing",
    });
  }

  try {
    const dish = await Dishes.findOne({ where: { id } });
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    await Dishes.update(
      { name, description, price, image, category, quantity },
      { where: { id: id } }
    );

    const updatedDish = await Dishes.findOne({ where: { id } });
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
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const dish = await Dishes.findOne({ where: { id } });
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    await Dishes.destroy({ where: { id } });
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

// query params category=veg
const getDishesInCategory = async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Category is missing",
    });
  }

  try {
    const dishes = await Dishes.findAll({ where: { category } });
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
