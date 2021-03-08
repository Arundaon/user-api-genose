const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const {
    userRegisterValidator,
    userLoginValidator,
} = require("../validators/userValidator");
const { find } = require("../models/user");
async function registerUser(req, res) {
    const { value, error } = userRegisterValidator(req.body);
    if (error)
        return res.status(400).json({
            status: "FAILED",
            message: error["details"][0].message,
            data: { ...error },
        });
    const hasEmail = await User.exists({ email: req.body.email });
    if (hasEmail)
        return res.status(400).json({
            status: "FAILED",
            message: "Email already exist",
            data: { hasEmail },
        });

    const user = new User({
        nama: req.body.nama,
        tanggalLahir: req.body.tanggalLahir,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        jenisKelamin: null,
        tempatLahir: null,
        tiketUser: null,
        tempatTes: null,
        jadwalTes: null,
        // Hasil Tes
        hasilTes: null,
    });

    try {
        const savedUser = await user.save();
        res.json({
            status: "SUCCESS",
            message: "user registered successfully",
            data: { ...savedUser },
        });
    } catch (err) {
        res.status(400).json({
            status: "FAILED",
            message: "cannot register user",
            data: { ...err },
        });
    }
}

async function findOneUser(req, res) {
    try {
        const oneUser = await User.findById(
            req.user._id,
            "_id nama tanggalLahir email jenisKelamin tempatLahir tiketUser tempatTes hasilTes jadwalTes"
        );
        res.json({
            status: "SUCCESS",
            message: "user found",
            data: { ...oneUser._doc },
        });
    } catch (err) {
        res.json({
            status: "SUCCESS",
            message: "user not found",
            data: { ...err },
        });
    }
}

async function editUser(req, res) {
    const hasEmail = await User.exists({ email: req.body.email });
    if (hasEmail)
        return res.status(400).json({
            status: "FAILED",
            message: "Email already exist",
            data: { hasEmail },
        });

    try {
        const editedUser = await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    nama: req.body.nama,
                    tanggalLahir: req.body.tanggalLahir,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, salt),
                    jenisKelamin: req.body.jenisKelamin,
                    tempatLahir: req.body.tempatLahir,
                    tiketUser: req.body.tiketUser,
                    tempatTes: req.body.tempatTes,
                    jadwalTes: req.body.jadwalTes,
                    hasilTes: req.body.hasilTes,
                },
            }
        );
        res.json({
            status: "SUCCESS",
            message: "Sucessfully edited the User",
            data: { ...editedUser },
        });
    } catch (err) {
        res.status(400).json({
            status: "FAILED",
            message: "error editing User",
            data: { ...err },
        });
    }
}

async function loginUser(req, res) {
    console.log(req.session);
    const { error } = userLoginValidator(req.body);
    if (error)
        return res
            .status(400)

            .json({
                status: "SUCCESS",
                message: error["details"][0].message,
                data: { ...error },
            });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({
            status: "SUCCESS",
            message: "email not found",
            data: { user },
        });

    const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!passwordCheck)
        return res.status(400).json({
            status: "FAILED",
            message: "wrong password",
            data: { passwordCheck },
        });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
    res.header({ jwtoken: token }).json({
        status: "SUCCESS",
        message: "logged in !",
        data: { jwtoken: token },
    });
    console.log(req.session);
}

module.exports = {
    registerUser,
    findOneUser,
    editUser,
    loginUser,
};
