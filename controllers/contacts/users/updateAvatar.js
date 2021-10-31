const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../../models/contacts/user');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  await Jimp.read(tempDir)
    .then(avatar => {
      return avatar.resize(250, 250).write(tempDir)
    })
    .catch(err => console.log(err));

  const [extension] = originalname.split('.').reverse();
  const filename = `${_id}.${extension}`;
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename);
  try {
    await fs.rename(tempDir, uploadDir);
    const image = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL: image });

    res.json({
      status: 'success',
      message: 'Update avatar success'
    })
  } catch (error) {
    await fs.unlink(tempDir)
  }
};

module.exports = updateAvatar;