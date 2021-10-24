const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require('../../models/contacts/contact');
require('dotenv').config();

const listContacts = async (req, res) => {
  const { page = 1, limit = 4, favorite } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const contacts = await Contact.find(favorite ? { owner: _id, favorite } : { owner: _id }, '_id name email phone favorite', { skip, limit: +limit }).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findOne({ owner: _id, _id: contactId }, '_id name email phone favorite').populate('owner', 'email');
  if (!contact) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    contact
  });
};

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndRemove({ owner: _id, _id: contactId });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({ owner: _id, _id: contactId }, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;

  if (typeof favorite === 'undefined') {
    throw new BadRequest('missing field favorite');
  }
  const result = await Contact.findOneAndUpdate({ owner: _id, _id: contactId }, { favorite }, { new: true });
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateStatusContact,
};