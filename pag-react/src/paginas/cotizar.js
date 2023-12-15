import { useEffect, useState } from "react";
import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorConImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"
import { obtenerCliente } from "../api/cliente-api";
import { obtenerVehiculos } from "../api/vehiculo-api";
import { obtenerTipoV } from "../api/tipoV-api";
import { mostrar_alerta } from "../componentes/funciones";
import { crearCotizacion } from "../api/cotizacion-api";
import { obtenerEmpleados } from "../api/empleado-api";


function Cotizar() {

    const [clientes, setClientes] = useState([]);
    const [vehiculos, setVehiculo] = useState([]);
    const [tipoV, setTipoV] = useState([]);
    const [empleado, setEmpleado] = useState([]);

    const [idCliente, setIdCliente] = useState('');
    const [placa, setPlaca] = useState('');
    const [fechaCotizacion, setFechaCotizacion] = useState('');
    const [diasVigentes, setDiasVigentes] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [precioCotizacion, setPrecioCotizacion] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('');
    
    

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

    useEffect(() => {
        async function cargarTipoV() {
            try {
                const res = await obtenerTipoV();
                setTipoV(res);
            } catch (error) {
                console.error('Error al cargar tipo vehiculo:', error);
            }
        }
        cargarTipoV();
    }, []);

    useEffect(() => {
        async function cargarEmpleado() {
            try {
                const empleados = await obtenerEmpleados();
                const id = empleados.map((empleado) => ({
                    id_empleado: empleado.id_empleado,
                    documento: empleado.documento,
                    nombres: empleado.nombres
                }));
                setEmpleado(id);
            } catch (error) {
                console.error("Error al cargar id empleado:", error);
            }
        }
        cargarEmpleado();
    }, []);

    const handleEnviarCotizacion = async (e) => {
        e.preventDefault();
        // Validar los valores del formulario (puedes agregar más validaciones según tus necesidades)
    
        if(!idCliente || !placa || !placa || !fechaCotizacion ||
            !diasVigentes || !tipoVehiculo || !tipoVehiculo || !precioCotizacion || !idEmpleado){
                mostrar_alerta('Recuerda rellenar todos los campos', 'warning')
            }
        // Crear la cotización
        const cotizacion = {
            id_cliente:idCliente,
            placa,
            fecha_cotizacion: fechaCotizacion,
            dias_vigente:diasVigentes,
            id_tipo_vehiculo:tipoVehiculo,
            precio_cotizado:precioCotizacion,
            id_empleado:idEmpleado,
        };
    
        try {
            await crearCotizacion(cotizacion);
            mostrar_alerta('Cotización ingresada exitosamente', 'success');
        } catch (error) {
            mostrar_alerta('Cotización NO ingresada', 'warning');;
            console.error("Error al enviar la cotización:", error);
        }
    };
    
    

    return (
        <div>
            <Cabecera />
            <ContenedorConImagen imagen={publicidad} />
            <h1 className="titulos">Cotizar</h1>

            {/*Cliente*/}
            <form className="formulario-reparar">
                <label htmlFor="id-cliente" className="label-reparar">Identificación del cliente:</label>
                <select className="seleccion" required onChange={(e) => setIdCliente(parseInt(e.target.value, 10))}>
                    <option className="opciones" disabled selected>Selecciona una identificación</option>
                    {clientes.map((cliente, index) => (
                        <option className="opciones" key={index} value={cliente.id_cliente}>{`${cliente.documento} - ${cliente.nombres}`}</option>
                    ))}
                </select>
                {/*Placa*/}

                <label htmlFor="placa" className="label-reparar">Placa:</label>
                <select className="seleccion" required onChange={(e) => setPlaca(e.target.value)}>
                    <option className="opciones" disabled selected>Seleccione la placa</option>
                    {vehiculos.map((vehiculo, index) => (
                        <option className="opciones" key={index} value={vehiculo.placa}>{vehiculo.placa}</option>
                    ))}
                </select>

                {/*Información*/}

                <label htmlFor="fechaCotizacion" className="label-reparar">Fecha de Cotización:</label>
                <input type="date" id="fechaCotizacion" name="fechaCotizacion" className="input-reparar" required 
                onChange={(e) => setFechaCotizacion(e.target.value)}/>

                <label htmlFor="diasVigentes" className="label-reparar">Dias vigentes:</label>
                <input type="number" min="1" max="31" id="diasVigentes" name="diasVigentes" className="input-reparar" placeholder="Días de vigencia" required
                onChange={(e) => setDiasVigentes(parseInt(e.target.value, 10))} />

                <label htmlFor="tipoV" className="label-reparar">Tipo vehículo:</label>
                <select className="seleccion" required onChange={(e) => setTipoVehiculo(parseInt(e.target.value, 10))}>
                    <option className="opciones" disabled selected>Seleccione el tipo de vehiculo</option>
                    {tipoV.map((tipo, index) => (
                        <option className="opciones" key={index} value={tipo.id_tipo_vehiculo}>{`${tipo.marca} - ${tipo.modelo}`}</option>
                    ))}
                </select>

                <label htmlFor="precioCotizacion" className="label-reparar">Precio cotizado:</label>
                <input type="text" id="precioCotizacion" name="precioCotizacion" className="input-reparar" placeholder="Precio" required
                onChange={(e) => setPrecioCotizacion(parseInt(e.target.value, 10))}></input>

                <label htmlFor="empleado" className="label-reparar">Identificación del empleado:</label>
                <select className="seleccion" required onChange={(e) => setIdEmpleado(parseInt(e.target.value, 10))}>
                    <option className="opciones" disabled selected>Seleccione el identificación del empleado</option>
                    {empleado.map((empleado, index) => (
                        <option className="opciones" key={index} value={empleado.id_empleado}>{`${empleado.documento} - ${empleado.nombres}`}</option>
                    ))}
                </select>

                <div id="boton-reparar">
                    <button className="cta" onClick={handleEnviarCotizacion}>
                        <span className="hover-underline-animation"> Enviar </span>
                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                        </svg>
                    </button>
                </div>
            </form>
            <Footer />
        </div>

    )
}

export default Cotizar;