export { };

const { getDB, initDB } = require("../../db");
const { seedData } = require('../../seedScripts/seedScript');
const { ObjectID } = require("mongodb")

const collectionName = "cast";

export const seedWriters = async (movies: string[]) => {
    await initDB();
    const db = getDB();
    let createdActors = [];
    createdActors.push(await seedData(collectionName, {
        name: "John Mulaney",
        type: "writer",
        birthdate: "2020-01-02"
    }));
    createdActors.push(await seedData(collectionName, {
        name: "Bill Hader",
        type: "writer",
        birthdate: "2020-09-02"
    }));
    // Adding actor to movie 
    for (let y = 0; y < movies.length; y++) {
        // this should be done better
        await db.collection("movies").updateOne({ _id: new ObjectID(movies[y]) }, { $push: { cast: { $each: ["Bill Hader", "John Mulaney"] } } });
    }
}
