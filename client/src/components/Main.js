import React from "react";

const Main = ({ onBuyClick }) => (
  <section className="main" id="main">
    <div className="overlay">
      <h1>Школа игры на барабанах</h1>
      <button onClick={onBuyClick}>Купить сертификат</button>
    </div>
  </section>
);

export default Main;
