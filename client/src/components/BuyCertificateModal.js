import React, { useState } from "react";

const BuyCertificateModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [certUrl, setCertUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/certificates/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email }),
      });

      if (!response.ok) throw new Error("Ошибка при отправке");

      const data = await response.json();
      setCertUrl(data.url);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Купить сертификат</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Телефон:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="^\+?\d{10,15}$"
              placeholder="+79991234567"
              required
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Отправка..." : "Отправить"}
          </button>
          <button type="button" onClick={onClose}>Отмена</button>
        </form>

        {status === "success" && certUrl && (
          <div className="success-message">
            <p>Сертификат успешно создан!</p>
            <a href={certUrl} download>
              ⬇️ Скачать PDF
            </a>
          </div>
        )}

        {status === "error" && <p className="error">Произошла ошибка, попробуйте ещё раз.</p>}
      </div>
    </div>
  );
};

export default BuyCertificateModal;
