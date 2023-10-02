import axios from 'axios';

axios.defaults.baseURL = 'https://65185d20582f58d62d35a25e.mockapi.io/contacts';

export const getContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('błąd podczas pobierania kontaktów: ', error);
    throw error;
  }
};

export const addContact = async contact => {
  try {
    const response = await axios.post('/contacts', contact);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas dodawania kontaktu:', error);
    throw error;
  }
};

export const deleteContact = async contactId => {
  try {
    await axios.delete(`/contacts/${contactId}`);
  } catch (error) {
    console.error('Błąd podczas usuwania kontaktu:', error);
    throw error;
  }
};
