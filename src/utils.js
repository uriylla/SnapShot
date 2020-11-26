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

export default {
  addLocationToImages,
};
