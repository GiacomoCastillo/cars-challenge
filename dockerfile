# Etapa 1: Compilación
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copiar los package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar el resto del código fuente
COPY . .

# Compilar la aplicación NestJS
RUN npm run build

# Etapa 2: Crear la imagen de producción
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copiar las dependencias instaladas desde la etapa de construcción
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar el código compilado desde la etapa de construcción
COPY --from=builder /usr/src/app/dist ./dist

# Variables de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto por defecto de NestJS (3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
