import { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchRequest: '',
  };

  handlerInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ searchRequest: value });
  };

  handlerFormSubmit = e => {
    e.preventDefault();
    this.props.handlerSearchRequest(this.state.searchRequest);
    this.setState({ searchRequest: '' });
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
