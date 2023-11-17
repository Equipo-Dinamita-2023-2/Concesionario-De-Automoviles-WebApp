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
        <label htmlFor="cedula-reparar" className="label-reparar">Identificación:</label>
        <select className="seleccion" required>
            <option selected="selected" className="opciones">Identificación</option>
            <option className="opciones"></option>
            <option className="opciones"></option>
            <option className="opciones"></option>
        </select>

        <label htmlFor="placa-reparar" className="label-reparar">Placa:</label>
        <select className="seleccion" required>
            <option selected="selected"  className="opciones">Placa</option>
            <option className="opciones"></option>
            <option className="opciones"></option>
            <option className="opciones"></option>
        </select>

        <label htmlFor="idVehiculo" className="label-reparar">Identificación tipo vehículo:</label>
        <select className="seleccion" required>
            <option selected="selected"  className="opciones">Identificación tipo vehículo</option>
            <option className="opciones"></option>
            <option className="opciones"></option>
            <option className="opciones"></option>
        </select>
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
            <select className="seleccion" required>
            <option selected="selected"  className="opciones">Identificación</option>
            <option className="opciones"></option>
            <option className="opciones"></option>
            <option className="opciones"></option>
        </select>

        </form>
        </>
    );
}


function DetallesProblema(){
    return(
    <>
    <h2 className="subtitulos">Detalles del ingreso</h2>
    <form className="formulario-reparar">
    
    <label htmlFor="fechaIngreso-reparar" className="label-reparar">Fecha de Ingreso:</label>
    <input type="date" id="fechaIngreso-reparar" name="fechaIngreso" className="input-reparar" required/>

    <label htmlFor="estadoReparacion-reparar" className="label-reparar">Estado de reparación:</label>
    <input type="text" id="estadoReparacion" name="estadoReparacion" className="input-reparar" required/>

    
    <label htmlFor="descripcionProblema" className="label-reparar">Descripción del Problema:</label>
    <textarea id="descripcionProblema" name="descripcionProblema" rows="4" className="input-reparar" required></textarea>

    <label htmlFor="repuestos-reparar" className="label-reparar">Repuestos:</label>
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
            <DetallesProblema/>
            <Footer/>
        </>
    )
}

export default Reparar;