const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const path = require("path");

// Middlewares globais
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Libera o acesso público à pasta de uploads
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "public", "uploads")),
);

// ✅ Registro de todas as rotas da API centralizadas com prefixo /api
app.use("/api", routes);

// ✅ Servir arquivos estáticos do front-end (HTML, CSS, JS, imagens)
const frontendPath = path.join(__dirname, "..", "..", "Aula_9-FETCH_API", "front-end");
const fs = require("fs");
console.log("📁 Servindo front-end de:", frontendPath);
console.log("✅ Caminho existe?", fs.existsSync(frontendPath));
console.log("✅ index.html existe?", fs.existsSync(path.join(frontendPath, "index.html")));

// Log middleware
app.use((req, res, next) => {
  console.log(`📍 [${req.method}] ${req.path}`);
  next();
});

app.use(express.static(frontendPath, { 
  index: "index.html"
}));

module.exports = app;
