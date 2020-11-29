import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import utils from "../utils";
const Gallery = ({ selectedImageId, handleImageClick, data }) => {
  let images;
  let noImages;

  if (data.length > 0) {
    images = data.map(image => {
      const url = utils.getFlickrImgURL(image);
      return (
        <Image 
          selected={image.id === selectedImageId}
          onClick={() => handleImageClick(image.id)}
          url={url}
          key={image.id}
          alt={image.title}
        />
      );
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    <div>
      <ul>{images}</ul>
      {noImages}
    </div>
  );
};

export default Gallery;
