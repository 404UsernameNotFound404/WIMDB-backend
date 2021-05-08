export { };

const bcrypt = require('bcrypt');
const { seedData } = require('../seedScripts/seedScript');

export const seedUsers = async () => {
    let users = [];
    users.push(await seedData("users", {
        username: "404UsernameNotFound404",
        password: await bcrypt.hash("password", 10),
        following: [],
        views: []
    }, true));
    users.push(await seedData("users", {
        username: "user",
        password: await bcrypt.hash("password", 10),
        following: [],
        views: []
    }));
    await seedData("users", {
        username: "admin",
        password: await bcrypt.hash("password", 10),
        following: [],
        views: []
    });
}
