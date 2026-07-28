const {createMovie,
    deleteMovie,
    updateMovie,
    getMovieById,
    getAllMovies
} = require("../controllers/controller.movie.js");

const express=require('express');

const movieRoutes=express.Router();

movieRoutes.post("/movies",createMovie)

movieRoutes.get("/movies",getAllMovies)

movieRoutes.get("/movies/:id",getMovieById)

movieRoutes.put("/movies/:id",updateMovie)

movieRoutes.delete("/movies/:id",deleteMovie)

module.exports=movieRoutes