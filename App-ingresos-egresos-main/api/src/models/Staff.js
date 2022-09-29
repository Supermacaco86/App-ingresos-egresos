const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('staff', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    document: {
         type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
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