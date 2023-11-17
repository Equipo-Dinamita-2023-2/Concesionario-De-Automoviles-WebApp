<<<<<<< HEAD
import Header from "../componentes/header";
import Footer from "../componentes/footer";

function Imagen(){
    return(
        <div>
            <h1>Reparar</h1>
        
        </div>
    )

}



function Cotizar(){
    return(
        <>
            <Header/>
            <Imagen/>
            <Footer/>
        </>
=======
import { useEffect,useState } from "react";
import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorConImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"
import { obtenerCliente } from "../api/cliente-api";
import { obtenerVehiculos } from "../api/vehiculo-api";

function IdCliente(){
    const [clientes, setClientes] = useState([]);
    useEffect(() => {
        async function cargarCliente() {
            try {
                const res = await obtenerCliente();
                setClientes(res);
            } catch (error) {
                console.error('Error al cargar cliente:', error);
            }
        }
        cargarCliente();
    }, []);

    return(
        <>
        <label htmlFor="id-cliente" className="label-reparar">Identificación:</label>
        <select className="seleccion" required>
            <option className="opciones" disabled>Selecciona una identificación</option>
            {clientes.map((cliente, index) => (
            <option className="opciones" key={index} value={cliente.nombres}>{`${cliente.documento} - ${cliente.nombres}`}</option>
            ))}
        </select>
        </>

    );
}

function Placa(){
    const [vehiculos, setVehiculo] = useState([]);
    useEffect(() => {
        async function cargarVehiculos() {
            try {
                const res = await obtenerVehiculos();
                setVehiculo(res);
            } catch (error) {
                console.error('Error al cargar vehiculos:', error);
            }
        }
        cargarVehiculos();
    }, []);

    return(
        <>
        <label htmlFor="placa" className="label-reparar">Placa:</label>
        <select className="seleccion" required>
        <option className="opciones" disabled>Seleccione una placa</option>
            {vehiculos.map((vehiculo, index) => (
            <option className="opciones" key={index} value={vehiculo.placa}>{vehiculo.placa}</option>
            ))}
        </select>
        </>
    );
}

function Informacion(){
    return(
    <>
    <label htmlFor="fechaCotizacion" className="label-reparar">Fecha de Cotización:</label>
            <input type="date" id="fechaCotizacion" name="fechaCotizacion" className="input-reparar" required/>

            <label htmlFor="diasVigentes" className="label-reparar">Dias vigentes:</label>
            <input type="number" min="1" max="31" id="diasVigentes" name="diasVigentes" className="input-reparar"required/>

            <label htmlFor="id-tipoV" className="label-reparar">Identificación tipo vehiculo:</label>
            <input type="text" id="id-tipoV" name="id-tipoV" className="input-reparar"required/>

            <label htmlFor="descripcionCotizacion" className="label-reparar">Descripción de la cotización:</label>
            <textarea id="descripcionCotizacion" name="descripcionCotizacion" rows="4" className="input-reparar" required></textarea>

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

function Cotizar(){

    return(
        <div>
            <Cabecera/>
            <ContenedorConImagen imagen={publicidad}/>
            <h1 className="titulos">Cotizar</h1>
            <form className="formulario-reparar">
                <IdCliente/>
                <Placa/>
                <Informacion/>
            </form>
            <Footer/>
        </div>
>>>>>>> CDAW-72-CDA2-78-CDAW84
        
    )
}

export default Cotizar;