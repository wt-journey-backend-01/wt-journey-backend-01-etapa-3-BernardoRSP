const express = require("express");
const app = express();
const port = 3000;

const agentesRoutes = require("./routes/agentesRoutes.js");
const casosRoutes = require("./routes/casosRoutes.js");

const setupSwagger = require("./docs/swagger.js");
const errorHandler = require("./utils/errorHandler.js");

app.use(express.json());

// Rotas da API
app.use("/agentes", agentesRoutes);
app.use("/casos", casosRoutes);

// Configuração do Swagger para documentação
setupSwagger(app);
app.use(errorHandler);

// Inicia o servidor
app.listen(port, () => {
  console.log(`\nServidor do departamento de polícia rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
