module.exports = (sequelize, Sequelize) => {
  const Consulta = sequelize.define("Consulta", {
    nome: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    relatorio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    data: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    taxa: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    taxaDescricao: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    valorFinal: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  });
  Consulta.associate = function (models) {
    Consulta.belongsTo(models.Pessoa);
    Consulta.belongsTo(models.Dentista);
    Consulta.belongsTo(models.Consultorio);
  }; 
  return Consulta;
};
