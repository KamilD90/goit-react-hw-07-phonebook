import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const contacts = await api.getContacts();
    return contacts;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contactId => {
    await api.addContact(contactId);
    return contactId;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await api.deleteContact(contactId);
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    });
  },
});

export const contactsSliceReducer = contactsSlice.reducer;
