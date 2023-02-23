// import { useEffect } from 'react';
import { ContactForm } from './ContactsForm/ContactsForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction, deleteContactAction } from 'redux/contactSlice';
import { filterContactAction } from 'redux/filterSlice';
import s from './App.module.scss';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  // useEffect() => {
  //   localStorage.setContact('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = contact => {
    if (contacts.some(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      dispatch(addContactAction(contact));
    }
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContactAction(contactId));
  };

  const onChangeFilter = e => {
    dispatch(filterContactAction(e.target.value));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <h2 className={s.title}>Contacts</h2>
      <Filter onChangeFilter={onChangeFilter} value={filter} />
      <ContactList
        onDeleteContact={onDeleteContact}
        // contacts={filteredContacts}
        contacts={onChangeFilter}
      />
    </div>
  );
};
