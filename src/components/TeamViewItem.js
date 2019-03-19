import React, {Component} from 'react';

import PropTypes from 'prop-types';

export default class TeamViewItem extends Component{
    static propTypes = {
        image: PropTypes.img,
        name: PropTypes.string,
        type: PropTypes.string,
    }.require

    render(){
        // destructure object}
        const {pokemon, onDeleteMe} = this.props
        return(
            <div className="team-view-item">
                /* IMAGE, NAME, TYPE */
                <p>
                    <img alt="Pokemon Sprite" className="sprite" src={pokemon.sprites.front_default}>
                    Pokemon Image Here</img> {pokemon.image}
                </p>
                <p>
                    <span className="">Name: </span> {pokemon.name}
                </p>
                <p>
                    <span className="">Type: </span> {pokemon.type}
                </p>
                // button for the delete
                <button type="button" className="delete-button" onclick={onDeleteMe}>
                    X
                </button>
            </div>
        );
    }
}