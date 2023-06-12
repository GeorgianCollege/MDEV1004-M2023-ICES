import { Request, Response, NextFunction } from 'express';

import Movie from '../Models/movie';

function SanitizeArray(unsanitizedArray: string[]): string[]
{
    let sanitizedArray: string[] = Array<string>();
    for (const unsatizedString of unsanitizedArray) 
    {
        sanitizedArray.push(unsatizedString.trim());
    }
    return sanitizedArray;
}

export function DisplayMovieList(req: Request, res: Response, next: NextFunction): void
{
    
    Movie.find({})
    .then(function(data)
    {
        res.status(200).json(data);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

export function DisplayMovieByID(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;
    Movie.findById({_id: id})
    .then(function(data)
    {
        res.status(200).json(data)
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

export function AddMovie(req: Request, res: Response, next: NextFunction): void
{

    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));

    let movie = new Movie({
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

    Movie.create(movie)
    .then(function()
    {
        res.json(movie);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

export function UpdateMovie(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;
    let genres = SanitizeArray((req.body.genres as string).split(","));
    let directors = SanitizeArray((req.body.directors as string).split(","));
    let writers = SanitizeArray((req.body.writers as string).split(","));
    let actors = SanitizeArray((req.body.actors as string).split(","));

    let movieToUpdate = new Movie({
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

    Movie.updateOne({_id: id}, movieToUpdate)
    .then(function()
    {
        res.json(movieToUpdate);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}

export function DeleteMovie(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    Movie.deleteOne({_id: id})
    .then(function()
    {
        res.json(id);
    })
    .catch(function(err)
    {
        console.error(err);
    });
}