const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
        min: 3,
    },
    tanggalLahir: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    //optional
    //  Jenis Kelamin
    //  Tempat Lahir
    jenisKelamin: {
        type: Boolean,
    },
    tempatLahir: {
        type: String,
    },
    // Set Jadwal Tes
    tiketUser: {
        type: String,
    },
    lokasiTes: {
        type: String,
    },
    jadwalTes: {
        type: Date,
    },
    // Hasil Tes

    hasilTes: {
        type: Boolean,
    },
});
module.exports = mongoose.model("user", userSchema);
