import axios from "axios";
import { apiKey } from "../api/config";
import utils from '../utils';

const searchImages = query => axios
  .get(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&has_geo=1&per_page=24&format=json&nojsoncallback=1`
  )

const getLocationByImageId = id => axios
  .get(
    `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${id}&format=json&nojsoncallback=1`
  )

const searchGeoLocatedImages = async query => {
  const { data: { photos: { photo } } } = await searchImages(query);
  const locations = await Promise.all(photo.map(({ id }) => getLocationByImageId(id)));
  return utils.addLocationToImages(photo, locations);
};

export default {
  searchGeoLocatedImages
}