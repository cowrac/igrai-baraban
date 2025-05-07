import React, { useState } from "react";
import "../Gallery.css";

const allPhotos = [
  "/gallery/gallery1.jpg",
  "/gallery/gallery2.jpg",
  "/gallery/gallery3.jpg",
  "/gallery/gallery4.jpg",
  "/gallery/gallery5.jpg",
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="gallery" className="section">
      <h2>ГАЛЕРЕЯ</h2>

      <div className="gallery-grid">
        {allPhotos.slice(0, 3).map((src, index) => (
          <img key={index} src={src} alt={`Галерея ${index + 1}`} />
        ))}
      </div>

      <button className="gallery-button" onClick={() => setIsModalOpen(true)}>БОЛЬШЕ ФОТО</button>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-gallery" onClick={(e) => e.stopPropagation()}>
            <h3>Все фотографии</h3>
            <div className="modal-gallery-grid">
              {allPhotos.map((src, index) => (
                <a key={index} href={src} target="_blank" rel="noopener noreferrer">
                  <img src={src} alt={`Фото ${index + 1}`} className="modal-thumbnail" />
                </a>
              ))}
            </div>
            <button className="gallery-button" onClick={() => setIsModalOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
