"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    movieID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    studio: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    directors: {
        type: [String],
        required: true
    },
    writers: {
        type: [String],
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    mpaRating: {
        type: String,
        required: true
    },
    criticsRating: {
        type: Number,
        required: true
    },
});
let Movie = (0, mongoose_1.model)('Movie', movieSchema);
exports.default = Movie;
//# sourceMappingURL=movie.js.map