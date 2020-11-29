import React, { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import Map from "./Map";

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext);

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageById = (id) => setSelectedImage(id);

  useEffect(() => {
    images[searchTerm] || runSearch(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm]);
  return (
    <div className="photo-container">
      <Map
        images={images[searchTerm] || []}
        handleMarkerClick={selectImageById}
        selectedImageId={selectedImage}/>
      {(loading || !images[searchTerm]) ?
      <Loader /> :
      <Gallery
        handleImageClick={selectImageById}
        data={images[searchTerm]}
        selectedImageId={selectedImage}
      />}
    </div>
  );
};

export default Container;
