const express = require('express');

const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares');
const { subSchema } = require('../../models/contacts/user');
const { users: ctrl } = require('../../controllers/contacts');

const router = express.Router();

router.get('/current', authenticate, controllerWrapper(ctrl.getUser));
router.patch('/', authenticate, validation(subSchema), controllerWrapper(ctrl.changeStatus));
router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar));
router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify));
router.post('/verify', controllerWrapper(ctrl.reVerify));

module.exports = router;