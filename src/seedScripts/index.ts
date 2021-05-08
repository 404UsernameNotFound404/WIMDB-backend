import { create } from "domain";

const { seedMovies } = require('../movies/movieSeed');
const { seedUsers } = require('../user/userSeed');
const { seedDirectors } = require("../cast/directors/seedDirectors");
const { seedActors } = require("../cast/actors/actorSeed");
const { seedWriters } = require("../cast/writers/writersSeed");

const seedAll = async () => {
    await seedUsers();
    const createdMovies = await seedMovies();
    await seedDirectors(createdMovies);
    await seedActors(createdMovies);
    await seedWriters(createdMovies);
}

seedAll();