const express = require('express');
const SeatCategory = require('../models/SeatCategory.js'); // Adjust path if your model is elsewhere

const router = express.Router();

/**
 * @route   POST /api/seat-categories/add
 * @desc    CREATE a seat category
 */
router.post('/add', async (req, res) => {
  try {
    const newCategory = new SeatCategory(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create category', details: error.message });
  }
});

/**
 * @route   GET /api/seat-categories
 * @desc    READ all seat categories
 */
router.get('/', async (req, res) => {
  try {
    const categories = await SeatCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * @route   PUT /api/seat-categories/:id
 * @desc    UPDATE a seat category by ID
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await SeatCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
});

/**
 * @route   DELETE /api/seat-categories/:id
 * @desc    DELETE a seat category by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await SeatCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
});

module.exports = router;