module.exports = (sequelize, Sequelize) => {
    const Dentista = sequelize.define("Dentista", {
      cro: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: 'croEstado'
      },
      estadoCro: {
        type: Sequelize.STRING(2),
        allowNull: false,
        unique: 'croEstado'
      }
    });
    Dentista.associate = function (models) {
        Dentista.belongsTo(models.Pessoa);
      };
    return Dentista;
  };