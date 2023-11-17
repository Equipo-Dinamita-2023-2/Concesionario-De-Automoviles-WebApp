<<<<<<< HEAD
import Header from "../componentes/header";
import Footer from "../componentes/footer";


=======
import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"
import '../estilos/reparar.css'
import { obtenerCliente } from "../api/cliente-api";
import { obtenerVehiculos } from "../api/vehiculo-api";
import { obtenerTipoV } from "../api/tipoV-api";
import { obtenerEmpleados } from "../api/empleado-api";
import { useEffect,useState } from "react";


function IdentificacionCliente(){
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
        <label htmlFor="cedula-reparar" className="label-reparar">Identificación:</label>
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
        <label htmlFor="placa-reparar" className="label-reparar">Placa:</label>
        <select className="seleccion" required>
        <option className="opciones" disabled>Seleccione una placa</option>
            {vehiculos.map((vehiculo, index) => (
            <option className="opciones" key={index} value={vehiculo.placa}>{vehiculo.placa}</option>
            ))}
        </select>
        </>
    );
}

function TipoVehiculo(){
    const [tipos, setTipo] = useState([]);
    useEffect(() => {
        async function cargarTipos() {
            try {
                const res = await obtenerTipoV();
                setTipo(res);
            } catch (error) {
                console.error('Error al cargar tipos de vehiculos:', error);
            }
        }
        cargarTipos();
    }, []);

    return(
        <>
        <label htmlFor="idVehiculo" className="label-reparar">Tipo vehículo:</label>
        <select className="seleccion" required>
        <option className="opciones" disabled>Seleccione un tipo de vehiculo</option>
            {tipos.map((tipo, index) => (
                        <option className="opciones" key={index} value={tipo.marac}>{`${tipo.marca} - ${tipo.modelo}`}</option>

            ))}
        </select>
        </>
    );

}
function InformacionCliente(){
    return(
    <>
    <h2 className="subtitulos">Información del cliente</h2>
    <form className="formulario-reparar">
        <IdentificacionCliente/>
        <Placa/>
        <TipoVehiculo/>
    </form>
    </>
    )
}

function InformacionVendedor(){
    const [empleados, setEmpleados] = useState([]);
    useEffect(() => {
        async function cargarEmpleados() {
            try {
                const res = await obtenerEmpleados();
                console.log(res)
                setEmpleados(res);
            } catch (error) {
                console.error('Error al cargar los empleados:', error);
            }
        }
        cargarEmpleados();
    }, []);
    return(
        <>
        <h2 className="subtitulos">Información del vendedor</h2>
        <form className="formulario-reparar">
            <label htmlFor="id-vendedor" className="label-reparar">Identificación:</label>
            <select className="seleccion" required>
            <option className="opciones" disabled>Seleccione un tipo de vehiculo</option>
            {empleados.map((empleado, index) => (
                        <option className="opciones" key={index} value={empleado.nombre}>{`${empleado.documento} - ${empleado.nombres}`}</option>

            ))}
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
    <input type="date" id="fechaIngreso-reparar" name="fechaIngreso-reparar" className="input-reparar" required/>

    <label htmlFor="estadoReparacion-reparar" className="label-reparar">Estado de reparación:</label>
    <input type="text" id="estadoReparacion" name="estadoReparacion" className="input-reparar" required/>

    
    <label htmlFor="descripcionProblema" className="label-reparar">Descripción del Problema:</label>
    <textarea id="descripcionProblema" name="descripcionProblema" rows="4" className="input-reparar" required></textarea>

    <label htmlFor="repuestos-reparar" className="label-reparar">Repuestos:</label>
    <textarea id="repuestos" name="repuestos" rows="4" className="input-reparar" required></textarea>    
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
>>>>>>> CDAW-72-CDA2-78-CDAW84

function Reparar(){
    return(
        <>
<<<<<<< HEAD
            <Header/>
            <h1>Reparar</h1>
=======
            <Cabecera/>
            <ContenedorImagen imagen={publicidad}/>
            <h1 className="titulos">Reparar</h1>
            <InformacionCliente/>
            <InformacionVendedor/>
            <DetallesProblema/>
>>>>>>> CDAW-72-CDA2-78-CDAW84
            <Footer/>
        </>
    )
}

export default Reparar;