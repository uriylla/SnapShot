const findLocationByImageId = (locations, imgId) =>
  locations.find((loc) => loc.data.photo.id === imgId).data.photo.location;

const addLocationToImages = (imgs, locations) =>
  imgs.reduce(
    (acc, curr) => [
      ...acc,
      {
        ...curr,
        location: findLocationByImageId(locations, curr.id),
      },
    ],
    []
  );

const getFlickrImgURL = ({farm, server, id, secret}) => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
}

export default {
  addLocationToImages,
  getFlickrImgURL,
};
