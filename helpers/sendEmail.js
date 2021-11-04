const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'prihodko158@meta.ua',
    pass: EMAIL_PASSWORD,
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
  const email = { ...data, from: 'prihodko158@meta.ua' }
  try {
    await transporter.sendMail(email)
    return true
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendEmail