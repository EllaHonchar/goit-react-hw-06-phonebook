import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { addContactAction, setName, setNumber } from 'redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import s from '../ContactsForm/FormStyle.module.scss';

export function ContactForm() {
  const name = useSelector(state => state.contacts.name);
  const number = useSelector(state => state.contacts.number);
  const contacts = useSelector(state => state.contacts.contacts);

  const dispatch = useDispatch();

  const addContact = contact => {
    if (contacts.some(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      dispatch(addContactAction(contact));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(setName(value.trim()));
        break;
      case 'number':
        dispatch(setNumber(value));
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    addContact(newContact);
    dispatch(setName(''));
    dispatch(setNumber(''));
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          placeholder="Name..."
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <input
          className={s.input}
          placeholder="Number..."
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
