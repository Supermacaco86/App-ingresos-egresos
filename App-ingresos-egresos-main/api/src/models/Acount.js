const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('acount', {
    id: {
      type: DataTypes.STRING,
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
  });
};
