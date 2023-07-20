import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    stars: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    },
}, {
    collection: 'movies',
    versionKey: false
});

export default mongoose.model("Movie", MovieSchema);