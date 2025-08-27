import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './db.js';
import './models/initModels.js'; // ejecuta asociaciones automaticamente

import packagesRoutes from './routes/packages.js';
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/', packagesRoutes);

// Conexión inicial
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion a la BD mysql establecida!");
        await sequelize.sync({ 
          alter: true    
        });
        console.log("Modelos sincronizados con la BD mysql.");
    } catch (error) {
        console.log("No se pudo conectar a la BD mysql: ", error);
    }
})();


// Iniciar Servidor
const PORT = process.env.APP_PORT || 7000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: "+PORT);
})

