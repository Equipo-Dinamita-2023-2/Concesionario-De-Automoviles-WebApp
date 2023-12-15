#!/bin/bash

# Script para construir la aplicación React y mover los archivos estáticos a la carpeta de Django

# Ruta del directorio de la aplicación React
REACT_APP_DIR="pag-react"

# Ruta del directorio de la aplicación Django
DJANGO_APP_DIR="concesionario_webapp"

# Construir la aplicación React
echo "Construyendo la aplicación React..."
cd "$REACT_APP_DIR" || exit
npm install   # Instalar las dependencias (si es necesario)
npm run build  # Construir la aplicación
cd ..

# Mover los archivos estáticos a la carpeta de Django
echo "Moviendo archivos estáticos a la carpeta de Django..."
rm -rf "$DJANGO_APP_DIR/static"  # Eliminar versiones antiguas
mkdir -p "$DJANGO_APP_DIR/static"
cp -r "$REACT_APP_DIR/build"/* "$DJANGO_APP_DIR/static/"
