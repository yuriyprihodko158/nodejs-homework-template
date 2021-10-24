const { User } = require("../../../models/contacts/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
     const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      throw new Unauthorized("Wrong email or password");
    };
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload,SECRET_KEY);
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    });
};

module.exports = login;