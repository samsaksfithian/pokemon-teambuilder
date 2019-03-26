import React, { Component } from 'react';
import axios from 'axios';
import FastAverageColor from 'fast-average-color/dist/index.es6';
import pokeball from '../images/recruit-indicator.png';
import '../css/variables.css';
import '../css/PokemonItem.css';

const PKMN_IMG_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/';

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

  async componentDidMount() {
    await axios.get(this.props.pokemon.url).then(res => {
      this.setState({
        id: this.props.id,
        pokemon: res.data,
        picture: `${PKMN_IMG_URL}${this.props.id}${'.png'}`,
        types: res.data.types.reduceRight(
          (acc, elem) => acc.concat({
            type: elem.type.name,
            styles: {
              backgroundColor: `var(--${elem.type.name}-type)`,
            },
          }),
          [],
        ),
      });
    });
  }

  render() {
    const { toggleModal } = this.props;
    const {
      id, pokemon, picture, types, recruit, styles,
    } = this.state;

    return (
      <div className="pkmn-card" style={styles} onClick={this.handleOnClick}>
        <div className="pkmn-card-header">
          <span className="pkmn-id">{`#${`00${id}`.slice(-3)}`}</span>
          <p className="pkmn-name">{pokemon.name}</p>
        </div>
        <div className="pkmn-card-front">
          <div className="pkmn-pic" id={`pkmn-pic-${id}`}>
            <img src={picture} alt={`${pokemon.name}`} crossOrigin="" onLoad={this.handleOnLoad} />
          </div>
          <div className="pkmn-types">
            <div>
              <p />
            </div>
            {types.map((slot, index) => (
              <span key={index} style={slot.styles}>
                {slot.type}
              </span>
            ))}
          </div>
        </div>
        <div className="pkmn-card-back">
          <div className="pkmn-physical">
            <span>
              <div>
                <p>Height</p>
              </div>
              <div>{pokemon.height / 10}m</div>
            </span>
            <span>
              <div>
                <p>Weight</p>
              </div>
              <div>{pokemon.weight / 10}kg</div>
            </span>
          </div>
          <div className="pkmn-stats">
            <p>Stats</p>
          </div>
        </div>
        <div className="pkmn-card-footer">
          <div className="pkmn-recruit">
            <img src={pokeball} alt="pokeball" />
          </div>
        </div>
      </div>
    );
  }

  handleOnLoad = event => {
    const fac = new FastAverageColor();
    const colorInfo = fac.getColor(document.querySelector(`#pkmn-pic-${this.state.id} img`));
    const styles = {
      backgroundColor: colorInfo.rgb,
    };

    this.setState({ styles });
  };

  handleOnClick = event => {
    this.props.toggleModal(this.state);
  };

  handleRecruit = event => {
    this.setState({
      recruit: !this.state.recruit,
    });
  };
}
