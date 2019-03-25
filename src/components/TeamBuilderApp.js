import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import TeamViewer from './TeamViewer';
import SearchBar from './SearchBar';
import '../css/TeamBuilderApp.css';

const POKEAPI_URL_BASE = 'https://pokeapi.co/api/v2/pokemon';

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
      .get(POKEAPI_URL_BASE)
      .then(response => this.setState({ pokemonList: response.data }))
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
      // eslint-disable-next-line no-alert
      window.alert(
        'Your team is full! Remove a Pokemon from your team before adding a new one',
      );
    }
  };

  handleSearch = searchText => {
    // still need to handle being able to search for part of a pokemon name
    axios
      .get(`${POKEAPI_URL_BASE}/${searchText}`)
      .then(response => this.setState({ pokemonList: response.data }))
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="team-builder-app">
        <header>Pokémon Team Builder</header>
        <SearchBar onSearch={this.handleSearch} />
        <TeamViewer team={this.state.team} onRemoveFromTeam={this.handleRemoveFromTeam} />
        <PokemonList
          pokemonList={this.state.pokemonList}
          onAddToTeam={this.handleAddToTeam}
        />
        {/* <TeamViewer team={this.state.team} onRemoveFromTeam={this.handleRemoveFromTeam} /> */}
      </div>
    );
  }
}
