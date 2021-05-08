export { };

const { getDB, initDB } = require("../../db");
const { seedData } = require('../../seedScripts/seedScript');
const { ObjectID } = require("mongodb")

const collectionName = "cast";

export const seedDirectors = async (movies: string[]) => {
    await initDB();
    const db = getDB();
    let createdActors = [];
    createdActors.push(await seedData(collectionName, {
        name: "Direcotr LastName",
        type: "director",
        birthdate: "2001-01-02"
    }, true));
    // Adding director to movies
    for (let y = 0; y < movies.length; y++) {
        console.log("direcotr")
        await db.collection("movies").update({ _id: new ObjectID(movies[y]) }, { $push: { cast: { $each: ["Direcotr LastName"] } } });
    }
}
