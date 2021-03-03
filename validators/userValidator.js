const joi = require("joi");
function userRegisterValidator(body) {
    const userSchema = joi.object({
        nama: joi.string().min(3).required(),
        password: joi.string().min(8).required(),
        email: joi.string().email().required(),
        tanggalLahir: joi.date().required(),
        //optional
        jenisKelamin: joi.boolean(),
        tempatLahir: joi.string(),
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
