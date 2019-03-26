import React, { Component } from 'react';
import '../css/PokemonDetails.css';

export default class PokemonDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      id: 0,
      pokemon: {},
      picture: '',
      types: [],
      stats: [],
      abilities: [],
      loading: true,
      styles: {},
    };
  }

  componentDidMount() {
    const {
      id, pokemon, picture, types, styles,
    } = this.props.data;

    this.setState({
      id,
      pokemon,
      picture,
      types,
      stats: pokemon.stats.reverse(),
      abilities: pokemon.abilities.reverse(),
      loading: false,
      styles,
    });
  }

  render() {
    const { toggleModal } = this.props;

    const {
      id, pokemon, picture, types, stats, abilities, styles,
    } = this.state;

    console.log(stats);

    return (
      <div className="pkmn-modal-container" onClick={toggleModal}>
        <div className="pkmn-modal" style={styles}>
          <div className="header">
            <span className="id">{`#${`00${id}`.slice(-3)}`}</span>
            <p className="name">{pokemon.name}</p>
            <span onClick={toggleModal}>X</span>
          </div>
          <div className="prelude">
            <div>
              <div className="pic" id={`pkmn-pic-${id}`}>
                <img
                  src={picture}
                  alt={`${pokemon.name}`}
                  crossOrigin=""
                  onLoad={this.handleOnLoad}
                />
              </div>
              <div className="types">
                {types.map((slot, index) => (
                  <span key={index} style={slot.styles}>
                    {slot.type}
                  </span>
                ))}
              </div>
            </div>
            <div className="info">
              <div className="stats">
                <table>
                  <thead>
                    <th colSpan="2">Base Stats</th>
                  </thead>
                  <tbody>
                    {stats.map(elem => (
                      <tr>
                        <td>{elem.stat.name}</td>
                        <td>{elem.base_stat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="profile">
                <table>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 700 }}>Abilities</td>
                      {abilities.map(elem => (
                        <td>
                          <span>{elem.ability.name}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700 }}>Height</td>
                      <td>
                        <span>{pokemon.height / 10}m</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700 }}>Weight</td>
                      <td>
                        <span>{pokemon.weight / 10}kg</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
