import SeatCategory from '../models/SeatCategory.js';

// Create a new seat category with its price
export const createCategory = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newCategory = new SeatCategory({ name, price });
    await newCategory.save();
    res.status(201).json({ message: 'Seat category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create seat category', details: error.message });
  }
};

// Get all seat categories and their current prices
export const getAllCategories = async (req, res) => {
  try {
    const categories = await SeatCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seat categories' });
  }
};