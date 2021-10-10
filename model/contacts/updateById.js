const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateById = async(id, data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {...contacts[idx], ...data};
    await updateContacts(contacts);
    return contacts[idx];
};

module.exports = updateById;