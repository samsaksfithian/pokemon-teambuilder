import React, { Component } from 'react';
import axios from 'axios';
import '../css/variables.css';
import '../css/PokemonItem.css';

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      pokemon: {},
      types: []
    };
  }

  componentDidMount() {
    axios.get(this.props.pokemon.url).then(res => {
      this.setState({
        id: this.props.id,
        pokemon: res.data,
        types: [...res.data.types]
      });
    });
  }

  render() {
    const { id, pokemon, types } = this.state;

    const IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/${id}${'.png'}`;

    return (
      <div className="pokemon">
        <span className="pokemon-sprite">
          <img src={id !== 0 ? IMG_URL : ''} alt={`{pokemon.name} sprite`} />
        </span>
        <span className="pokemon-specie">
          <p>{id !== 0 ? pokemon.name : 'Loading...'}</p>
        </span>
        <span className="pokemon-types">
          {types.map(el => (
            <span
              key={el.slot}
              className={`${el.type.name} pokemon-type`}
            style={{backgroundColor:var(--${el.type.name}-type);}}
            >
              <p>{id !== 0 ? el.type.name : 'Loading...'}</p>
            </span>
          ))}
        </span>
      </div>
    );
  }
}
