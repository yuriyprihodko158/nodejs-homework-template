const express = require("express");
 
const { controllerWrapper, validation, authenticate } = require("../../middlewares");
const {joiSchema} = require("../../models/contacts/user");
const { auth: ctrl } = require("../../controllers/contacts");

const router = express.Router();

router.post('/register', validation(joiSchema), controllerWrapper(ctrl.register));

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));

router.get('/logout', authenticate, controllerWrapper(ctrl.logout));

module.exports = router;