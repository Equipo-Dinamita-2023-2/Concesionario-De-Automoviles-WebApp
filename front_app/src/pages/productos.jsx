import Header from "../components/header";
import Footer from "../components/footer";
import '../styles/productos.css'
import carro from '../images/carroazul.jpg'

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
        <div className="contenedor-de-opciones">
            <div className="opciones-carro">
                <h2>Nuevos</h2>
            </div>
            <div className="opciones-carro">
                <h2>Repuestos</h2>
            </div>
            <div className="opciones-carro">
                <h2>Usados</h2>
            </div>
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

function Productos(){
    const numeroDeVeces = 9;
    return(
        <>
            <Header/>
            <Imagen/>
            <h1>Productos</h1>
            <Opciones/>
            <CrearProductos veces={numeroDeVeces}/>
            <Footer/>
        </>
    )
}

export default Productos;