const express = require("express");
const app = express();
require("dotenv/config");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);
app.use("/", (req, res) => {
    res.status(400).json({ status: 400, message: "invalid request" });
});

mongoose.connect(
    "mongodb+srv://ary:" +
        process.env.DATABASE_KEY +
        "@bcc-workshop.u94wq.mongodb.net/bcc-internship?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(port, () => {
                console.log("listening to port " + port);
            });
            console.log("connected to database");
        }
    }
);
