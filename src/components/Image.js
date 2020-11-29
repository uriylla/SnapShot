import React from "react";

const Image = ({ url, title, onClick, selected }) => (
  <li className={`gallery-image${selected ? `--selected` : ''}`}>
    <img onClick={onClick} src={url} alt={title} />
  </li>
);

export default Image;
