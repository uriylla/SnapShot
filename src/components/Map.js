import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapboxAccessToken } from '../api/config';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class Map extends React.Component {

  componentDidMount() {
    this.mymap = L.map('mapid').setView([51.505, -0.09], 13);
    window.L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxAccessToken
    }).addTo(this.mymap);
  }

  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images) {
      this.props.images.map(img => {
        console.log(img.location)
        L.marker([parseFloat(img.location.latitude), parseFloat(img.location.longitude)]).addTo(this.mymap)
      });
    }
  }

  render() {
    return(
      <div id="mapid" className="map"></div>
    )
  }
}

export default Map;