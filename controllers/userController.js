const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const {
    userRegisterValidator,
    userLoginValidator,
} = require("../validators/userValidator");

async function registerUser(req, res) {
    const { value, error } = userRegisterValidator(req.body);
    if (error)
        return res
            .status(400)
            .json({ message: error["details"][0].message, ...error });
    const hasEmail = await User.exists({ email: req.body.email });
    if (hasEmail)
        return res.status(400).json({ message: "Email already exist" });

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
        res.json({ message: "user registered successfully", ...savedUser });
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

async function findAllUser(req, res) {
    try {
        const allUser = await User.find();
        res.json(allUser);
    } catch (err) {
        res.json({ message: err });
    }
}

async function findOneUser(req, res) {
    try {
        const oneUser = await User.findById(req.params.id);
        res.json(oneUser);
    } catch (err) {
        res.json({ message: err });
    }
}

async function deleteUser(req, res) {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.id });
        res.json({ message: "sucessfully deleted the User", ...deletedUser });
    } catch (err) {
        res.json({ message: err });
    }
}

async function editUser(req, res) {
    try {
        const editedUser = await User.updateOne(
            { _id: req.params.id },
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
        res.json({ message: "sucessfully edited the User", ...editedUser });
    } catch (err) {
        res.status(400).json({
            message: "error editing User",
            additionalmessage: err,
        });
    }
}

async function loginUser(req, res) {
    console.log(req.session);
    const { error } = userLoginValidator(req.body);
    if (error)
        return res
            .status(400)
            .json({ message: error["details"][0].message, ...error });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "email not found" });

    const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!passwordCheck)
        return res.status(400).json({ message: "wrong password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
    res.header({ jwtoken: token }).json({
        message: "logged in !",
        jwtoken: token,
    });
    console.log(req.session);
}

module.exports = {
    registerUser,
    findAllUser,
    findOneUser,
    deleteUser,
    editUser,
    loginUser,
};
