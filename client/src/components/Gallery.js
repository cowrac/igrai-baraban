import React, { useState } from "react";
import "../Gallery.css"; // подключим стили, если нужно

const allPhotos = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="gallery" className="section">
      <h2>Галерея</h2>

      <div className="gallery-grid">
        {allPhotos.slice(0, 3).map((src, index) => (
          <img key={index} src={src} alt={`Галерея ${index + 1}`} />
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)}>Больше фото</button>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-gallery" onClick={(e) => e.stopPropagation()}>
            <h3>Все фотографии</h3>
            <div className="modal-gallery-grid">
              {allPhotos.map((src, index) => (
                <img key={index} src={src} alt={`Фото ${index + 1}`} />
              ))}
            </div>
            <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
