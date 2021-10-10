const { NotFound} = require("http-errors");

const contactsOperations = require("../../model/contacts");

const listContacts = async (req, res, next) => {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts)
}

const getContactById = async (req, res, next) => {
    const {id} = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      throw new NotFound (`Product with id=${id} not found`);
      }
    
    res.json(contact)
}
const addContact = async (req, res, next) => {
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "sucsess",
      code: 201,
      data: {
        result
      }
    })
}
const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateById(Number(contactId), req.body);
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
const removeContact = async (req, res, next) => {
    const {id} = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new NotFound (`Product with id=${id} not found`);
      }
    
    res.json({
      status: "succsess",
      code: 200,
      message: "Sucsess delete",
      data: {
        result
      }
    })
}
module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateById,
    removeContact
}