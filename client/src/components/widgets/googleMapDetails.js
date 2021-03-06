import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.geocoding}
  >
  <Marker
        {...props.markers}
  />
  </GoogleMap>
));


export default class GoogleMapDetails extends Component {

    constructor(props){
        super(props);

        this.state = {
            geocoding : this.props.geocoding,
            marker: {
              position: this.props.geocoding,
              defaultAnimation: 2,
            }
        };
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.geocoding !== this.state.geocoding)
        {
              this.setState({
                geocoding : nextProps.geocoding
              });
        }
      
    }

    

  render() {
    return (
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ height: `300px` }} />
        }
        mapElement={
          <div style={{ height: `300px` }} />
        }
        geocoding = {this.state.geocoding}
        markers={this.state.marker}
      />
    );
  }
}