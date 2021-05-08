import express from 'express';
const { Constants } = require('../constants');
const { getDB, initDB } = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectID } = require("mongodb")

// TODO move getDB to middle ware
export const get = async (req: express.Request, res: express.Response) => {
    const db = getDB();
    const { username } = req.params;
    const user = await db.collection("users").findOne({ username: username });
    if (!user) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Failed to get username" }
    delete user.password;

    const allMovies = await db.collection("movies").find().toArray();
    let genresToHaveReviewedFondly = [] as string[];
    allMovies.map((ele: { reviews: any[], genre: string }) => {
        ele.reviews.map(eleReview => {
            if (eleReview.user == username && eleReview.rating >= 4) {
                genresToHaveReviewedFondly.push(ele.genre)
            }
        })
    })

    let recommendMovies = [] as any;
    // This goes through all movies. If it's rated above 4 stars I will recommend it or if the person has reviewed another movie in the same genre well.
    // NOTE: Recommending ever movie with a good rating won't scale well, it could however be movies that have come out recently and have a good rating.
    allMovies.map((movieEle: { avgRating: number, genre: string }) => {
        if (movieEle.avgRating >= 4 || genresToHaveReviewedFondly.find((ele: string) => movieEle.genre == ele)) {
            recommendMovies.push(movieEle);
            return;
        }
    })
    user.recommendMovies = recommendMovies;

    res.status(Constants.httpStatus.OKAY).json({
        data: {
            user: user
        }
    });
}

export const getAll = async (req: express.Request, res: express.Response) => {
    const db = getDB();
    let users = await db.collection("users").find().toArray();
    users = users.map((ele: any) => {
        delete ele['password']; // don't want to send peoples passwords even if they are hashed
        return ele;
    })
    res.status(Constants.httpStatus.OKAY).json({
        data: {
            users: users
        }
    });
}

export const removeFollower = async (req: express.Request, res: express.Response, userUsername: string) => {
    const db = getDB();
    const { name } = req.params; //id is the id of the user you want to stop following

    if (!(await db.collection("cast").findOne({ name: name }))) throw { message: "Can't find cast with given name.", code: Constants.httpStatus.BAD_REQUEST }
    const user = await db.collection("users").findOne({ username: userUsername });
    const newFollowing = user.following.filter((ele: any) => !(ele == name))

    await db.collection("users").updateOne({ username: userUsername }, { $set: { following: newFollowing } })
    res.status(Constants.httpStatus.OKAY).json({
        data: {
            result: "good"
        }
    });
}

export const addFollower = async (req: express.Request, res: express.Response, userUsername: string) => {
    const db = getDB();
    const { name } = req.params; //id is the id of the user you want to follow
    console.log(name);
    if (!(await db.collection("cast").findOne({ name: name }))) throw { message: "Can't find cast with given name.", code: Constants.httpStatus.BAD_REQUEST }
    const user = await db.collection("users").findOne({ username: userUsername });
    if (user.following.find((ele: string) => ele == name)) throw { message: "Already following person", code: Constants.httpStatus.BAD_REQUEST }
    await db.collection("users").updateOne({ username: userUsername }, { $push: { following: { $each: [name] } } })
    res.status(Constants.httpStatus.OKAY).json({
        data: {
            result: "good"
        }
    });
}
