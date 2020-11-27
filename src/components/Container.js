import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import Map from "./Map";

const Container = ({ searchTerm }) => {
  const { images, loading, runSearch } = useContext(PhotoContext);
  useEffect(() => {
    images[searchTerm] || runSearch(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm]);
  console.log({images})
  return (
    <div className="photo-container">
      <Map images={images[searchTerm] || []}/>
      {(loading || !images[searchTerm]) ? <Loader /> : <Gallery data={images[searchTerm]} />}
    </div>
  );
};

export default Container;
