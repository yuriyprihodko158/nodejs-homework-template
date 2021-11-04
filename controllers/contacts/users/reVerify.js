const { NotFound, BadRequest } = require('http-errors');

const { User } = require('../../../models/contacts/user');
const { sendEmail } = require('../../../helpers');

const reVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('Missing required field email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Confirmation of registration',
    html: `
    <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Click to confirm email</a>
    `,
  };

  sendEmail(mail);

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = reVerify;