"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
exports.Constants = {
    httpStatus: {
        OKAY: 200,
        BAD_REQUEST: 400,
        SERVER_ERROR: 500,
        FORBIDDEN: 403
    },
    WEBTOKENSECRET: "SHHHHHHHHHHHHHHHHHHH" // jsonWebTokenSecret should come from env if you are using in production
};
