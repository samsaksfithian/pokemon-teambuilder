import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MoveItem from './MoveItem';

export default class MoveList extends Component {
  static propTypes = {
    moveList: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    moveList: [],
  };

  getLevelUpMoves = () => {
    const { moveList } = this.props;
    if (!moveList) {
      return [];
    }
    const levelUpMoves = moveList.filter(moveInfo => {
      const usumInfo = moveInfo.version_group_details.find(
        info => info.version_group.name === 'ultra-sun-ultra-moon',
      );
      const learnMethod = usumInfo
        ? usumInfo.move_learn_method.name
        : 'not learnable in usum';
      return learnMethod === 'level-up';
    });
    return levelUpMoves;
  };

  render() {
    return (
      <div className="move-list">
        <ul className="move-section" id="levelup">
          <h3>Level Up Moves</h3>
          {this.getLevelUpMoves().map(moveInfo => (
            <li key={moveInfo.move.name}>
              {/* {moveInfo.move.name} */}
              <MoveItem moveInfo={moveInfo} />
            </li>
          ))}
        </ul>
        {/* <div className="move-section" id="egg">
          Egg Moves
        </div>
        <div className="move-section" id="tm">
          TM Moves
        </div>
        <div className="move-section" id="tutor">
          Tutor Moves
        </div> */}
      </div>
    );
  }
}
