const express = require('express');
const cors = require('cors');
const certificateRoutes = require('./routes/certificate');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/certificates', certificateRoutes);

// Отдача QR-картинок
app.use('/qr', express.static(path.join(__dirname, 'qr_images')));

// Проверка папки
const qrFolder = path.join(__dirname, 'qr_images');
if (!fs.existsSync(qrFolder)) {
  fs.mkdirSync(qrFolder);
}

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
