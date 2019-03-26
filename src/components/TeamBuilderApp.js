import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import TeamViewer from './TeamViewer';
import SearchBar from './SearchBar';
import '../css/TeamBuilderApp.css';

const TOTAL_NUM_PKMN = 964;
const POKEAPI_URL_BASE = 'https://pokeapi.co/api/v2/';
const POKEAPI_URL_ALL = `${POKEAPI_URL_BASE}pokemon-species?limit=${TOTAL_NUM_PKMN}`;

export default class TeamBuilderApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullPokeList: [],
      pokemonList: [],
      team: [],
    };
  }

  componentDidMount() {
    axios
      .get(POKEAPI_URL_ALL)
      .then(response => {
        this.setState({
          fullPokeList: response.data.results,
          pokemonList: response.data.results,
        });
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  }

  handleRemoveFromTeam = index => {
    this.setState(prevState => {
      const newTeam = prevState.team.slice(0);
      newTeam.splice(index, 1);
      return { team: newTeam };
    });
  };

  handleAddToTeam = aPokemon => {
    if (this.state.team.length < 6) {
      this.setState(prevState => {
        const newTeam = prevState.team.slice(0);
        newTeam.push(aPokemon);
        return { team: newTeam };
      });
    } else {
      // eslint-disable-next-line no-alert
      window.alert(
        'Your team is full! Remove a Pokemon from your team before adding a new one',
      );
    }
  };

  handleSearch = searchText => {
    // console.log(`searching for ${searchText}`);
    if (searchText === '') {
      this.setState(prevState => ({ pokemonList: prevState.fullPokeList }));
    } else {
      this.setState(prevState => ({
        pokemonList: prevState.fullPokeList.filter(
          pokemon => pokemon.name.indexOf(searchText) >= 0,
        ),
      }));
    }
  };

  render() {
    return (
      <div className="team-builder-app">
        <header>Pokémon Team Builder</header>
        <SearchBar onSearch={this.handleSearch} />
        <PokemonList
          pokemonList={this.state.pokemonList}
          offset={this.state.offset}
          onAddToTeam={this.handleAddToTeam}
        />
        <TeamViewer team={this.state.team} onRemoveFromTeam={this.handleRemoveFromTeam} />
      </div>
    );
  }
}
