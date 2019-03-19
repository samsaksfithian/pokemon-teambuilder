import React, { Component } from 'react';
import axios from 'axios';
import pokeball from '../images/recruit-indicator.png';
import '../css/variables.css';
import '../css/PokemonItem.css';

const PKMN_IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/`;

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      pokemon: {},
      picture: '',
      types: [],
      recruit: false
    };
  }

  componentDidMount() {
    axios.get(this.props.pokemon.url).then(res => {
      this.setState({
        id: this.props.id,
        pokemon: res.data,
        picture: `${PKMN_IMG_URL}${this.props.id}${'.png'}`,
        types: res.data.types.reduceRight((acc, elem) => {
          return acc.concat({
            type: elem.type.name,
            styles: {
              backgroundColor: `var(--${elem.type.name}-type)`
            }
          });
        }, [])
      });
    });
  }

  render() {
    const { id, pokemon, picture, types, recruit } = this.state;

    return (
      <div className="pkmn-card">
        <div className="pkmn-pic">
          <img src={picture} alt={`${pokemon.name}`} />
        </div>
        <div className="pkmn-info">
          <div className="pkmn-id">{`#${('00' + id).slice(-3)}`}</div>
          <div>
            <span className={`pkmn-ball ${recruit ? 'recruit' : ''}`}>
              <img src={pokeball} alt="pokeball" />
            </span>
            <span className="pkmn-name">{pokemon.name}</span>
          </div>
          <div className="pkmn-types">
            {types.map((slot, index) => (
              <span key={index} style={slot.styles}>
                {slot.type}
              </span>
            ))}
          </div>
        </div>
        <button className="pkmn-recruit" onClick={this.handleRecruit}>
          {recruit ? 'x' : '+'}
        </button>
      </div>
    );
  }

  handleRecruit = event => {
    this.setState({
      recruit: !this.state.recruit
    });
  };
}
