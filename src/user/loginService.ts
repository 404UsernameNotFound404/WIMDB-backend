const { Constants } = require('../constants');
const { getDB, initDB } = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



export const login = async (req: any, res: any) => {
    const db = getDB();
    const { password, username } = req.body;
    if (!password || !username) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Failed to send password or username." }
    const user = await db.collection("users").findOne({ username: username })
    if (!user) throw { code: Constants.httpStatus.BAD_REQUEST, message: "No user with username." }
    if (!(await bcrypt.compare(password, user.password))) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Password does not match our DB" }
    const token = await jwt.sign({ username: username }, Constants.WEBTOKENSECRET);
    res.cookie("token", token);
    // res.set({
    //     "Set-Cookie": `token=${token}; Path=/` //This is an HTTP cookie. Safer then normal cookie
    // }).status(Constants.httpStatus.OKAY).json({ data: { username: username } });
    res.status(Constants.httpStatus.OKAY).json({ data: { username: username } }).end();
}

export const logout = async (req: any, res: any) => {
    console.log("logging out")
    res.set({
        "Set-Cookie": `token=deleted; Path=/`, // erasing token
    }).status(Constants.httpStatus.OKAY).json({ data: { success: true } });
}

export const checkToken = async (req: any, res: any, username: string | null) => {
    if (!username) throw { code: Constants.httpStatus.BAD_REQUEST, message: "Not Logged In" };
    res.status(Constants.httpStatus.OKAY).json({ data: { username: username } });
}