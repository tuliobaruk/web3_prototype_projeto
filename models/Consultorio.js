module.exports = (sequelize, Sequelize) => {
    const Consultorio = sequelize.define("Consultorio", {
        identificacao: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      complemento: {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    });
    Consultorio.associate = function (models) {
        Consultorio.belongsTo(models.Localidade);
      };
    return Consultorio;
  };