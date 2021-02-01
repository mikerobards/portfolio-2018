import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import foursquareAPI from './API';
import Sidebar from './components/Sidebar';


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: object => {
        this.setState(object);
      }
    };
  }
  // marker functionality
  closeMarkers = () => {
      const markers = this.state.markers.map(marker => {
        marker.isOpen = false;
        return marker;
      });
      this.setState({ markers: Object.assign(this.state.markers, markers) })
  };

  markerClick = marker => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    foursquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues:Object.assign(this.state.venues, newVenue) })
    });
  };

  listItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.markerClick(marker);
  };

  // API fetch
  componentDidMount() {
    foursquareAPI.search({
      near: "Atlanta, GA",
      query: "pizza",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      window.gm_authFailure = () =>
      alert(
        "Google Maps has encountered an error. Please check the console for more information"
      );
      this.setState({ venues, center, markers });
    })
    .catch(error => {
      alert("An error has occured loading FourSquare" + error);
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar {...this.state}
             listItemClick={this.listItemClick}
             />
          </div>
          <div className="col-md-9">
            <Map {...this.state}
            markerClick={this.markerClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
