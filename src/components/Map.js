import React, { useState, useEffect } from 'react';
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

const Map = ({ images }) => {
  
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('mapid').setView([51.505, -0.09], 13);
    const markerGroup = L.layerGroup().addTo(mapInstance);
    setMarkers(markerGroup);
    setMap(mapInstance);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapboxAccessToken
    }).addTo(mapInstance);
  }, []);

  useEffect(() => {
    if (map) {
      markers.clearLayers();
      images.map(img => L
        .marker([parseFloat(img.location.latitude), parseFloat(img.location.longitude)])
        .addTo(markers)
      );
    }
  }, [images, map, markers]);

  return (
    <div id="mapid" className="map"/>
  );
}

export default Map;