import React, { Component } from 'react';
import axios from 'axios';
import PokemonItem from './PokemonItem';
import PokemonDetails from './PokemonDetails';
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
      isModalVisible: false,
      modalPokemon: {},
      styles: {},
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
    this.setState({
      offset: this.state.offset + LOAD_AMOUNT,
    });
  };

  toggleModal = data => {
    if (this.state.isModalVisible) {
      this.setState({
        isModalVisible: false,
        styles: { backgroundColor: 'rgba(0, 0, 0, 0.0)', disabled: false },
      });
    } else {
      this.setState({
        isModalVisible: true,
        modalPokemon: data,
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          disabled: true,
        },
      });
    }
  };

  render() {
    const {
      species, offset, isModalVisible, modalPokemon, styles,
    } = this.state;
    return (
      <div className="pokemon-list">
        {isModalVisible && (
          <PokemonDetails
            data={modalPokemon}
            toggleModal={this.toggleModal}
            isVisible={isModalVisible}
          />
        )}

        <div className="overlay" style={styles} />
        {species.slice(0, offset).map((pokemon, index) => (
          <PokemonItem
            key={index + 1}
            id={index + 1}
            pokemon={pokemon}
            toggleModal={this.toggleModal}
          />
        ))}
      </div>
    );
  }
}
