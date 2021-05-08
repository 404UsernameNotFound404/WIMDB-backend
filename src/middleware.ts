import { Constants } from "./constants";
const jwt = require('jsonwebtoken');

const getUsernameFromHeaders = async (req: any) => {
    try {
        const token = req.cookies.token;
        if (!token) return null;
        const decodedToken = await jwt.verify(token, Constants.WEBTOKENSECRET);
        return decodedToken.username;
    } catch (err) {
        return null;
    }
};

exports.middleware = function (needsToBeLogedIn: boolean, callback: (res: any, req: any, username: string | null) => void) {
    async function middlewareFunction(req: any, res: any) {
        try {
            const userUsername = await getUsernameFromHeaders(req);
            if (!userUsername && needsToBeLogedIn) throw { code: Constants.httpStatus.FORBIDDEN, message: 'Execute access forbidden' };
            console.log("AFTER THIS POINT")
            console.log(userUsername)
            await callback(req, res, userUsername);
        } catch (err) {
            console.log("ERROR: =>")
            console.log(err);
            //  error is an object with code and message E.X {code: 400, message: "Teacher's email is invalid."}
            if (err.code == undefined || err.message == undefined || err.code < 0 || err.code > 999 || err.code == NaN) {
                //  default error when we don't catch error
                res.status(Constants.httpStatus.SERVER_ERROR).json({ message: 'Server Internal Error!' });
                return;
            }
            res.status(err.code).json({ message: err.message });
        }
    }
    return middlewareFunction;
};