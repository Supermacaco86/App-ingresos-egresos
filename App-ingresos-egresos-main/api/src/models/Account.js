const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('account', {
    id:{
      type:DataTypes.STRING,
      defaultValue:UUIDV4,
      // autoIncrement:true,
      primaryKey:true,
      allowNull:false
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
