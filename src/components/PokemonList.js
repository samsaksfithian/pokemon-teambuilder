import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonItem from './PokemonItem';
import '../css/PokemonList.css';

const LOAD_AMOUNT = 2;

export default class PokemonList extends Component {
  static propTypes = {
    pokemonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      offset: LOAD_AMOUNT,
    };

    window.addEventListener('scroll', event => this.scrollHandler(event));
  }

  scrollHandler = () => {
    window.onscroll = () => {
      const list = document.documentElement;
      const pageHeight = window.innerHeight + list.scrollTop;
      const listHeight = list.offsetHeight;
      const scrollOffsetHeight = 150;

      if (pageHeight >= listHeight - scrollOffsetHeight) {
        this.loadMoreSpecies();
      }
    };
  };

  loadMoreSpecies = () => {
    const { pokemonList } = this.props;
    if (pokemonList.length > LOAD_AMOUNT) {
      // console.log(`loading more, current load amount = ${this.state.offset}`);
      this.setState(prevState => ({ offset: prevState.offset + LOAD_AMOUNT }));
    } else {
      this.setState({ offset: LOAD_AMOUNT });
    }
  };

  render() {
    const { pokemonList } = this.props;
    const { offset } = this.state;
    return (
      <div className="pokemon-list">
        <ul className="list">
          {pokemonList.slice(0, offset).map(pokemon => (
            <li key={pokemon.name}>
              <PokemonItem pokemon={pokemon} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
