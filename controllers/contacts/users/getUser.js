const { User } = require('../../../models/contacts/user');

const getUser = async (req, res) => {
  const { token } = req.user;
  const { email, subscription } = await User.findOne({ token });

  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    }
  });
};

module.exports = getUser;