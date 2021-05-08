const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

let _db = {};

const initDBFile = async () => {
    try {
        //@ts-ignore
        // const DB_URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
        const DB_URL = process.env.DB_URL;
        const client = await MongoClient.connect(DB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (!client) {
            throw "BIG OUFF";
        }
        //@ts-ignore
        _db = await client.db("WIMDB");
        if (_db == {}) throw "NOT CONNECTED";
    } catch (err) {
        console.log("DB TEST ERROR");
        console.log(err);
    }
};

const _getDB = () => {
    return _db;
};

module.exports = {
    initDB: initDBFile,
    getDB: _getDB,
};
