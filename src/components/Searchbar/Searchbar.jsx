import { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    page: 1,
    searchRequest: '',
  };

  handlerInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ searchRequest: value });
  };

  handlerFormSubmit = e => {
    e.preventDefault();
    this.props.handlerSearchRequest(this.state.searchRequest, this.state.page);
    this.setState({ page: 1, searchRequest: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handlerFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label"></span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            value={this.state.searchRequest}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handlerInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = { handlerSearchRequest: PropTypes.func };
