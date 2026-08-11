import express from 'express';
import Seat from '../models/Seat.js';

const router = express.Router();

/**
 * @route   POST /api/seats
 * @desc    Create a new seat within a specific screen
 * @access  Public (Pending Admin Auth Middleware)
 */
router.post('/', async (req, res) => {
  try {
    const newSeat = new Seat(req.body);
    const savedSeat = await newSeat.save();

    console.log(`[POST] Seat Created: ${savedSeat.seatLabel || savedSeat._id}`);
    res.status(201).json({
      success: true,
      message: 'Seat added successfully',
      data: savedSeat
    });
  } catch (error) {
    console.error(`[POST Error] Seat Creation: ${error.message}`);
    res.status(400).json({
      success: false,
      message: 'Failed to create seat',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/seats
 * @desc    Retrieve all seats (Populates associated screen details)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const seats = await Seat.find().populate('screen');

    res.status(200).json({
      success: true,
      count: seats.length,
      data: seats
    });
  } catch (error) {
    console.error(`[GET Error] Fetching Seats: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching seats',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/seats/:id
 * @desc    Update seat details (pricing, category, or status)
 * @access  Public (Pending Admin Auth Middleware)
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSeat) {
      return res.status(404).json({
        success: false,
        message: 'Seat not found'
      });
    }

    console.log(`[PUT] Seat Updated: ${updatedSeat.seatLabel || updatedSeat._id}`);
    res.status(200).json({
      success: true,
      message: 'Seat updated successfully',
      data: updatedSeat
    });
  } catch (error) {
    console.error(`[PUT Error] Updating Seat: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while updating seat',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/seats/:id
 * @desc    Delete a seat by ID
 * @access  Public (Pending Admin Auth Middleware)
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id);

    if (!deletedSeat) {
      return res.status(404).json({
        success: false,
        message: 'Seat not found'
      });
    }

    console.log(`[DELETE] Seat Removed: ${deletedSeat.seatLabel || deletedSeat._id}`);
    res.status(200).json({
      success: true,
      message: 'Seat deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error(`[DELETE Error] Deleting Seat: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting seat',
      error: error.message
    });
  }
});

export default router;