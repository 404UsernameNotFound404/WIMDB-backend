const { Constants } = require('../constants');
const { getDB } = require("../db");
const { ObjectID } = require("mongodb")

const collectionName = "cast";

export const getOne = async (req: any, res: any, username: string | null) => {
    await console.log("GET ONE")
    const db = getDB();
    const { id } = req.params;
    let following = false;
    const cast = await db.collection(collectionName).findOne({ _id: new ObjectID(id) })
    const movies = await db.collection("movies").find({ cast: { $in: [cast.name] } }).toArray();
    if (username) {
        const user = await db.collection("users").findOne({ username: username });
        following = !!(user.following.find((ele: string) => ele == cast.name));
    }
    // keeps  track of everyone the person has worked with
    let peopleCastHasWorkedWith = [] as any[];
    // keeps track of people who have worked with someone more then once.
    let frequentCalibrators = [] as any[];

    console.log(movies)
    movies.map((ele: any) => {
        ele.cast.map((castEle: any) => {
            if (cast.name == castEle) return;
            console.log(peopleCastHasWorkedWith)
            if (peopleCastHasWorkedWith.find(ele => ele == castEle)) {
                frequentCalibrators.push(castEle);
                return;
            }
            peopleCastHasWorkedWith.push(castEle)
        })
    });
    let frequentCalibratorsFullData = await db.collection("cast").find({ name: { $in: frequentCalibrators } }).toArray();
    res.status(Constants.httpStatus.OKAY).json({ ...cast, movies: movies, following: following, frequentCalibrators: frequentCalibratorsFullData });
}

export const getAll = async (req: any, res: any) => {
    const db = getDB();
    const casts = await db.collection(collectionName).find().toArray();
    res.status(Constants.httpStatus.OKAY).json({ data: casts });
}

export const create = async (req: any, res: any) => {
    console.log("create cast");
    const db = getDB();
    const { name, birthdate, type } = req.body;
    console.log(req.body);
    if (await db.collection(collectionName).findOne({ name: name })) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Individual already exists." };
    console.log("here")
    if (!checkCastData(req.body)) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
    await db.collection(collectionName).insertOne({
        name: name,
        birthdate: birthdate,
        type: type
    });
    res.status(Constants.httpStatus.OKAY).json({ message: "Movie Created :)" });
}

export const update = async (req: any, res: any) => {
    const db = getDB();
    const { name, birthdate, type } = req.body;

    if (!(await db.collection(collectionName).findOne({ name: name, }))) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Individual does not exist." };
    if (!checkCastData(req.body)) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
    await db.collection(collectionName).updateOne({ name: name }, {
        $set: {
            birthdate: birthdate,
            type: type
        }
    })
    res.status(Constants.httpStatus.OKAY).json({ message: "cast edited Created :)" });
}

type DataNeededForCastCreationOrUpdate = {
    name: string,
    birthdate: string,
    type: string
}

const checkCastData = ({ name, birthdate, type }: DataNeededForCastCreationOrUpdate) => {
    try {
        if (!name || !birthdate || !type) throw ""
        return true;
    } catch (err) {
        return false;
    }
}