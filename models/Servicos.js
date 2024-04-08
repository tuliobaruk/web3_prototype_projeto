module.exports = (sequelize, Sequelize) => {
    const Servicos = sequelize.define("Servicos", {
        nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    });
    return Servicos;
  };