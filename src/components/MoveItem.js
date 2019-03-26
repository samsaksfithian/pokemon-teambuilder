import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MoveItem extends Component {
  static propTypes = {
    moveInfo: PropTypes.shape({
      move: PropTypes.object,
      version_group_details: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { moveInfo } = this.props;
    return <div className="move-item">{moveInfo.move.name}</div>;
  }
}
