import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Track = sequelize.define("Track", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
                notEmpty: {
                    msg: "El tracking number no puede estar vacío." // Mensaje de error personalizado
                },
                len: {
                    args: [5, 255],
                    msg: "El tracking number debe de tener al menos 5 caracteres."
                },
          }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
                notEmpty: {
                    msg: "El estado no puede estar vacío." // Mensaje de error personalizado
                },
                len: {
                    args: [5, 255], 
                    msg: "El estado debe de tener almenos 5 caracteres."
                },
        }
    },
    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
      {
      timestamps: false,          
      },
);

  return Track;
  
};