import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';
import s from '../ContactList/ContactStyle.module.scss';
import { useSelector } from 'react-redux';

export function ContactList({ onDeleteContact }) {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  const filteredContacts = () =>
    contacts.filter(item =>
      item.name.toLowerCase().trim().includes(filter.toLowerCase())
    );
  return (
    <ul className={s.list}>
      {filteredContacts().map(({ id, name, number }) => (
        <ContactItem
          onDeleteContact={onDeleteContact}
          key={id}
          name={name}
          number={number}
          id={id}
        />
      ))}
    </ul>
  );
}

ContactList.prototype = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
