import React, { useEffect, useState } from "react";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then(res => res.json())
      .then(data => {
        setNewsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки новостей:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section id="news" className="section news"><p>Загрузка новостей...</p></section>;
  }

  return (
    <section id="news" className="section news">
      <h2>НОВОСТИ</h2>
      {newsList.length === 0 ? (
        <p>Новостей пока нет.</p>
      ) : (
        newsList.map(news => (
          <div className="news-item" key={news.id}>
            <div className="news-img">
              <img src={news.image_url || "/placeholder.jpg"} alt={news.title} />
            </div>
            <div className="news-text">
              <h3>{news.title}</h3>
              <p className="news-content">{news.content}</p>
              <small>{new Date(news.created_at).toLocaleDateString()}</small>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default News;
