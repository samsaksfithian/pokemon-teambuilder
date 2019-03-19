import React, {Component} from 'react';

export default class TeamViewer extends Component{

    render(){
        // destructure object
        const {team, onRemoveFromTeam} = this.props;
        return(
            <div className="team-viewer">
                {team.map(pokemon => (
                    <div>
                        <TeamViewItem key={pokemon.id} pokemon={pokemon}
                        onDeleteMe={() => onRemoveFromTeam(pokemon.id)} />
                    </div>
                ))}
            </div>
        );
    }
}