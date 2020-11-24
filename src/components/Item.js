import React, { useEffect } from "react";
import Container from "./Container";

const Item = ({ searchTerm, clearInput }) => {

  useEffect(() => {
    clearInput && clearInput();
  }, [clearInput]);

  return (
    <div>
      <h2>{searchTerm} Pictures</h2>
      <Container searchTerm={searchTerm} />
    </div>
  );
};

export default Item;
