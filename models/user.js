const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
        min: 3,
    },
    tanggal_lahir: {
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
    jenis_kelamin: {
        type: Boolean,
    },
    tempat_lahir: {
        type: String,
    },
    // Set Jadwal Tes
    tiket_user: {
        type: String,
    },
    tempat_tes: {
        type: String,
    },
    jadwal_tes: {
        type: Date,
    },
    // Hasil Tes

    hasil_tes: {
        type: Boolean,
    },
});
module.exports = mongoose.model("user", userSchema);
