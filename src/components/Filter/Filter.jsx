import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import s from '../Filter/Filter.module.scss';

export function Filter({ onChangeFilter }) {
  const value = useSelector(state => state.contacts.filter);
  return (
    <div className={s.container}>
      <h3 className={s.title}>Find contacts by name</h3>
      <input
        className={s.input}
        placeholder="Input name..."
        type="onSubmit"
        name="filter"
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );
}

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};
