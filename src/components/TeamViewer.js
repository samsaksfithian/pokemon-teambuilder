import React, {Component} from 'react';
import TeamViewItem from './TeamViewItem';

export default class TeamViewer extends Component{

    render(){
        // destructure object
        const {team, onRemoveFromTeam} = this.props;
        console.log(team);
        return(
            <div>
                {team.map(pokemon => (
                    <div>
                        <TeamViewItem key={pokemon.id} pokemon={pokemon.name}
                        onDeleteMe={() => onRemoveFromTeam(pokemon.id)} />
                    </div>
                ))}
            </div>
        );
    }
}
