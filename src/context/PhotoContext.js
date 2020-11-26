import React, { createContext, useState } from "react";
import api from '../api/api';
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  
  const runSearch = (query) => {
    setLoading(true);
    let imgs = [];
    api
      .searchGeoLocatedImages(query)
      .then((imgs) => {
        setImages({ ...images, [query]: imgs });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Encountered an error with fetching and parsing data", error);
      });
  };

  return (
    <PhotoContext.Provider value={{ images, loading, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
