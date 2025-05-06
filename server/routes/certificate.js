const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/create', async (req, res) => {
  const { name, phone } = req.body;
  const qrId = uuidv4();

  try {
    // 1. Генерация QR
    const qrData = `cert-${qrId}`;
    const qrImageBuffer = await QRCode.toBuffer(qrData, { width: 200 });

    // 2. Загрузка шаблона
    const templatePath = path.join(__dirname, '../img/template.jpg');
    const template = await Jimp.read(templatePath);

    // 3. Загрузка QR в Jimp
    const qrImage = await Jimp.read(qrImageBuffer);

    // 4. Изменение размера и вставка
    qrImage.resize(450, 450); // ⚙️ Настрой размер
    template.composite(qrImage, 847, 744); // ⚙️ Координаты QR на шаблоне

    // 5. Сохранение изображения
    const outPath = path.join(__dirname, `../qr_images/${qrId}.jpg`);
    await template.writeAsync(outPath);

    // 6. Запись в базу
    await pool.query(
      'INSERT INTO certificates (name, phone, qr_code_id) VALUES ($1, $2, $3)',
      [name, phone, qrId]
    );

    res.status(201).json({ message: 'Сертификат создан', id: qrId });
  } catch (err) {
    console.error('Ошибка при создании сертификата:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
