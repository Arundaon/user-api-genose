const jwt = require("jsonwebtoken");
module.exports = async function (req, res, next) {
    const token = req.header("jwtoken");
    if (!token) return res.status(400).json({ message: "jwt token not found" });
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "invalid token", err });
    }
};
