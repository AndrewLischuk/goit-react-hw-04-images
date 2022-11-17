import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ handlerSearchRequest }) => {
  const [page, setPage] = useState(1);
  const [searchRequest, setSearchRequest] = useState('');

  const handlerInputChange = e => {
    const { value } = e.currentTarget;
    setSearchRequest(value);
  };

  const handlerFormSubmit = e => {
    e.preventDefault();
    handlerSearchRequest(searchRequest, page);
    setPage(1);
    setSearchRequest('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handlerFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label"></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          value={searchRequest}
          autoFocus
          placeholder="Search images and photos"
          onChange={handlerInputChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = { handlerSearchRequest: PropTypes.func };
