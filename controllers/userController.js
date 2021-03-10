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
        tanggal_lahir: req.body.tanggal_lahir,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        jenis_kelamin: null,
        tempat_lahir: null,
        tiket_user: null,
        tempat_tes: null,
        jadwal_tes: null,
        hasil_tes: null,
    });

    try {
        const savedUser = await user.save();
        delete savedUser._doc.password;
        res.json({
            status: "SUCCESS",
            message: "user registered successfully",
            data: { ...savedUser._doc },
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
            "_id nama tanggal_lahir email jenis_kelamin tempat_lahir tiket_user tempat_tes hasil_tes jadwal_tes"
        );
        res.json({
            status: "SUCCESS",
            message: "user found",
            data: { ...oneUser._doc },
        });
    } catch (err) {
        res.json({
            status: "FAILED",
            message: "user not found",
            data: { ...err },
        });
    }
}

async function editUser(req, res) {
    const editedUser = await User.findOne({ email: req.body.email });
    if (editedUser && editedUser._id != req.user._id)
        return res.status(400).json({
            status: "FAILED",
            message: "email already exist",
            data: { hasEmail: true },
        });
    const count = await User.count({ jadwal_tes: req.body.jadwal_tes });
    if (count > 50) {
        return res.json({
            status: "FAILED",
            message: "user sudah mencapai 50 pada jam tersebut",
            data: { jumlah_user: count },
        });
    }

    try {
        const updatedUser = await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    nama: req.body.nama,
                    tanggal_lahir: req.body.tanggal_lahir,
                    email: req.body.email,
                    password: editedUser.password,
                    jenis_kelamin: req.body.jenis_kelamin,
                    tempat_lahir: req.body.tempat_lahir,
                    tiket_user: req.body.tiket_user,
                    tempat_tes: req.body.tempat_tes,
                    jadwal_tes: req.body.jadwal_tes,
                    hasil_tes: req.body.hasil_tes,
                },
            }
        );
        res.json({
            status: "SUCCESS",
            message: "Sucessfully edited the User",
            data: { ...updatedUser },
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
