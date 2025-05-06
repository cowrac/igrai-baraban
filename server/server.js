const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const certificateRoutes = require("./routes/certificate");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/certificates", certificateRoutes);
app.use("/api/admin", adminRoutes);

app.use("/certificates", express.static(path.join(__dirname, "certificates")));

const certFolder = path.join(__dirname, "certificates");
if (!fs.existsSync(certFolder)) fs.mkdirSync(certFolder);

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
