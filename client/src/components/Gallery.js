import React, { useState } from "react";

const allPhotos = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
];

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);
  const visiblePhotos = showAll ? allPhotos : allPhotos.slice(0, 3);

  return (
    <section id="gallery" className="section">
      <h2>Галерея</h2>
      <div className="gallery-grid">
        {visiblePhotos.map((src, index) => (
          <img key={index} src={src} alt={`Галерея ${index + 1}`} />
        ))}
      </div>
      {!showAll && (
        <button onClick={() => setShowAll(true)}>Больше фото</button>
      )}
    </section>
  );
};

export default Gallery;
