require("dotenv").config();
require("./config")(process.env.DB_URL);
// require("./seeds")();

const express = require("express");
const app = express();
const server = require("http").createServer(app);

// Sockets set up
require("./services/sockets")(server);
// const io = require("socket.io")(server);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3001);

const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// const session = require("express-session");
// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   session({
//     secret: "keyboard cat",
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
//   })
// );

// const cookieSession = require("cookie-session");
// app.set('trust proxy', 1) // trust first proxy
//
// app.use(cookieSession({
//   name: 'session',
//   keys: ['token']
// }))

const apiRoutes = require("./routes/api");
app.use("/djello/api", apiRoutes);

const usersRoutes = require("./routes/users");
app.use("/djello/api/users", usersRoutes);

// io.on("connection", client => {
//   console.log("CONNECTION WAS SUCCESSFUL!!");
//   client.on("login", user => {
//     console.log("user: ", user);
//   });

// client.on("subscribeToTimer", interval => {
//   console.log("client is subscribing to timer with interval ", interval);
//   setInterval(() => {
//     client.emit("timer", new Date());
//   }, interval);
// });
// });

const port = server.listen(app.get("port"), () => {
  console.log(`listening on ${app.get("port")}`);
});
