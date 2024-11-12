const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funkcja zwracająca listę wszystkich kontaktów
async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Błąd podczas odczytu kontaktów:', error);
    }
  }
  
  // Funkcja zwracająca kontakt o podanym ID
  async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      return contacts.find(contact => contact.id === contactId);
    } catch (error) {
      console.error(`Błąd podczas wyszukiwania kontaktu o ID ${contactId}:`, error);
    }
  }
  
  // Funkcja dodająca nowy kontakt
  async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const newContact = { id: generateUniqueId(), name, email, phone };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;
    } catch (error) {
      console.error('Błąd podczas dodawania kontaktu:', error);
    }
  }
  
  // Funkcja usuwająca kontakt o podanym ID
  async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
      return contacts.length !== updatedContacts.length;
    } catch (error) {
      console.error(`Błąd podczas usuwania kontaktu o ID ${contactId}:`, error);
    }
  }
  
  // Eksport funkcji
  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  };
  