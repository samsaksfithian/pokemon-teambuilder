import React, { Component } from 'react';
import axios from 'axios';
import PokemonItem from './PokemonItem';
import '../css/PokemonList.css';

const TOTAL_NUM_PKMN = 964;
const LOAD_AMOUNT = 20;
const POKEAPI_URL = `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_NUM_PKMN}`;

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [],
      offset: 0,
    };

    window.addEventListener('scroll', event => this.scrollHandler(event));
  }

  componentDidMount() {
    axios.get(POKEAPI_URL).then(res => {
      this.setState({
        species: res.data.results,
        offset: LOAD_AMOUNT,
      });
    });
  }

  scrollHandler = () => {
    window.onscroll = () => {
      const list = document.documentElement;
      const pageHeight = window.innerHeight + list.scrollTop;
      const listHeight = list.offsetHeight;

      if (pageHeight === listHeight) this.loadMoreSpecies();
    };
  };

  loadMoreSpecies = () => {
    this.setState(prevState => ({ offset: prevState.offset + LOAD_AMOUNT }));
  };

  render() {
    const { species, offset } = this.state;
    return (
      <div className="pokemon-list">
        <ul className="list">
          {species.slice(0, offset).map((pokemon, index) => (
            <li key={index + 1}>
              <PokemonItem key={index + 1} id={index + 1} pokemon={pokemon} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
