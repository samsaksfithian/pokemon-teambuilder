import React from 'react';

export default class TeamViewItem extends React.Component{
    constructor(props){
        super(props);
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