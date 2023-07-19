import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
const url = process.env.MONGO_URL;
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, moviesCollection;

async function mongoConnect() {
    await mongoClient.connect();
    db = mongoClient.db('movieflix');
    moviesCollection = db.collection('movies');
}

export const getAllMovies = async (req, res) => {
    try {
        await mongoConnect();

        const movies = await moviesCollection.find({}).toArray();

        res.status(200).json(movies);
    } catch (error) {
        throw (error)
    }
}

export const getMovieById = async (req, res) => {
    let id = req.params.id;

    try {
        await mongoConnect();

        const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

        res.status(200).json(movie);
    } catch (error) {
        throw (error)
    }
}

export const createMovie = async (req, res) => {
    let movie = {
        title: req.body.title,
        plot: req.body.plot,
        genres: req.body.genres,
        director: req.body.director,
        stars: req.body.stars,
        rating: req.body.rating
    }

    try {
        await mongoConnect();

        await moviesCollection.insertOne(movie);
    } catch (error) {
        throw (error)
    }

    res.status(201).json({
        message: 'Created Movie Successfully!'
    });
}

export const updateMovie = async (req, res) => {
    let id = req.params.id;

    try {
        await mongoConnect();

        await moviesCollection.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                title: req.body.title,
                plot: req.body.plot,
                genres: req.body.genres,
                director: req.body.director,
                stars: req.body.stars,
                rating: req.body.rating
            }
        });
    } catch (error) {
        throw (error)
    }

    res.status(200).json({
        message: 'Updated Movie Successfully!'
    });
}

export const deleteMovie = async (req, res) => {
    let id = req.params.id;

    try {
        await mongoConnect();

        await moviesCollection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        throw (error)
    }

    res.status(200).json({
        message: 'Deleted Movie Successfully!'
    });
}