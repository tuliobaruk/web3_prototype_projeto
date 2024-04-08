const express = require('express');
const db = require("./models");
const app = express();
const port = 3000;

// Importando o arquivo de rotas
const routes = require('./routes');

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Middleware para usar as rotas definidas em routes.js
app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Olá Mundo!');
});

// Sincronizando o Sequelize com o banco de dados e iniciando o servidor
db.sequelize.sync({ force: true }).then(function () {
  app.listen(port, function () {
    console.log("O Sequelize está funcionando\nO Servidor express está funcionando na porta " + port);
  });
});
