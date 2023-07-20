import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import moviesRoutes from './routes/movies.js';

dotenv.config();
const mockMongoURL = "mongodb+srv://username:password@clusterone.gcnbb.mongodb.net/movieflix?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || mockMongoURL;

const app = express();
app.use(express.json());

const dbConnect = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello world!'
    });
})

app.use("/movies", moviesRoutes);

app.listen(port, () => {
    dbConnect();
    console.log(`Server is running on http://127.0.0.1:${port}`);
})

export default app;