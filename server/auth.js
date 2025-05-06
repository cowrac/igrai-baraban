const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_super_secret"; // Из .env, если хочешь

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Неавторизован" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.adminId = payload.adminId;
    next();
  } catch {
    return res.status(401).json({ error: "Недействительный токен" });
  }
}

module.exports = checkAuth;
