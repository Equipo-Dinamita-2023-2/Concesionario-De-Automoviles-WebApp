import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"
import '../estilos/reparar.css'
import { obtenerCliente } from "../api/prueba";
import { useEffect } from "react";

function InformacionCliente(){
    useEffect(() => {
        async function cargarCliente() {
            try {
                const res = await obtenerCliente();
                console.log(res);
            } catch (error) {
                console.error('Error al cargar cliente:', error);
            }
        }
        cargarCliente();
    }, []);
    return(
    <>
    <h2 className="subtitulos">Información del cliente</h2>
    <form className="formulario-reparar">
    <label htmlFor="cedula" className="label-reparar">Cédula:</label>
    <input type="text" id="cedula" name="cedula" className="input-reparar"required/>

    <label htmlFor="nombre" className="label-reparar">Nombre:</label>
    <input type="text" id="nombre" name="nombre" className="input-reparar" required/>

    <label htmlFor="apellidos" className="label-reparar">Apellidos:</label>
    <input type="text" id="apellidos" name="apellidos" className="input-reparar" required/>

    <label htmlFor="celular" className="label-reparar">Celular:</label>
    <input type="tel" id="celular" name="celular" className="input-reparar" required/>

    <label htmlFor="correo" className="label-reparar">Correo Electrónico:</label>
    <input type="email" id="correo" name="correo" className="input-reparar" required/>

    <label htmlFor="direccion" className="label-reparar">Dirección:</label>
    <input type="text" id="direccion" name="direccion" className="input-reparar" required/>

    <label htmlFor="ciudad" className="label-reparar">Ciudad:</label>
    <input type="text" id="ciudad" name="ciudad" className="input-reparar" required/>

    </form>
    </>
    )
}

function InformacionVendedor(){
    return(
        <>
        <h2 className="subtitulos">Información del vendedor</h2>
        <form className="formulario-reparar">
            <label htmlFor="id-vendedor" className="label-reparar">Identificación:</label>
            <input type="text" id="id-vendedor" name="id-vendedor" className="input-reparar"required/>

        </form>
        </>
    );
}

function InformacionVehiculo(){
    return(
    <>
    <h2 className="subtitulos">Información del vehículo</h2>
    <form className="formulario-reparar">
    <label htmlFor="placa" className="label-reparar">Placa:</label>
    <input type="text" id="placa" name="placa" className="input-reparar" required/>

    <label htmlFor="marca" className="label-reparar">Marca:</label>
    <input type="text" id="marca" name="marca" className="input-reparar" required/>

    <label htmlFor="modelo" className="label-reparar">Modelo:</label>
    <input type="text" id="modelo" name="modelo" className="input-reparar" required/>

    <label htmlFor="anio" className="label-reparar">Año:</label>
    <input type="bday-year" id="anio" name="anio" className="input-reparar" required/>

    <label htmlFor="color" className="label-reparar">Color:</label>
    <input type="text" id="color" name="color" className="input-reparar" required/>    
    </form>
    </>
    )
}

function DetallesProblema(){
    return(
    <>
    <h2 className="subtitulos">Detalles del ingreso</h2>
    <form className="formulario-reparar">
    
    <label htmlFor="fechaIngreso" className="label-reparar">Fecha de Ingreso:</label>
    <input type="date" id="fechaIngreso" name="fechaIngreso" className="input-reparar" required/>

    <label htmlFor="estadoReparacion" className="label-reparar">Estado de reparación:</label>
    <input type="text" id="estadoReparacion" name="estadoReparacion" className="input-reparar" required/>

    
    <label htmlFor="descripcionProblema" className="label-reparar">Descripción del Problema:</label>
    <textarea id="descripcionProblema" name="descripcionProblema" rows="4" className="input-reparar" required></textarea>

    <label htmlFor="repuestos" className="label-reparar">Repuestos:</label>
    <textarea id="repuestos" name="repuestos" rows="4" className="input-reparar"></textarea>    
    </form>

    <div id="boton-reparar">
    <button className="cta">
    <span className="hover-underline-animation"> Enviar </span>
    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
        <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
    </svg>
    </button>
    </div>
    </>
    )
}


function Reparar(){
    return(
        <>
            <Cabecera/>
            <ContenedorImagen imagen={publicidad}/>
            <h1 className="titulos">Reparar</h1>
            <InformacionCliente/>
            <InformacionVendedor/>
            <InformacionVehiculo/>
            <DetallesProblema/>
            <Footer/>
        </>
    )
}

export default Reparar;