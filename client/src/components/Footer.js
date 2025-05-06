import React from "react";

const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Школа игры на барабанах</p>
    <div className="social-links">
      <a href="https://vk.com" target="_blank" rel="noopener noreferrer">VK</a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
  </footer>
);

export default Footer;
