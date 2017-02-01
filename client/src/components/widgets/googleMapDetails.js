/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.geocoding}
  >
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class GoogleMapDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
            geocoding : this.props.geocoding
        };
        console.log('state:', this.state);
    }

    
  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: `300px;` }} />
        }
        mapElement={
          <div style={{ height: `300px` }} />
        }
        geocoding = {this.state.geocoding}
        markers={{
                position: this.state.geocoding,
                key: `Taiwan`,
                defaultAnimation: 2}}
      />
    );
  }
}