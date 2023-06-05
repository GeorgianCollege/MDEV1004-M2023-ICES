import express from 'express';
let router = express.Router();

/* Get the movie Controller */
import { DisplayMovieList, DisplayMovieByID, AddMovie  } from '../Controllers/movie';

router.get('/list', function(req, res, next)
{
  DisplayMovieList(req, res, next);
});

router.get('/find/:id', function(req, res, next)
{
  DisplayMovieByID(req, res, next);
});

router.post('/add', function(req, res, next){
  AddMovie(req, res, next);
})

export default router;
