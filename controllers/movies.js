import Movie from '../models/Movie.js';

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});

        res.status(200).json(movies);
    } catch (error) {
        throw (error)
    }
}

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(200).json(movie);
    } catch (error) {
        throw (error)
    }
}

export const createMovie = async (req, res) => {
    const newMovie = new Movie({
        title: req.body.title,
        plot: req.body.plot,
        genres: req.body.genres,
        director: req.body.director,
        stars: req.body.stars,
        rating: req.body.rating
    });

    try {
        await newMovie.save();

        res.status(201).json({
            message: 'Created Movie Successfully!'
        });
    } catch (error) {
        throw (error)
    }
}

export const updateMovie = async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(
            req.params.id, {
            $set: {
                title: req.body.title,
                plot: req.body.plot,
                genres: req.body.genres,
                director: req.body.director,
                stars: req.body.stars,
                rating: req.body.rating
            }
        });

        res.status(200).json({
            message: 'Updated Movie Successfully!'
        });
    } catch (error) {
        throw (error)
    }
}

export const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Deleted Movie Successfully!'
        });
    } catch (error) {
        throw (error)
    }
}