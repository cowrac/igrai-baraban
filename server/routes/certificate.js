const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
const Jimp = require('jimp');
const { PDFDocument, rgb } = require('pdf-lib');

router.post('/create', async (req, res) => {
  const { name, phone, email } = req.body;
  const qrId = uuidv4();

  try {
    // Генерация QR
    const qrData = `cert-${qrId}`;
    const qrBuffer = await QRCode.toBuffer(qrData, { width: 200 });

    // Загрузка шаблона
    const templatePath = path.join(__dirname, '../img/template.jpg');
    const template = await Jimp.read(templatePath);

    // Загрузка QR в Jimp
    const qrImage = await Jimp.read(qrBuffer);
    qrImage.resize(450, 450); // ⚙️ Настрой размер
    template.composite(qrImage, 847, 744); // Положение QR на шаблоне

    // Сохраняем как PNG во временный файл
    const tempPngPath = path.join(__dirname, `../certificates/${qrId}.png`);
    await template.writeAsync(tempPngPath);

    // Генерация PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const pngImageBytes = fs.readFileSync(tempPngPath);
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    const { width, height } = pngImage.scale(1);

    page.setSize(width, height);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width,
      height,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(__dirname, `../certificates/${qrId}.pdf`);
    fs.writeFileSync(pdfPath, pdfBytes);

    // Удаляем временный PNG
    fs.unlinkSync(tempPngPath);

    // Запись в базу
    await pool.query(
      'INSERT INTO certificates (name, phone, qr_code_id, email) VALUES ($1, $2, $3, $4)',
      [name, phone, qrId, email]
    );

    res.status(201).json({
      message: 'Сертификат создан',
      id: qrId,
      url: `http://localhost:5000/certificates/${qrId}.pdf`,
    });
  } catch (err) {
    console.error('Ошибка при создании сертификата:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


module.exports = router;
