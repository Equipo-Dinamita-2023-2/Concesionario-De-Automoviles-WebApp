import React, { useEffect, useState } from 'react';
import Cabecera from '../componentes/cabecera';
import Footer from '../componentes/footer';
import '../estilos/productos.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import carro from '../imagenes/carroazul.jpg';
import repuesto from '../imagenes/repuestos-carro.jpg';
import { obtenerTipoV } from '../api/tipoV-api';
import { obtenerRepuesto } from '../api/repuesto-api';

function Opciones() {
  return <div className="container">{/* Aquí puedes colocar opciones adicionales si es necesario */}</div>;
}

function Carta({ producto}) {

  const imagenUrl = producto.nombre_repuesto ? repuesto : carro;
  return (
    <>
    <div className="product-image">
      <img src={imagenUrl} alt="" id="imagen-producto" />
    </div>
    <div className="product-details">
      <div className="product-name">
        {producto.marca && producto.modelo
          ? `${producto.marca} - ${producto.modelo}`
          : producto.nombre_repuesto}
      </div>
      <p className="product-description">
        {producto.anho && producto.color
          ? `Este vehículo es del año ${producto.anho} y es de color ${producto.color}`
          : producto.descripcion}
      </p>
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

  useEffect(() => {
    async function cargarDatos() {
      try {
        // Obtener vehículos
        const vehiculos = await obtenerTipoV();
        
        // Obtener repuestos
        const repuestos = await obtenerRepuesto();
  
        // Combinar vehículos y repuestos en una sola lista de productos
        const listaTotalProductos = [...vehiculos, ...repuestos];
  
        // Asignar la lista combinada al estado
        setListaDeProductos(listaTotalProductos);
        console.log(listaDeProductos);
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
    `${producto.marca} ${producto.modelo} ${producto.anho} ${producto.color} ${producto.nombre_repuesto}`.toLowerCase().includes(busqueda.toLowerCase())
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
