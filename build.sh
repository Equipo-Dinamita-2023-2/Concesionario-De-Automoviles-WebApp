#!/bin/bash

# Script para construir la aplicación React y mover los archivos estáticos a la carpeta de Django

# Ruta del directorio de la aplicación React
REACT_APP_DIR="pag-react"

# Ruta del directorio de la aplicación Django
DJANGO_APP_DIR="concesionario_webapp"

# Construir la aplicación React
echo "Construyendo la aplicación React..."
cd "$REACT_APP_DIR" || exit
npm run build  # Construir la aplicación
cd ..

# Mover los archivos estáticos a la carpeta de Django
echo "Moviendo archivos estáticos a la carpeta de Django..."
echo "Eliminar versiones antiguas..."
rm -rf "$DJANGO_APP_DIR/static"  # Eliminar versiones antiguas
echo "Creando directorio..."
mkdir -p "$DJANGO_APP_DIR/static"
echo "Copiando archivos..."
mv "$REACT_APP_DIR/build"/* "$DJANGO_APP_DIR/static/"
