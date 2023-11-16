import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import '../estilos/productos.css'
import carro from '../imagenes/carroazul.jpg'
import {AiOutlineShoppingCart} from "react-icons/ai"

function Imagen(){
    return(
        <div class="contenedor-con-imagen">
            <div class="formulario-busqueda">
                <input type="text" id="busqueda" placeholder="Buscar..."/>
                <button id="boton-buscar">Buscar</button>
            </div>
        </div>
    )
}

function Opciones(){
    return(
    <div class="container">

    </div>
    )
}

function Carta(){
    return(
        <>
        <div className="product-image">
            <img src={carro} alt="" id="imagen-producto"/>
        </div>
        <div className="product-details">
            <div className="product-name">Nombre del producto</div>
            <p className="product-description">Descripcion</p>
            <div className="product-price">$0</div>
            <button className="add-to-cart-button">Add to car</button>
        </div>
    </>
    )
}

function CrearProductos({veces}){
    const renderizarElemento = (i) => (
        <div className="elemento" key={i}>
            <Carta/>
        </div>
    );
    
    const repetirCodigo = () => {
        const elementos = [];
        for (let i = 1; i <= veces; i++) {
        elementos.push(renderizarElemento(i));
        }
        return elementos;
    };
    
    return (
        <div className="repetirCodigo">
        {repetirCodigo()}
        </div>
    );

}

function Boton(){

  return(
    <>
    <button className="btn-carrito">
      <AiOutlineShoppingCart/>
    </button>
    </>
  )
}

function Productos(){
    const numeroDeVeces = 9;
    return(
        <div id="cuerpo">
            <Cabecera/>
            <Imagen/>
            
            <h1 className="titulos">Productos</h1>
            <Opciones/>
            <CrearProductos veces={numeroDeVeces}/>
            <Boton/>
            <Footer/>
        </div>
    )
}

export default Productos;