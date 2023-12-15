import React, { useEffect, useState } from 'react';
import Cabecera from '../componentes/cabecera';
import Footer from '../componentes/footer';
import '../estilos/productos.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import carro from '../imagenes/carroazul.jpg';
import { obtenerTipoV } from '../api/tipoV-api';
import { obtenerVehiculos } from '../api/vehiculo-api';

function Opciones() {
  return <div className="container">{/* Aquí puedes colocar opciones adicionales si es necesario */}</div>;
}

function Carta({ producto}) {
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
  const [busqueda, setBusqueda] = useState('');
  const [url, setUrl] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        // Cargar URLs
        const vehiculos = await obtenerVehiculos();
        const urls = vehiculos.map((vehiculo) => ({
          id: vehiculo.id,
          url: vehiculo.url
        }));
        setUrl(urls);

        // Cargar productos
        const productos = await obtenerTipoV();
        // Asociar las URLs a los productos
        const productosConUrl = productos.map((producto) => {
          const urlInfo = urls.find((u) => u.id === producto.id);
          return { ...producto, url: urlInfo ? urlInfo.url : '' };
        });
        setListaDeProductos(productosConUrl);
        console.log(productosConUrl);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    cargarDatos();
  }, []);

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const productosFiltrados = listaDeProductos.filter((producto) =>
    `${producto.marca} ${producto.modelo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div id="cuerpo">
      <Cabecera />
      <div className="contenedor-con-imagen">
      <div className="formulario-busqueda">
        <input type="text" id="busqueda" placeholder="Buscar..." value={busqueda}
          onChange={handleBusquedaChange}/>
        <button id="boton-buscar">Buscar</button>
      </div>
    </div>

      <h1 className="titulos">Productos</h1>
      <Opciones />
      <CrearProductos productos={productosFiltrados} />
      <Boton />
      <Footer />
    </div>
  );
}

export default Productos;
