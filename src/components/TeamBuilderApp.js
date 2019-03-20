import React from 'react';
import axios from 'axios';
import TeamViewer from './TeamViewer';

// make a calll to axios
async function pullAPI(){
  let pokeArray = [];
  for(let i = 1; i < 6; ++i){
    pokeArray[i] = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    pokeArray[i] = pokeArray[i].data;
  }
  return pokeArray;
}

export default class TeamBuilderApp extends React.Component {

  render() {
    const pokes = pullAPI();
    //console.log(team);
    return <div><TeamViewer team={pokes} onRemoveFromTeam="" /></div>;
  }
}
