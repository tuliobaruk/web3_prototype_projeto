module.exports = (sequelize, Sequelize) => {
    const Disponibilidade = sequelize.define("Disponibilidade", {
        diaDaSemana: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      horarioInicial: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horarioFinal: {
        type: Sequelize.TIME,
        allowNull: false,
      }
    });
    Disponibilidade.associate = function (models) {
        Disponibilidade.belongsTo(models.Dentista);
        Disponibilidade.belongsTo(models.Servicos);
        Disponibilidade.belongsTo(models.Consultorio, {  
            foreignKey: {
            allowNull: false
          }});
      };
    return Disponibilidade;
};