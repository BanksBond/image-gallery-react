// src/components/ImageGallery.js
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import "./ImageGallery.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageGallery = ({ images, onImageClick }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          index={index}
          onImageClick={onImageClick}
        />
      ))}
    </Masonry>
  );
};

export default ImageGallery;

function ImageCard({ image, index, onImageClick }) {
  const [like, setLike] = useState(false);

  return (
    <div
      onClick={() => onImageClick(image.url)}
      className="image-card"
      key={index}
    >
      {console.log(image.breeds[0].name)}
      <LazyLoadImage
        alt={image.alt}
        src={image.url}
        effect="blur"
        wrapperProps={{
          style: { transitionDelay: "0.5s" },
        }}
      />
      <figcaption>
        <span className="info ubuntu-regular">
          <h3>{image.breeds[0].name}</h3>
          <span>{image.breeds[0].origin}</span>
        </span>
        <span
          onClick={() => setLike(!like)}
          className={`links ${like ? "linkLiked" : ""}`}
        >
          <i className="fa-solid fa-heart"></i>
        </span>
      </figcaption>
    </div>
  );
}
