// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Message = require('./public/scripts/insertMessage');
// const registerUserId = require('./routes/database');
// const getUserWithEmail = require('./HelperFunctions/getUserEmail');

//setting up a server with socket io


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieSession({
  name: 'session',
  keys: ["My" , 'secret', 'keys'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const registerRoutes = require("./routes/register"); // register
const loginRoutes = require("./routes/login"); // Login
const indexRoutes = require('./routes/index'); // Iindex
const itemsRoutes = require('./routes/items'); // Items
const logoutRoutes = require('./routes/logout'); // logout
const itemIdRoutes = require('./routes/itemId'); //ItemId

const filterRoutes = require('./routes/filter'); //filter

const listingRoutes = require('./routes/listings'); //listings
const editRoutes = require('./routes/edit'); //edit
const favouriteRoutes = require('./routes/favourites'); // Favourites
const deleteRoutes = require('./routes/delete'); // delete
const req = require("express/lib/request");
const messageLogRoutes = require('./routes/smsLog'); // message log





// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/", registerRoutes(db)); // register
app.use("/", loginRoutes(db)); // Login
app.use("/", indexRoutes(db)); // Index
app.use("/", itemsRoutes(db)); // Items
app.use("/", logoutRoutes(db)); // Logout
app.use("/", filterRoutes(db)); //filter

app.use("/", listingRoutes(db)); //Listings
app.use("/", editRoutes(db));//Edit
app.use("/", itemIdRoutes(db)); // ItemId
app.use("/", favouriteRoutes(db)); //favourites
app.use("/", deleteRoutes(db)); // delete
app.use("/", messageLogRoutes(db)); // messages log




// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



//this is used to message on the server.
app.get('/message', (req, res) => {
  const accountEmail = req.session.user_id;
  // find the item ID
  const adminEmail = req.session.adminEmail;
  console.log("adminEmailadminEmailadminEmailadminEmail: ", adminEmail);
  const cookieItemId = req.session.itemid;
  const arr = [accountEmail, cookieItemId];
  const value = req.session.user_id;
  const is_admin = req.session.is_admin;
  Message.insertMessage(arr);
  db.query(`SELECT admins.email
          FROM admins
          JOIN items
          ON items.admin_id = admins.id
          AND items.id = $1;`, [cookieItemId])
    .then(data => {
      console.log("data.rowsdata.rowsdata.rows", data.rows);
      // const tempVar = {user_Email: accountEmail, is_admin, items: data.rows};
      res.render("message", {user_Email: accountEmail, item_Id: cookieItemId, value:value, is_admin:is_admin});
    });


});

app.post('/message', (req, res) => {
  console.log("TESTING WORKED!!!");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log("TEST MSG: ",msg);
    Message.getMessageSessionId(msg)
      .then((data)=>{
        console.log("data TEST: ", data);
        const logging = [msg[2], data];
        Message.insertMessageLog(logging);
      });
//we need helper function
  });
});
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
