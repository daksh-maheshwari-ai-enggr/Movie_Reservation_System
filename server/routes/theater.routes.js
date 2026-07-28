const express = require('express');
const router = express.Router();
const { createTheater, getAllTheaters, updateTheater, deleteTheater } = require('../controllers/controller.theater.js');

const theaterRoutes = express.Router();
theaterRoutes.post('/theaters', createTheater);
theaterRoutes.get('/theaters', getAllTheaters);
theaterRoutes.put('/theaters/:id', updateTheater);
theaterRoutes.delete('/theaters/:id', deleteTheater);

module.exports = theaterRoutes;