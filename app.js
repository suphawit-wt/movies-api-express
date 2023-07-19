import express from 'express';
import * as dotenv from 'dotenv';
import moviesRoutes from './routes/movies.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello world!'
    });
})

app.use("/movies", moviesRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
})

export default app;