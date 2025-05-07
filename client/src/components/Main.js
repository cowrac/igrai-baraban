import React from "react";

const Main = ({ onBuyClick }) => (
  <section className="main" id="main">
    <div className="overlay">
      <h1>ШКОЛА ИГРЫ <br></br>НА БАРАБАНАХ</h1>
      <button className="buybutton" onClick={onBuyClick}>КУПИТЬ СЕРТИФИКАТ</button>
    </div>
  </section>
);

export default Main;
