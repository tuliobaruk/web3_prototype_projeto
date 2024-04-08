module.exports = (sequelize, Sequelize) => {
    const Localidade = sequelize.define("Localidade", {
        descricao: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      complemento: {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    });
    Localidade.associate = function (models) {
      Localidade.hasOne(models.Consultorio);
    };
    return Localidade;
  };