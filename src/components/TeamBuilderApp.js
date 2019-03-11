import React, { Component } from 'react';
import PokemonList from './PokemonList';
import TeamViewer from './TeamViewer';
import SearchBar from './SearchBar';
import axios from 'axios';

export default class TeamBuilderApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      team: [],
    };
  }

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon`)
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.error(error));
  }

  handleRemoveFromTeam = index => {
    const newTeam = this.state.team.slice(0);
    newTeam.splice(index, 1);
    this.setState({ team: newTeam });
  };

  handleAddToTeam = aPokemon => {
    if (this.state.team.length < 6) {
      const newTeam = this.state.team.slice(0);
      newTeam.push(aPokemon);
      this.setState({ team: newTeam });
    } else {
      window.alert(
        'Your team is full! Remove a Pokemon from your team before adding a new one',
      );
    }
  };

  handleSearch = searchText => {
    // still need to handle being able to search for part of a pokemon name
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchText}`)
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="team-builder-app">
        <SearchBar onSearch={this.handleSearch} />
        <PokemonList
          pokemonList={this.state.pokemonList}
          onAddToTeam={this.handleAddToTeam}
        />
        <TeamViewer team={this.state.team} onRemoveFromTeam={this.handleRemoveFromTeam} />
      </div>
    );
  }
}
