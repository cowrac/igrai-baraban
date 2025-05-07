const express = require("express");
const router = express.Router();
const pool = require("../db"); // Подключение к PostgreSQL

// Получить все новости
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера при получении новостей" });
  }
});

module.exports = router;
