const express = require('express');
const router = express.Router();

const {controllerWrapper,validation}=require("../../middlewares")
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers/contacts");

router.get('/',controllerWrapper(ctrl.listContacts));

router.get('/:id',controllerWrapper (ctrl.getContactById));

router.post('/',validation(contactSchema), controllerWrapper(ctrl.addContact));

router.put('/', validation(contactSchema),controllerWrapper(ctrl.updateById));

router.delete('/:id', controllerWrapper(ctrl.removeContact));

module.exports = router
