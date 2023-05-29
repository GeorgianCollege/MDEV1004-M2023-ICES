import { Request, Response, NextFunction } from 'express';

import Movie from '../Models/movie';

export function DisplayMovieList(req: Request, res: Response, next: NextFunction): void
{
    Movie.find({})
    .then(function(data)
    {
        res.json(data);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}