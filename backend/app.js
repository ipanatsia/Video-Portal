const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const videoRoutes = require("./routes/video");


mongoose
  .connect(
    "mongodb+srv://ipanatsia:kSL6aZMolCOgnzpj@videoportalcluster-xawvo.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true}
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use("/api/users",userRoutes);
  app.use("/api/videos",videoRoutes);




module.exports = app;