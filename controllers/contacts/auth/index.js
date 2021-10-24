const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getUser = require('./getUser');
const changeStatus = require('./changeStatus');

module.exports = {
  register,
  login,
  logout,
  getUser,
  changeStatus,
};