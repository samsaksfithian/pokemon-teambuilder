import React, {Component} from 'react';

export default class TeamViewer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        // destructure object
        const {team, onRemoveFromTeam} = this.props;
        return(
            <div className="team-viewer">
                {team.map(pokemon => (
                    <div>
                        <TeamViewItem key={pokemon.index} pokemon={pokemon}
                        onDeleteMe={() => onRemoveFromTeam(pokemon.index)} />
                    </div>
                ))}
            </div>
        );
    }
}