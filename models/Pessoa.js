module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define("Pessoa", {
        nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: 'cpfTipo'
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: 'emailSenha'
      },
      senha: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: 'emailSenha'
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      },
      tipo: {
        type: Sequelize.STRING(1),
        allowNull: false,
        unique: 'cpfTipo'
      }
    });
    return Pessoa;
  };