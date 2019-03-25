import React, { Component } from 'react';
import '../css/SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTextValue: '',
    };
  }

  handleChange = event => {
    this.setState({ searchTextValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.searchTextValue);
  };

  render() {
    return (
      <nav className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <span role="img" aria-label="search">
            🔎
          </span>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.searchTextValue}
            onChange={this.handleChange}
          />
        </form>
      </nav>
    );
  }
}

export default SearchBar;
