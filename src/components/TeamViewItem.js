import React from 'react';
import PropTypes from 'prop-types';

export default class TeamViewItem extends React.Component{
    static propTypes = {
        image: PropTypes.img,
        name: PropTypes.string,
        type: PropTypes.string,
    }.require
    constructor(props){
        super(props);

        // state helpful for default cards with no Pokemon
        this.state= {
            image: {},
            name: '???',
            type: '???',
        }
    }

    render(){
        // destructure object}
        const {pokemon, onDeleteMe} = this.props
        return(
            <div className="team-view-item">
                // IMAGE , NAME, TYPE
                <p>
                    <img className="">Pokemon Image Here</img> {pokemon.image}
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