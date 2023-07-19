import * as dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const url = process.env.MONGO_URL;
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, moviesCollection

async function connect() {
    await mongoClient.connect();
    db = mongoClient.db('movieflix');
    moviesCollection = db.collection('movies');
}
connect();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello world!'
    });
})

// Get All Movies
app.get('/movies', async (req, res) => {

    try {
        const movies = await moviesCollection.find({}).toArray();

        res.status(200).json(movies);
    } catch (error) {
        throw (error)
    }

})

// Get Movie By ID
app.get('/movies/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const movie = await moviesCollection.findOne({ _id: new ObjectId(id) });

        res.status(200).json(movie);
    } catch (error) {
        throw (error)
    }

})

// Create Movie
app.post('/movies', async (req, res) => {
    let movie = {
        title: req.body.title,
        plot: req.body.plot,
        genres: req.body.genres,
        director: req.body.director,
        stars: req.body.stars,
        rating: req.body.rating
    }

    try {
        await moviesCollection.insertOne(movie);
    } catch (error) {
        throw (error)
    }

    res.status(201).json({
        message: 'Created Movie Successfully!'
    });
})

// Update Movie
app.put('/movies/:id', async (req, res) => {
    let id = req.params.id;

    try {
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
})

// Delete Movie
app.delete('/movies/:id', async (req, res) => {
    let id = req.params.id;

    try {
        await moviesCollection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        throw (error)
    }

    res.status(200).json({
        message: 'Deleted Movie Successfully!'
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
})

export default app;