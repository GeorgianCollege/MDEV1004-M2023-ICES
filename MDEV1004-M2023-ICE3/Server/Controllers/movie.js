"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then(function (data) {
        res.json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
//# sourceMappingURL=movie.js.map