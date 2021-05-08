Installing:
database:
I will assume you have a local mongo database database set up. I have not changed my default mongodb download so it should work fine as long as you haven not changed any defaults either. If it does not work please paste your mongodb connection string into line 8 in "src/db.ts".

server:

1. npm install
2. npm run start:dev

Files:
All files are inside src
File Types:
router:
A router file is the file that controls what routes there are and what type of REST request they are. They also funnel all requests through the middleware.

seed:
This file is seeding a single collection.

service:
This is where the logic happens and the router points to.

special files outside of the types:
"src/index.ts" this starts the app and applies the middleware libraries to help with cors and parsing the request bodies.
"src/db.ts" this file is the file that creates a connection to the database and has a function to get the connection.
"src/middleware.ts" This file is responsible for checking if a request is from a logged in user. It does this by checking the HTTP cookie for a JWT token then decoding it. It also deals with error handling, by wrapping all logic in a try and catch so the server will never completely fail. This also allows me to send throw in any of the logic and have a request sent to the user. For instance in the login logic if the login is false, I can put "throw {code: 403, message: "login information is invalid"}" this will send a request telling the user they failed to login and stop the rest of the logic from running.

The rest of the files are under each of the types described above. How the folders are set up is by collection. For instance the user collection. It has the files "userRouter", "userSeed", "userService" which do what the file types describe for the collection user. I did this as I find it more useful then having folders for each file type because when you are working on something you generally need to look at all the files related to it and this way they are all in the same place.

Things to evaluate business logic:
Note: not much logic is in place as I focused on laying a foundation first with the connection to the DB, setting up the middleware, seeding the database, and setting up logging in as a user.

"src/middleware.ts"

"src/user/loginService.ts"

"src/movies/movieService.ts"

Things to test:
It is probably easier for you just go through the frontend to test, but here is a few routes you can send requests to if you would like too test the server separately.

GET "/movies/"
This should return all movies in the database.

GET "/movies/plugInSomeMovieID"
This will return the movie with the id you put in for "plugInSomeMovieID"

The rest of the routes are tested from the frontend.
