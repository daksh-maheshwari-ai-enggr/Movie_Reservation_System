const {createMovie,
    deleteMovie,
    updateMovie,
    getMovieById,
    getAllMovies
} = require("../controllers/controller.movie.js");

const express=require('express');

const adminRoutes=express.Router();

adminRoutes.post("/movies",createMovie)

adminRoutes.get("/movies",getAllMovies)

adminRoutes.get("/movies/:id",getMovieById)

adminRoutes.put("/movies/:id",updateMovie)

adminRoutes.delete("/movies/:id",deleteMovie)

module.exports=adminRoutes