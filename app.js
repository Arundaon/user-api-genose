const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
app.use(cors());
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
