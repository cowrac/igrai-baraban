import React from "react";

const News = () => (
  <section id="news" className="section news">
    <h2>Новости</h2>
    <div className="news-item">
      <div className="news-img">
        <img src="/news1.jpg" alt="Новость 1" />
      </div>
      <div className="news-text">
        <h3>Открытие нового филиала</h3>
        <p>С радостью сообщаем, что мы открыли новый филиал школы в центре города. Записывайтесь уже сейчас!</p>
      </div>
    </div>
    <div className="news-item">
      <div className="news-img">
        <img src="/news2.jpg" alt="Новость 2" />
      </div>
      <div className="news-text">
        <h3>Летний мастер-класс</h3>
        <p>В июле пройдёт бесплатный мастер-класс от наших преподавателей. Места ограничены!</p>
      </div>
    </div>
  </section>
);

export default News;
