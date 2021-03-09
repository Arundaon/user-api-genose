const joi = require("joi");
function userRegisterValidator(body) {
    const userSchema = joi.object({
        nama: joi.string().min(3).required(),
        password: joi.string().min(8).required(),
        email: joi.string().email().required(),
        tanggal_lahir: joi.date().required(),
        //optional
        jenis_kelamin: joi.string(),
        tempat_lahir: joi.string(),
        //tes info
        tiket_user: joi.string(),
        tempat_tes: joi.string(),
        jadwal_tes: joi.date(),
        hasil_tes: joi.string(),
    });
    return userSchema.validate(body);
}
const userLoginValidator = (body) => {
    const userSchema = joi.object({
        password: joi.string().required(),
        email: joi.string().email().required(),
    });
    return userSchema.validate(body);
};
module.exports = {
    userRegisterValidator,
    userLoginValidator,
};
