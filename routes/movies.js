import express from 'express';
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movies.js'

const router = express.Router();

// GET /movies
router.get('/', getAllMovies);

// POST /movies
router.post('/', createMovie);

// GET /movies/:id
router.get('/:id', getMovieById);

// PUT /movies/:id
router.put('/:id', updateMovie);

// DELETE /movies/:id
router.delete('/:id', deleteMovie);

export default router;