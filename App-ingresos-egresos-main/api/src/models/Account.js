const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('account', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
      updatedAt: false,
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
  });
};
