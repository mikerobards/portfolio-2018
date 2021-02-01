import React, { Component } from 'react';

export default class ListItem extends Component {
  render() {
    return (<li className="list-group-item" tabIndex="0"
    onClick={() => this.props.listItemClick(this.props)}
    aria-labelledby="venue"
    >
      {this.props.name}
    </li>);
  }
}
