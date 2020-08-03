require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const winston = require('./config/winston');
const morgan = require('morgan');

const dbIp = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME

app.use(morgan('combined', { stream: winston.stream.write }))
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true})
.then(() => {
  winston.log({
    level: 'info',
    message: "Database is connected"
  });
}).catch(err =>
  winston.log({
    level: 'error',
    message: 'unable to connect with the database',
  }));

// mongoose.connect
// (
//     `mongodb://${dbIp}:${dbPort}/${dbName}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
//     { useNewUrlParser: true }
//   )

//controllers
const authController = require("./controller/auth")();
const questionsController = require("./controller/questions")();
const usersController = require("./controller/users")();
const changesController = require("./controller/changes")();


//routes
const authRoute = require("./router/auth")(authController);
const questionsRoute = require("./router/questions")(questionsController);
const usersRoute = require("./router/users")(usersController);
const changesRoute = require("./router/changes")(changesController);


app.use(express.json())
const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use("/node/auth", authRoute.getRouter());
app.use("/node/questions", questionsRoute.getRouter());
app.use("/node/users", usersRoute.getRouter());
app.use("/node/changes", changesRoute.getRouter());




app.listen(9000, () => {
  winston.log({
    message: "listening....... 9000",
    level: 'info'
  });
});

module.exports = app