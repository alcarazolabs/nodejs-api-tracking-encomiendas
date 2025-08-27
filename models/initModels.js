import sequelize from '../db.js';
import packageModel from './Package.js'

// Inicializar modelos
const Package = packageModel(sequelize);

// Asignar relaciones si existen
const db = {
    Package
};

// Ejecutar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { Package };