import React, { Component } from 'react';
import path from 'path';
import axios from 'axios';
import '../css/variables.css';
import '../css/PokemonItem.css';
import pokeball from '../images/pokeball.png';

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      pokemon: {},
      picture: '',
      types: []
    };
  }

  componentDidMount() {
    axios.get(this.props.pokemon.url).then(res => {
      const id = this.props.id;
      const pokemon = res.data;
      const types = res.data.types.map(elem => {
        return {
          type: elem.type.name,
          styles: {
            backgroundColor: `var(--${elem.type.name}-type-light)`
          }
        };
      });

      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${id}${'.png'}`;

      this.setState({
        id,
        pokemon,
        picture,
        types
      });
    });
  }

  render() {
    const { id, pokemon, picture, types } = this.state;

    return (
      <div className="pkmn-card-container">
        {!Object.keys(pokemon).length && <p>Loading...</p>}
        {Object.keys(pokemon).length && (
          <div className="pkmn-card">
            <div className="pkmn-pic">
              <img src={picture} alt={`${pokemon.name}`} />
            </div>
            <div className="pkmn-info">
              <div className="pkmn-info-id">{`#${('00' + id).slice(-3)}`}</div>
              <div>
                <span>
                  <img
                    className="pkmn-info-ball"
                    src={pokeball}
                    alt="pokeball"
                  />
                </span>
                <span className="pkmn-info-name">{pokemon.name}</span>
              </div>
              <div className="pkmn-info-types">
                {types.map((slot, index) => (
                  <span key={index} style={slot.styles}>
                    {slot.type}
                  </span>
                ))}
              </div>
            </div>
            <div className="pkmn-recruit">+</div>
          </div>
        )}
      </div>
    );
  }
}
