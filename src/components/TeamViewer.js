import React, {Component} from 'react';
import TeamViewItem from './TeamViewItem';
import '../css/TeamViewer.css';

export default class TeamViewer extends Component{

    render(){
        // destructure object
        console.log(this.props.team);
        // const {team, onRemoveFromTeam} = this.props;
        //console.log(team);
        return(
            // <div className="team-viewer">
            //     {team.map(pokemon => (
            //         <div>
            //             <TeamViewItem key={pokemon.id} pokemon={pokemon.name}
            //             onDeleteMe={() => onRemoveFromTeam(pokemon.id)} />
            //         </div>
            //     ))}
            // </div>
            <div className="team-viewer">
                <TeamViewItem
                    id='1'
                    pokemon='bulbasaur'
                />
                <TeamViewItem
                    id='2'
                    pokemon='ivysaur'
                />
                <TeamViewItem
                    id='3'
                    pokemon='venusaur'
                />
                <TeamViewItem
                    id='4'
                    pokemon='charmander'
                />
                <TeamViewItem
                    id='5'
                    pokemon='charmeleon'
                />
                <TeamViewItem
                    id='6'
                    pokemon='charizard'
                />

            </div>
        );
    }
}
