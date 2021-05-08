import { title } from "process";

const { Constants } = require('../constants');
const { getDB } = require("../db");
const { ObjectID } = require("mongodb")

const collectionName = "movies";

export const getOne = async (req: any, res: any, username: string | null) => {
    const db = getDB();
    const { id } = req.params;
    const movie = await db.collection(collectionName).findOne({ _id: new ObjectID(id) })

    // turn array of cast members names into cast objects with all cast info
    const cast = await db.collection("cast").find({ name: { $in: movie.cast.map((ele: any) => ele) } }).toArray();
    movie.cast = cast;

    // give similar movies
    // Adds all movies in the same genre
    let similarMovies = [] as any[];
    const allMovies = await db.collection("movies").find().toArray();
    allMovies.map((ele: { genre: string, cast: any[] }) => {
        if (ele.genre == movie.genre) {
            similarMovies.push(ele);
            return;
        }
        let foundCastInBothMovies = false;
        movie.cast.map((movieCastEle: any) => {
            if (ele.cast.find(castEle => movieCastEle.name == castEle.name)) {
                foundCastInBothMovies = true;
            }
        })
        if (foundCastInBothMovies) {
            similarMovies.push(ele);
        }
    })
    movie.similarMovies = similarMovies;
    res.status(Constants.httpStatus.OKAY).json({ data: movie });
    if (username) {
        //  recording a user view on a movie to then recommend similar movies 
        //  Here incase I want to use this information when recommending movies. Or seeing how popular a movie is.
        await db.collection("users").updateOne({ username: username }, { $push: { views: movie._id } });
    }
}

export const getAll = async (req: any, res: any) => {
    const db = getDB();
    const movies = await db.collection(collectionName).find().toArray();
    res.status(Constants.httpStatus.OKAY).json({ data: movies });
}

export const create = async (req: any, res: any, username: string | null) => {
    const db = getDB();
    const { title, releaseDate, runTime, genre, plot, cast } = req.body;
    if (!checkMovieData(req.body) || !(await checkCast(cast, db))) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
    await db.collection(collectionName).insertOne({
        title: title,
        avgRating: 0,
        releaseDate: releaseDate,
        runTime: runTime,
        cast: cast,
        genre: genre.toLowerCase(),
        plot: plot,
        reviews: []
    });
    res.status(Constants.httpStatus.OKAY).json({ message: "Movie Created :)" });
}

export const update = async (req: any, res: any) => {
    const db = getDB();
    const { id } = req.params;
    const { title, releaseDate, runTime, genre, plot, cast } = req.body;
    if (!checkMovieData(req.body) || !(await checkCast(cast, db))) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
    const movieToUpdate = await db.collection(collectionName).findOne({ _id: new ObjectID(id) });
    console.log(movieToUpdate)
    await db.collection(collectionName).updateOne({ _id: new ObjectID(id) }, {
        $set: {
            title: title,
            avgRating: movieToUpdate.avgRating,
            releaseDate: releaseDate,
            runTime: runTime,
            cast: cast,
            genre: genre.toLowerCase(),
            plot: plot,
            reviews: movieToUpdate.reviews
        }
    });
    res.status(Constants.httpStatus.OKAY).json({ message: "Updated Created :)" });
}

export const createReview = async (req: any, res: any, username: string | null) => {
    const db = getDB();
    const { summary, fullTextReview, rating, movieID } = req.body;
    if (summary.length == 0 || fullTextReview.length == 0) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Fields empty stupid." };
    if (summary.length >= 50) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Summary too long" };
    if (fullTextReview.length >= 500) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Review too long" };
    await db.collection(collectionName).updateOne({ _id: new ObjectID(movieID) }, { $push: { reviews: { user: username, summary, fullTextReview, rating } } });
    const movie = await db.collection(collectionName).findOne({ _id: new ObjectID(movieID) });
    // calculating new avg movie rating
    let avgRating = 0;
    movie.reviews.map((ele: any) => {
        avgRating += ele.rating;
    })
    avgRating = Math.round(avgRating / movie.reviews.length);
    await db.collection(collectionName).updateOne({ _id: new ObjectID(movieID) }, { $set: { avgRating: avgRating } });
    res.status(Constants.httpStatus.OKAY).json({ message: "Review Created :)" });
}

type DataNeededForMovieCreationOrUpdate = {
    title: string,
    releaseDate: string,
    runTime: string,
    genre: string,
    plot: string,
}

const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
}

const checkCast = async (cast: any, db: any) => {
    if (!Array.isArray(cast)) return false;
    for (let x = 0; x < cast.length; x++) {
        const potentialCast = await db.collection("cast").findOne({ name: cast[x] });
        if (!potentialCast) return false;
    }
    return true;
}

const checkMovieData = ({ title, releaseDate, runTime, genre, plot }: DataNeededForMovieCreationOrUpdate) => {
    try {
        if (!title || !releaseDate || !runTime || !genre || !plot) throw ""
        if (!isValidDate(releaseDate)) throw "";
        return true;
    } catch (err) {
        return false;
    }
}