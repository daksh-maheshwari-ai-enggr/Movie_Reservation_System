import express from 'express';
import Theater from '../models/Theater.js';

const router = express.Router();

/**
 * @route   POST /api/theaters
 * @desc    Create a new movie theater
 * @access  Public (Pending Admin Auth Middleware)
 */
router.post('/', async (req, res) => {
  try {
    const newTheater = new Theater(req.body);
    const savedTheater = await newTheater.save();

    console.log(`[POST] Theater Created: ${savedTheater.name || savedTheater._id}`);
    res.status(201).json({
      success: true,
      message: 'Theater added successfully',
      data: savedTheater
    });
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
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({
      success: true,
      count: theaters.length,
      data: theaters
    });
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
 * @access  Public (Pending Admin Auth Middleware)
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    console.log(`[PUT] Theater Updated: ${updatedTheater.name || updatedTheater._id}`);
    res.status(200).json({
      success: true,
      message: 'Theater updated successfully',
      data: updatedTheater
    });
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
 * @access  Public (Pending Admin Auth Middleware)
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedTheater = await Theater.findByIdAndDelete(req.params.id);

    if (!deletedTheater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    console.log(`[DELETE] Theater Removed: ${deletedTheater.name || deletedTheater._id}`);
    res.status(200).json({
      success: true,
      message: 'Theater deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error(`[DELETE Error] Deleting Theater: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting theater',
      error: error.message
    });
  }
});

export default router;