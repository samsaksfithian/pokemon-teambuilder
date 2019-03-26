import React, {Component} from 'react';
import '../css/TeamViewItem.css';

import PropTypes from 'prop-types';

export default class TeamViewItem extends Component{
    static propTypes = {
        image: PropTypes.img,
        name: PropTypes.string,
        type: PropTypes.string,
    }.require

    render(){
        console.log('inside team view item');
        // destructure object}
        // const {pokemon, onDeleteMe} = this.props
        return(
            // <div className="team-view-item">
            //     {/* IMAGE, NAME, TYPE */}
            //     <p>
            //         <img alt="Pokemon Sprite" className="sprite" src={pokemon.sprites.front_default}>
            //         Pokemon Image Here</img> {pokemon.image}
            //     </p>
            //     <p>
            //         <span className="">Name: </span> {pokemon.name}
            //     </p>
            //     <p>
            //         <span className="">Type: </span> {pokemon.type}
            //     </p>
            //     {/* DELETE BUTTON */}
            //     <button type="button" className="delete-button" onclick={onDeleteMe}>
            //         X
            //     </button>
            // </div>
            <div className="team-view-item">
                <h4>ID: {this.props.id}</h4> 
                <br/>
                <h4>Name: {this.props.pokemon}</h4>
                <button type="button" className="delete-button" onClick={this.props.onDeleteMe}>
                X
                </button>
            </div>
        );
    }
}