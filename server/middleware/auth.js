const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

//cookie based
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Grab token from the req.headers.authorization
    if (!token) {
      return res.status(401).json({ msg: "No token, action denied!" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.data;
    next();
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
};
