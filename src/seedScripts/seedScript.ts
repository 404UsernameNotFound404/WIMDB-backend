const bcrypt = require('bcrypt');
const { getDB, initDB } = require("../db");

export const seedData = async (collection: string, data: object, clearData?: boolean) => {
    await initDB();
    const db = getDB();
    if (clearData) await db.collection(collection).remove({});
    let createdDocument = await db.collection(collection).insertOne(data)
    return createdDocument.ops[0]._id;
}