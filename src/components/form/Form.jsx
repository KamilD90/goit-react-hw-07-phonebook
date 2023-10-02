import css from './Form.module.css';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';

const Form = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = { id: nanoid(), name, number };
    dispatch(addContact(newContact))
      .unwrap()
      .catch(error => {
        console.error('błąd dodawania kontaktu:', error);
      });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="name" className={css.label}>
        Imię:
        <input
          id="name"
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          className={css.input}
          pattern="^[a-zA-Z]+([-'\\s][a-zA-Z]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="..."
        />
      </label>
      <label htmlFor="number" className={css.label}>
        Numer telefonu:
        <input
          id="number"
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          className={css.input}
          pattern="^[a-zA-Z]+([-'\\s][a-zA-Z]+)*$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.button}>
        Dodaj do kontaktów
      </button>
    </form>
  );
};

export default Form;
