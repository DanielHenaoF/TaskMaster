// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const db = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar CORS
app.use(
  cors({
    origin: ["https://taskmaster-flax-nu.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

require("./models/User");
require("./models/Task");

// Importar asociaciones
require("./models/associations");

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/auth", authenticateToken, taskRoutes);
app.use("/api/auth", authenticateToken, profileRoutes);

// Sincronizar modelos y crear tablas
db.sync({ alter: true })
  .then(() => {
    console.log("¡Se crea la base de datos y su tablas!");
  })
  .catch((err) =>
    console.error("Error al crear base de datos y sus tablas: ", err)
  );

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`localhost: ${PORT}`);
});
