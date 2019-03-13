import React, { Component } from 'react';
import axios from 'axios';
import PokemonItem from './PokemonItem';
import '../css/PokemonList.css';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const API = {};
API.getPokemon = () => {};

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [],
      next: '',
      hasMore: true,
      isLoading: false,
      error: false
    };

    window.onscroll = () => {
      const {
        loadSpecies,
        state: { hasMore, isLoading, error }
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadSpecies();
      }
    };
  }

  componentDidMount() {
    axios.get(POKEAPI_URL).then(res => {
      this.setState({
        next: res.data.next,
        species: res.data.results
      });
    });
  }

  render() {
    const { species } = this.state;

    return (
      <div className="pokemon-list">
        <ul className="list">
          {species.map((pokemon, index) => (
            <li>
              <PokemonItem
                key={pokemon.name}
                id={index + 1}
                pokemon={pokemon}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  loadSpecies = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        axios
          .get(this.state.next)
          .then(res => {
            const nextSpecies = res.data.results;

            this.setState({
              species: [...this.state.species, ...nextSpecies],
              next: res.data.next,
              hasMore: this.state.species.length < res.data.count,
              isLoading: false
            });
          })
          .catch(err => {
            this.setState({
              error: err.message,
              isLoading: false
            });
          });
      }
    );
  };
}
