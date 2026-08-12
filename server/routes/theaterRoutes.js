const express = require('express');
const Theater = require( '../models/Theater.js');

const router = express.Router();

/**
 * @route   POST /api/theaters/add
 * @desc    Create a new movie theater
 */
router.post('/add', async (req, res) => {
  try {
    const newTheater = new Theater(req.body);
    const savedTheater = await newTheater.save();

    console.log(`[POST] Theater Created: ${savedTheater.name}`);
    res.status(201).json(savedTheater);
  } catch (error) {
    console.error(`[POST Error] Theater Creation: ${error.message}`);
    res.status(400).json({
      success: false,
      message: 'Failed to create theater',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/theaters
 * @desc    Retrieve all movie theaters
 */
router.get('/', async (req, res) => {
  try {
    const theaters = await Theater.find();
    // Directly returning the array so React can call .map() directly
    res.status(200).json(theaters);
  } catch (error) {
    console.error(`[GET Error] Fetching Theaters: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching theaters',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/theaters/:id
 * @desc    Update an existing movie theater by ID
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    console.log(`[PUT] Theater Updated: ${updatedTheater.name}`);
    res.status(200).json(updatedTheater);
  } catch (error) {
    console.error(`[PUT Error] Updating Theater: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while updating theater',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/theaters/:id
 * @desc    Delete a movie theater by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedTheater = await Theater.findByIdAndDelete(req.params.id);

    if (!deletedTheater) {
      return res.status(404).json({ message: 'Theater not found' });
    }

    console.log(`[DELETE] Theater Removed: ${deletedTheater.name}`);
    res.status(200).json({ message: 'Theater deleted successfully' });
  } catch (error) {
    console.error(`[DELETE Error] Deleting Theater: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting theater',
      error: error.message
    });
  }
});

module.exports = router;