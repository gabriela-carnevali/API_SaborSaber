const express = require("expres");
const router = express.Router();

const produtoRoutes = require("./ProdutoRoutes");

// Rota para a página inicial da API
router.get("/", (req, res) => {
  res.json({
    mensagem: "API SaborDigital",
    versao: "1.0.0",
    arquitetura: "MVC + SOLID",
  });
});

route.use("/produtos", produtoRoutes);
