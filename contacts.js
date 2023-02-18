const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
  if (contacts.length === 0) {
    return console.log("There are no contacts in the list");
  }
  console.table(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    console.log(`There is no contact with id ${contactId}`);
    return;
  }
  console.log("Search result:");
  console.table(result);
  return;
}

async function removeContact(contactId) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    console.log(`There is no contact with id ${contactId}`);
    return;
  }
  const index = contacts.indexOf(result);
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  console.log(`Contact with id ${contactId} was removed successfully`);
  listContacts();
  return;
}

async function addContact(name, email, phone) {
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data));
  const id = uuidv4();
  contacts.push({ id, name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  console.log(`Contact ${name} successfully added`);
  listContacts();
  return;
}

function asyncHandler(func, ...args) {
  try {
    func(...args);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  asyncHandler,
};
