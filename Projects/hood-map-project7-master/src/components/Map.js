import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={10}
    zoom={props.zoom}
    defaultCenter={{ lat: 33.7490, lng: -84.3880 }}
    center={props.center}
  >
    {props.markers && props.markers
      .filter(marker => marker.isVisible)
      .map((marker, index) => {
        const venueInfo = props.venues.find(venue => venue.id === marker.id);
        return(
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.markerClick(marker)}>
          {marker.isOpen && venueInfo.bestPhoto && (
            <InfoWindow>
              <React.Fragment>
                <img src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`} alt= {`Venue ${venueInfo.name}`}/>
                <p>{venueInfo.name}</p>
              </React.Fragment>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
))
);

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
      {...this.props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC8Hop-AJho69QG-IOUFPjdyP8AFHoTsFk"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
  }
}
