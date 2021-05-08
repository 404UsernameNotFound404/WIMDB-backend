export { };

const { seedData } = require('../seedScripts/seedScript');

const collectionName = "movies";

export const seedMovies = async () => {
    let createdMovies = [];
    createdMovies.push(await seedData(collectionName, {
        title: "Pulp Fiction",
        avgRating: 4,
        releaseDate: "2020-08-22",
        runTime: "01-30",
        cast: [],
        genre: "action",
        plot:
            "While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs. ",
        reviews: [{
            user: "admin",
            summary: "This as summary",
            fullTextReview: "this longer",
            rating: 4
        }]
    }, true));
    createdMovies.push(await seedData(collectionName, {
        title: "The Movie",
        avgRating: 1,
        releaseDate: "2020-08-22",
        runTime: "01-15",
        genre: "drama",
        cast: [],
        plot: "THIS MOVIE BE MOVIE",
        reviews: [{
            user: "admin",
            summary: "This as summary 223",
            fullTextReview: "this longer 123",
            rating: 1
        }]
    }));
    return createdMovies;
}
