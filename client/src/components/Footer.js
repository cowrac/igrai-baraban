import React from "react";

const Footer = () => (
  <footer className="footer">
    <p>Copyright @ {new Date().getFullYear()} igrai-baraban.ru</p>
    <div className="social-links">
      <a href="https://vk.com/igrai_baraban" target="_blank" rel="noopener noreferrer">VK</a>
      <a href="https://t.me/austerlife" target="_blank" rel="noopener noreferrer">Telegram</a>
    </div>
  </footer>
);

export default Footer;
