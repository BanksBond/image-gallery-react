import React, { useState, useEffect, useCallback } from "react";
import ImageGallery from "./components/ImageGallery";
import CatLoader from "./components/CatLoader/CatLoader";
import CatWalking from "./components/CatWalking/CatWalking";
import ImageModal from "./components/ImageModal/ImageModal";

import footerCat from "./images/footerCat.png";
import catpaw from "./images/catpapaw.png";

export default function App() {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   async function fetchCats() {
  //     setIsLoading(true);
  //     try {
  //       const res = await fetch(
  //         `https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=20&api_key=live_7vtOjldmtzvXUi6sAAd7BSuLbF67phGMTUA5eIpyEp6M1V5Swc8mrPwlKYAU4RsW`
  //       );

  //       const data = await res.json();

  //       if (page === 0) {
  //         setCats(data); // Replace the existing images if page is 0
  //       } else {
  //         setCats((prevCats) => [...prevCats, ...data]); // Append new images if page > 0
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cats:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchCats();
  // }, [page]); // Empty dependency array ensures it runs only once

  // Function to fetch cat images
  const fetchCats = useCallback(async (pageNum) => {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?size=small&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${pageNum}&limit=20&api_key=live_7vtOjldmtzvXUi6sAAd7BSuLbF67phGMTUA5eIpyEp6M1V5Swc8mrPwlKYAU4RsW`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching cats:", error);
      return [];
    }
  }, []);

  // Initial fetch of cat images
  useEffect(() => {
    async function initialFetch() {
      setIsLoading(true);
      const initialCats = await fetchCats(0);
      setCats(initialCats);
      setIsLoading(false);
    }
    initialFetch();
  }, [fetchCats]);

  // Load more cats on button click
  const loadMoreCats = async () => {
    setIsLoadingMore(true);
    const newCats = await fetchCats(page + 1);
    setCats((prevCats) => [...prevCats, ...newCats]);
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(false);
  };

  function handleImageClick(imageurl) {
    setSelectedImage(imageurl);
  }

  function handleCloseModal() {
    setSelectedImage(null);
  }

  return (
    <>
      <CatWalking />
      <Header />
      {isLoading ? (
        <CatLoader />
      ) : (
        <>
          <ImageGallery images={cats} onImageClick={handleImageClick} />
          <ButtonPage loadMore={loadMoreCats} isLoadingMore={isLoadingMore} />
        </>
      )}
      {/* <img
        id="luna"
        src="https://static.tumblr.com/d28817b6396b3da7f3ef2820ec19cdd6/gvmp0tx/XRHn9rsgl/tumblr_static_8oed06bltkg8cc4sw0g40w88o.gif"
      /> */}
      <ImageModal
        show={!!selectedImage}
        image={selectedImage}
        onClose={handleCloseModal}
      />
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Kitty Gallery</h1>
    </header>
  );
}

function ButtonPage({ loadMore, isLoadingMore }) {
  return (
    <button onClick={loadMore} disabled={isLoadingMore}>
      {isLoadingMore ? "Loading..." : "Load More..."}
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer ubuntu-regular">
      <div className="image-container">
        <img className="animate-image" src={footerCat} alt="CatFooter"></img>
      </div>
      <p>©2024 Copyright Bakhtyar Ansari | All Rights Reserved</p>
      <img className="paw" src={catpaw} alt="catpaw"></img>
    </footer>
  );
}
