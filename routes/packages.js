import express from 'express';
import { Package } from '../models/initModels.js';
import { ValidationError } from 'sequelize'; // validator de sequelize
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js'; // A menudo, con ES modules en Node, se necesita la extensión .js
import timezone from 'dayjs/plugin/timezone.js'; // Igual aquí
// Cargar los plugins en Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

const router = express.Router();

router.post("/track", async (req, res) => {
    try {
        
        // Obtener la fecha-hora de acuerdo a la zona horaria de Lima-Perú
        const fecha_hora = dayjs().tz("America/Lima").toDate();

        const { tracking_number, status } = req.body;

        // Registrar el Device
         await Package.create({ tracking_number, status, fecha_hora });

        res.status(201).json({ 
            success: true,
            message: "Track registrado correctamente.",
        });

    } catch (error) {
        // Primero, verificamos si el error es una instancia de ValidationError de Sequelize
        if (error instanceof ValidationError) {
            console.log("Error de validación:", error.errors);
            
            // Extraemos los mensajes de error personalizados que definimos en el modelo
            const errorMessages = error.errors.map(err => err.message);

            return res.status(400).json({ // 400 Bad Request es el código ideal para errores de validación
                message: "Error de validación",
                success: false,
                errors: errorMessages // Enviamos un array con todos los mensajes de error
            });
        }

        // Si es otro tipo de error (ej. error de conexión a la BD), lo manejamos como un error del servidor
        console.log("Ocurrió un error en el registro del track: ", error);
        res.status(500).json({
            message: "Error en el servidor.",
            success: false
        });
    }
});


router.post("/track/status", async (req, res) => {
    try {

        const { tracking_number } = req.body;

        var track = await Package.findOne({
            where: {
                tracking_number: tracking_number,
            },
            order: [['id', 'DESC']],
        });

        if (!track) {
            return res.status(201).json({
                 success: false,
                 message: "Paquete no encontrado."
                });
        }

        // convertir a objeto plano
        track = track.get({ plain: true });

         // formatear fecha
        track.fecha_hora = formatearFechaHoraLima(track.fecha_hora);

        res.json( { 
            success: true,
            track 
        })
   
    } catch (error) {

        res.status(500).json({
            message: "Error del Servidor",
            success: false,
        })
    }
});

// Función helper para formatear fecha con zona horaria
function formatearFechaHoraLima(fechaUTC) {
    return dayjs(fechaUTC)
        .tz('America/Lima')
        .format('YYYY-MM-DD HH:mm:ss');
}

export default router;
