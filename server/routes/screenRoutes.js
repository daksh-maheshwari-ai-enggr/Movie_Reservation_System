const express = require('express');
const { getScreens } = require('../controllers/screenController.js');

const router = express.Router();

/**
 * @route   POST /api/screens
 * @desc    Create a new screen inside a specific theater
 * @access  Public (Pending Admin Auth Middleware)
 */
router.post('/', async (req, res) => {
  try {
    const newScreen = new Screen(req.body);
    const savedScreen = await newScreen.save();

    console.log(`[POST] Screen Created: ${savedScreen.name || savedScreen._id}`);
    res.status(201).json({
      success: true,
      message: 'Screen added successfully',
      data: savedScreen
    });
  } catch (error) {
    console.error(`[POST Error] Screen Creation: ${error.message}`);
    res.status(400).json({
      success: false,
      message: 'Failed to create screen',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/screens
 * @desc    Retrieve all screens (Populates associated theater details)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const screens = await Screen.find().populate('theater');

    res.status(200).json({
      success: true,
      count: screens.length,
      data: screens
    });
  } catch (error) {
    console.error(`[GET Error] Fetching Screens: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching screens',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/screens/:id
 * @desc    Update an existing screen by ID
 * @access  Public (Pending Admin Auth Middleware)
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedScreen = await Screen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedScreen) {
      return res.status(404).json({
        success: false,
        message: 'Screen not found'
      });
    }

    console.log(`[PUT] Screen Updated: ${updatedScreen.name || updatedScreen._id}`);
    res.status(200).json({
      success: true,
      message: 'Screen updated successfully',
      data: updatedScreen
    });
  } catch (error) {
    console.error(`[PUT Error] Updating Screen: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while updating screen',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/screens/:id
 * @desc    Delete a screen by ID
 * @access  Public (Pending Admin Auth Middleware)
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedScreen = await Screen.findByIdAndDelete(req.params.id);

    if (!deletedScreen) {
      return res.status(404).json({
        success: false,
        message: 'Screen not found'
      });
    }

    console.log(`[DELETE] Screen Removed: ${deletedScreen.name || deletedScreen._id}`);
    res.status(200).json({
      success: true,
      message: 'Screen deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error(`[DELETE Error] Deleting Screen: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting screen',
      error: error.message
    });
  }
});

module.exports = router;