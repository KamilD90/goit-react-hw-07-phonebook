import { React, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/filterSlice';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contactsSlice';
import Form from './form/Form.jsx';
import ContactList from './ContactList/ContactList.jsx';
import Filter from './filter/Filter.jsx';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .catch(error => {
        console.error('Błąd podczas pobierania kontaktów:', error);
      });
  }, [dispatch]);

  const filterContacts = value => {
    dispatch(setFilter(value));
  };

  const addContactHandler = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact));
  };

  const deleteContactHandler = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.wrapper}>
      <Form onSubmit={addContactHandler} />
      <Filter filterContacts={filterContacts} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContactHandler}
      ></ContactList>
    </div>
  );
}
