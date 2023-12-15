import React, { useEffect, useState } from 'react';
import Cabecera from '../componentes/cabecera';
import Footer from '../componentes/footer';
import '../estilos/productos.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import carro from '../imagenes/carroazul.jpg';
import { obtenerTipoV } from '../api/tipoV-api';

function Imagen() {
  return (
    <div className="contenedor-con-imagen">
      <div className="formulario-busqueda">
        <input type="text" id="busqueda" placeholder="Buscar..." />
        <button id="boton-buscar">Buscar</button>
      </div>
    </div>
  );
}

function Opciones() {
  return <div className="container">{/* Aquí puedes colocar opciones adicionales si es necesario */}</div>;
}

function Carta({ producto }) {
  return (
    <>
      <div className="product-image">
        <img src={carro} alt="" id="imagen-producto" />
      </div>
      <div className="product-details">
        <div className="product-name">{`${producto.marca} - ${producto.modelo}`}</div>
        <p className="product-description">Este vehiculo es del año {producto.anho} y es de color {producto.color}</p>
        <div className="product-price">${producto.precio}</div>
        <button className="add-to-cart-button">Add to cart</button>
      </div>
    </>
  );
}

function CrearProductos({ productos }) {
  const renderizarElemento = (producto) => (
    <div className="elemento" key={producto.id}>
      <Carta producto={producto} />
    </div>
  );

  return <div className="repetirCodigo">{productos.map(renderizarElemento)}</div>;
}

function Boton() {
  return (
    <>
      <button className="btn-carrito">
        <AiOutlineShoppingCart />
      </button>
    </>
  );
}

function Productos() {
  const [listaDeProductos, setListaDeProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const productos = await obtenerTipoV();
        setListaDeProductos(productos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    }

    cargarProductos();
  }, []);

  return (
    <div id="cuerpo">
      <Cabecera />
      <Imagen />

      <h1 className="titulos">Productos</h1>
      <Opciones />
      <CrearProductos productos={listaDeProductos} />
      <Boton />
      <Footer />
    </div>
  );
}

export default Productos;
