import React, { useState, useEffect } from "react";
import "../Admin.css";

const API_URL = "http://localhost:5000/api/admin/news";

function AdminNews() {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "", image_url: "", id: null });
  const token = localStorage.getItem("adminToken");

  const fetchNews = async () => {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id ? `${API_URL}/${formData.id}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ title: "", content: "", image_url: "", id: null });
      fetchNews();
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить новость?")) return;
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNews();
  };

  return (
    <div className="admin-news">
      <h3>Новости</h3>
      <form onSubmit={handleSubmit} className="newsform">
        <input
          name="title"
          placeholder="Заголовок"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Текст"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <input
          name="image_url"
          placeholder="Ссылка на изображение"
          value={formData.image_url}
          onChange={handleChange}
        />
        <button type="submit">{formData.id ? "Обновить/Сохранить" : "Добавить"}</button>
      </form>

      <ul className="news-list">
        {news.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> — {item.content.slice(0, 60)}...
            {item.image_url && (
              <div>
                <img src={item.image_url} alt="preview" width={100} />
              </div>
            )}
            <div className="news-actions">
              <button onClick={() => handleEdit(item)}>Редактировать</button>
              <button
                onClick={() => {
                  if (window.confirm("Вы уверены, что хотите удалить этот пост?")) {
                    handleDelete(item.id);
                  }
                }}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminNews;
