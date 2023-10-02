import { configureStore } from '@reduxjs/toolkit';
import { contactsSliceReducer } from './contactsSlice'; // Popraw import
import { filterReducer } from './filterSlice'; // Popraw import

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filter: filterReducer,
  },
});
