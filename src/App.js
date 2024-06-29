import React, { useState, useEffect, useCallback } from "react";
import ImageGallery from "./components/ImageGallery";
import CatLoader from "./components/CatLoader/CatLoader";
import CatWalking from "./components/CatWalking/CatWalking";
import ImageModal from "./components/ImageModal/ImageModal";

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
      <Footer />
      <ImageModal
        show={!!selectedImage}
        image={selectedImage}
        onClose={handleCloseModal}
      />
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
  return <footer>bakhtyar bhai ne bnai hai</footer>;
}
