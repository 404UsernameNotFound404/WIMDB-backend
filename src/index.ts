'use strict';

import { login } from "./user/loginService";

// NPM dependencies.
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    { initDB } = require('./db'),
    cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config();
    
// jwt = require('jsonwebtoken');

// Connect database
// db.connect();

// Initialise app.
var app = express();

// Enable cross-origin resource sharing (COR)

app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(cors({
    origin: ['http://lvh.me:3005', 'http://localhost:3000', 'http://lvh.me:3000', 'http://localhost:3005'],
    credentials: true
}))

// Parse as url encoded and json.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Bundle API routes.
app.use('/user', require('./user/userRouter'));
app.use('/login', login);
app.use('/movie', require('./movies/movieRouter'));
app.use('/cast', require('./cast/castRouter'));
app.use('/', () => { console.log("catch all") });

// SET TO FALSE AFTER SEEDING IS COMPLETED ONCE
if (false) require('./seedScripts/');

app.listen(process.env.PORT, async function () {
    await initDB();
    console.log('Server is listening http://localhost:' + process.env.PORT);
});
