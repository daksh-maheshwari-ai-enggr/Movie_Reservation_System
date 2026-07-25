const Movie=require("../models/movie.model.js");


// CREATE MOVIE
const createMovie = async (req, res) => {
    try {
        console.log(req.body)

        const {
            title,
            genre,
            duration,
            year,
            rating,
            description,
            director,
            cast,
            poster
        } = req.body;

        if (
            !title ||
            !genre ||
            !duration ||
            !year ||
            !rating ||
            !description ||
            !director ||
            !poster
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const movie = await Movie.create({
            title,
            genre,
            duration,
            year,
            rating,
            description,
            director,
            cast,
            poster
        });

        return res.status(201).json({
            success: true,
            message: "Movie added successfully",
            data: movie
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET ALL MOVIES
const getAllMovies = async (req, res) => {
    try {

        const movies = await Movie.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET SINGLE MOVIE
const getMovieById = async (req, res) => {
    try {

        const { id } = req.params;

        const movie = await Movie.findById(id);

        if (!movie) {

            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });

        }

        return res.status(200).json({
            success: true,
            data: movie
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// UPDATE MOVIE
const updateMovie = async (req, res) => {
    try {

        const { id } = req.params;

        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedMovie) {

            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            data: updatedMovie
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE MOVIE
const deleteMovie = async (req, res) => {
    try {

        const { id } = req.params;

        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {

            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Movie deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports={createMovie,
    deleteMovie,
    updateMovie,
    getMovieById,
    getAllMovies
}