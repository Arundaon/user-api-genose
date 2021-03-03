// const express = require("express");
// const app = express();
// const port = process.env.PORT || 8000;
// require("dotenv/config");
// const mongoose = require("mongoose");
// const urlencodedParser = express.urlencoded({ extended: false });
// const userRoute = require("./routes/userRoute");
// app.use(express.json());
// app.use("/user", userRoute);
// app.set("view engine", "ejs");
// app.set("views", "website");
// app.get("/", async (req, res) => {
//     try {
//         const penumpangs = await Penumpang.find();
//         res.render("home", { penumpangs: penumpangs });
//     } catch (err) {
//         res.send(err);
//     }
// });
// app.post("/create", urlencodedParser, async (req, res) => {
//     const penumpang = new Penumpang({
//         nama: req.body.nama,
//         tanggalLahir: req.body.tanggalLahir,
//         stasiunAwal: req.body.stasiunAwal,
//         jamBerangkat: req.body.jamBerangkat,
//         stasiunTujuan: req.body.stasiunTujuan,
//         jamSampai: req.body.jamSampai,
//     });
//     try {
//         const savedPenumpang = await penumpang.save();
//         res.redirect("/");
//     } catch (err) {
//         res.json(err);
//     }
// });
// app.delete("/delete", async (req, res) => {
//     try {
//         Penumpang.deleteOne({ _id: req.body._id });
//         res.send("<script>alert('deleted')</script>");
//     } catch (err) {
//         res.send("<script>alert('error deleting');</script>");
//     }
// });
// mongoose.connect(
//     "mongodb+srv://ary:" +
//         process.env.DATABASE_KEY +
//         "@bcc-workshop.u94wq.mongodb.net/bcc-internship?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             app.listen(port, () => {
//                 console.log("listening to port " + port);
//             });
//             console.log("connected to database");
//         }
//     }
// );
const jwt = require("jsonwebtoken");

const token = jwt.sign({ name: "ary", status: "alive" }, "secret");
console.log(token);
const decoded = jwt.verify(token, "secret");
console.log(decoded);
