/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import FastAverageColor from 'fast-average-color/dist/index.es6';
import pokeball from '../images/recruit-indicator.png';
import '../css/variables.css';
import '../css/PokemonItem.css';

// const PKMN_IMG_URL =
//   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/';
const PKMN_IMG_URL_LOCAL = `${process.env.PUBLIC_URL}/sprites/pokemon/official-artwork/`;

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      pokemon: {},
      picture: '',
      types: [],
      recruit: false,
      styles: {
        backgroundColor: '',
      },
    };
  }

  componentDidMount() {
    this.getPokemonData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pokemon !== this.props.pokemon) {
      this.getPokemonData();
    }
  }

  getPokemonData = () => {
    axios.get(this.props.pokemon.url).then(response => {
      axios.get(response.data.varieties[0].pokemon.url).then(res => {
        this.setState({
          id: res.data.id,
          pokemon: res.data,
          picture: `${PKMN_IMG_URL_LOCAL}${res.data.id}${'.png'}`,
          // eslint-disable-next-line arrow-body-style
          types: res.data.types.reduceRight((acc, elem) => {
            return acc.concat({
              type: elem.type.name,
              styles: {
                backgroundColor: `var(--${elem.type.name}-type)`,
              },
            });
          }, []),
        });
      });
    });
  };

  handleOnLoad = () => {
    const fac = new FastAverageColor();
    const colorInfo = fac.getColor(
      document.querySelector(`#pkmn-pic-${this.state.id} img`),
    );
    const styles = {
      backgroundColor: colorInfo.rgb,
    };

    this.setState({ styles });
  };

  handleRecruit = () => {
    this.setState(prevState => ({
      recruit: !prevState.recruit,
    }));
  };

  handleRecruit = () => {
    this.setState(prevState => ({ recruit: !prevState.recruit }));
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { id, pokemon, picture, types, recruit, styles } = this.state;

    return (
      <div className="pkmn-card" style={styles}>
        <div id={`pkmn-pic-${id}`} className="pkmn-pic">
          <img
            src={picture}
            alt={`${pokemon.name}`}
            crossOrigin=""
            onLoad={this.handleOnLoad}
          />
        </div>
        <div className="pkmn-info">
          <div className="pkmn-id">{`#${`00${id}`.slice(-3)}`}</div>
          <div>
            <span className={`pkmn-ball ${recruit ? 'recruit' : ''}`}>
              <img src={pokeball} alt="pokeball" />
            </span>
            <span className="pkmn-name">{pokemon.name}</span>
          </div>
          <div className="pkmn-types">
            {types.map(slot => (
              <span key={slot.type} style={slot.styles}>
                {slot.type}
              </span>
            ))}
          </div>
        </div>
        <button type="button" className="pkmn-recruit" onClick={this.handleRecruit}>
          {recruit ? 'x' : '+'}
        </button>
      </div>
    );
  }
}
