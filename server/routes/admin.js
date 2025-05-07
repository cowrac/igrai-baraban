const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");

const JWT_SECRET = "your_super_secret"; // Лучше — в .env

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }

    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: "2h" });

    res.json({ token });
  } catch (err) {
    console.error("Ошибка авторизации", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// GET /api/admin/certificates
router.get("/certificates", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM certificates ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (err) {
      console.error("Ошибка при получении сертификатов", err);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  
  // DELETE /api/admin/certificates/:id
  router.delete("/certificates/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await pool.query("DELETE FROM certificates WHERE id = $1", [id]);
      res.status(200).json({ message: "Сертификат удалён" });
    } catch (err) {
      console.error("Ошибка при удалении сертификата", err);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });

  // POST /api/admin/certificates — Добавить сертификат вручную
router.post("/certificates", async (req, res) => {
    const { name, email, phone, qr_code_id } = req.body;
  
    try {
      const result = await pool.query(
        "INSERT INTO certificates (name, email, phone, qr_code_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, phone, qr_code_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Ошибка при добавлении сертификата:", err);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  
  // PUT /api/admin/certificates/:id — Обновить сертификат
  router.put("/certificates/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, qr_code_id } = req.body;
  
    try {
      const result = await pool.query(
        "UPDATE certificates SET name=$1, email=$2, phone=$3, qr_code_id=$4 WHERE id=$5 RETURNING *",
        [name, email, phone, qr_code_id, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Ошибка при обновлении сертификата:", err);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  
  // -------- Новости --------

// Получить все новости
router.get("/news", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при загрузке новостей" });
  }
});

// Добавить новость
router.post("/news", async (req, res) => {
  const { title, content, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO news (title, content, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, content, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при добавлении новости" });
  }
});

// Обновить новость
router.put("/news/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  try {
    const result = await pool.query(
      "UPDATE news SET title = $1, content = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [title, content, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при обновлении новости" });
  }
});

// Удалить новость
router.delete("/news/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM news WHERE id = $1", [id]);
    res.json({ message: "Новость удалена" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при удалении новости" });
  }
});

module.exports = router;
