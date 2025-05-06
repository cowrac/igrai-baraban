import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Admin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/panel');
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      setError('Сервер не отвечает');
    }
  };

  return (
    <div className="admin-login">
      <h2>Вход для администратора</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
