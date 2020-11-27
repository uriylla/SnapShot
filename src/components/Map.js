import React from 'react';
import { mapboxAccessToken } from '../api/config';

class Map extends React.Component {

  componentDidMount() {
    var mymap = window.L.map('mapid').setView([51.505, -0.09], 13);
    window.L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxAccessToken
    }).addTo(mymap);
  }

  render() {
    return(
      <div id="mapid" className="map"></div>
    )
  }
}

export default Map;