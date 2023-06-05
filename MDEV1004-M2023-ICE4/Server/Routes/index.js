"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const movie_1 = require("../Controllers/movie");
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/movie-list', function (req, res, next) {
    (0, movie_1.DisplayMovieList)(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map