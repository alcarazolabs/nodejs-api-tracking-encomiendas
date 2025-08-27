# Usa una imagen ligera de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición del proyecto primero
COPY package*.json ./

# Instala dependencias (usa npm ci si hay package-lock.json para mayor eficiencia)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa tu app (por defecto 3000)
EXPOSE 7000

# Comando para ejecutar tu servidor Node.js
CMD ["node", "app.js"]