"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateMovie = exports.AddMovie = exports.DisplayMovieByID = exports.DisplayMovieList = exports.ProcessLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
const movie_1 = __importDefault(require("../Models/movie"));
function SanitizeArray(unsanitizedArray) {
    let sanitizedArray = Array();
    for (const unsatizedString of unsanitizedArray) {
        sanitizedArray.push(unsatizedString.trim());
    }
    return sanitizedArray;
}
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            return res.json({ success: false, msg: 'User not Registered Successfully!' });
        }
        return passport_1.default.authenticate('local')(req, res, () => {
            return res.json({ success: true, msg: 'User Logged in Successfully!', user: newUser });
        });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res.json({ success: false, msg: 'User Not Logged in Successfully!' });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json({ success: true, msg: 'User Logged in Successfully!' });
        });
    })(req, res, next);
}
exports.ProcessLogin = ProcessLogin;
function ProcessLogout(req, res, next) {
    req.logout(() => {
        console.log("User Logged Out");
    });
    res.json({ success: true, msg: 'User Logged out Successfully!' });
}
exports.ProcessLogout = ProcessLogout;
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieByID(req, res, next) {
    let id = req.params.id;
    movie_1.default.findById({ _id: id })
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieByID = DisplayMovieByID;
function AddMovie(req, res, next) {
    let genres = SanitizeArray(req.body.genres.split(","));
    let directors = SanitizeArray(req.body.directors.split(","));
    let writers = SanitizeArray(req.body.writers.split(","));
    let actors = SanitizeArray(req.body.actors.split(","));
    let movie = new movie_1.default({
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        genres: genres,
        directors: directors,
        writers: writers,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating
    });
    movie_1.default.create(movie)
        .then(function () {
        res.json(movie);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.AddMovie = AddMovie;
function UpdateMovie(req, res, next) {
    let id = req.params.id;
    let genres = SanitizeArray(req.body.genres.split(","));
    let directors = SanitizeArray(req.body.directors.split(","));
    let writers = SanitizeArray(req.body.writers.split(","));
    let actors = SanitizeArray(req.body.actors.split(","));
    let movieToUpdate = new movie_1.default({
        _id: id,
        movieID: req.body.movieID,
        title: req.body.title,
        studio: req.body.studio,
        genres: genres,
        directors: directors,
        writers: writers,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating
    });
    movie_1.default.updateOne({ _id: id }, movieToUpdate)
        .then(function () {
        res.json(movieToUpdate);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.UpdateMovie = UpdateMovie;
function DeleteMovie(req, res, next) {
    let id = req.params.id;
    movie_1.default.deleteOne({ _id: id })
        .then(function () {
        res.json(id);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movie.js.map