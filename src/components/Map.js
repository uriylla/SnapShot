import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapboxAccessToken } from '../api/config';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor:   [13, 41],
    shadowAnchor: [12, 41]
});

const SelectedIcon = L.icon({
  iconUrl: '/marker-icon-selected.png',
  shadowUrl: iconShadow,
  iconAnchor:   [13, 41],
  shadowAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ images, handleMarkerClick, selectedImageId }) => {
  
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('mapid');
    const markerGroup = L
      .featureGroup()
      .addTo(mapInstance);
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
      images.map(({ location: { latitude, longitude }, ...rest}) => {
        const isSelected = selectedImageId === rest.id;
        let options = {};
        if (isSelected) {
          options = { icon: SelectedIcon, zIndexOffset: 1000 }
          map.panTo([parseFloat(latitude), parseFloat(longitude)]);
        }
        return L.marker([parseFloat(latitude), parseFloat(longitude)], options)
          .on('click', () => handleMarkerClick(rest.id))
          .addTo(markers)
      });
      if (!selectedImageId) {
        const bounds = markers.getBounds();
        bounds.isValid() && map.fitBounds(bounds);
      }
    }
  }, [images, map, markers, handleMarkerClick, selectedImageId]);


  return (
    <div className="map-container">
      <div id="mapid" className="map" />
    </div>
  );
}

export default Map;