import React, { Component } from 'react';
import ListItem from './ListItem';

export default class VenueList extends Component {
  render() {
    return (<ul className="list-group">
      {this.props.venues && this.props.venues.map((venue, index) =>
             (<ListItem key={index} {...venue} listItemClick={this.props.listItemClick} />)
       )}
    </ul>);
  }
}
