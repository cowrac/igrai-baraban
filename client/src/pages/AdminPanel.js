import React, { useState, useEffect } from "react";
import "../Admin.css";

function AdminPanel() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newCert, setNewCert] = useState({ name: "", email: "", phone: "", qr_code_id: "" });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const response = await fetch("http://localhost:5000/api/admin/certificates", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      setCertificates(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/admin/certificates/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      setCertificates(certificates.filter(cert => cert.id !== id));
    }
  };

  const handleAdd = async () => {
    const response = await fetch("http://localhost:5000/api/admin/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newCert)
    });

    if (response.ok) {
      const created = await response.json();
      setCertificates([created, ...certificates]);
      setNewCert({ name: "", email: "", phone: "", qr_code_id: "" });
    }
  };

  const handleEdit = async (id) => {
    const cert = certificates.find(c => c.id === id);
    const response = await fetch(`http://localhost:5000/api/admin/certificates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cert)
    });

    if (response.ok) {
      const updated = await response.json();
      setCertificates(certificates.map(c => (c.id === id ? updated : c)));
      setEditingId(null);
    }
  };

  const updateCertField = (id, field, value) => {
    setCertificates(certificates.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-panel">
      <h2>Панель администратора</h2>
      <button onClick={handleLogout}>Выйти</button>

      <h3>Добавить сертификат вручную</h3>
      <div className="form-inline">
        <input
          placeholder="Имя"
          value={newCert.name}
          onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newCert.email}
          onChange={(e) => setNewCert({ ...newCert, email: e.target.value })}
        />
        <input
          placeholder="Телефон"
          value={newCert.phone}
          onChange={(e) => setNewCert({ ...newCert, phone: e.target.value })}
        />
        <input
          placeholder="Номер сертификата"
          value={newCert.qr_code_id}
          onChange={(e) => setNewCert({ ...newCert, qr_code_id: e.target.value })}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <h3>Сертификаты</h3>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Номер сертификата</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td>
                  {editingId === cert.id ? (
                    <input
                      value={cert.name}
                      onChange={(e) => updateCertField(cert.id, "name", e.target.value)}
                    />
                  ) : (
                    cert.name
                  )}
                </td>
                <td>
                  {editingId === cert.id ? (
                    <input
                      value={cert.email}
                      onChange={(e) => updateCertField(cert.id, "email", e.target.value)}
                    />
                  ) : (
                    cert.email
                  )}
                </td>
                <td>
                  {editingId === cert.id ? (
                    <input
                      value={cert.phone}
                      onChange={(e) => updateCertField(cert.id, "phone", e.target.value)}
                    />
                  ) : (
                    cert.phone
                  )}
                </td>
                <td>
                  {editingId === cert.id ? (
                    <input
                      value={cert.qr_code_id}
                      onChange={(e) => updateCertField(cert.id, "qr_code_id", e.target.value)}
                    />
                  ) : (
                    cert.qr_code_id
                  )}
                </td>
                <td>{new Date(cert.created_at).toLocaleString()}</td>
                <td>
                  {editingId === cert.id ? (
                    <button onClick={() => handleEdit(cert.id)}>Сохранить</button>
                  ) : (
                    <button onClick={() => setEditingId(cert.id)}>Редактировать</button>
                  )}
                  <button onClick={() => handleDelete(cert.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
