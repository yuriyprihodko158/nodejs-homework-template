const { NotFound } = require('http-errors');
const { User } = require('../../../models/contacts/user');

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });

  if (!user) {
    throw new NotFound();
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null })

  res.json({
    status: 'success',
    code: 200,
    message: 'Email success verify',
  });
};

module.exports = verify;