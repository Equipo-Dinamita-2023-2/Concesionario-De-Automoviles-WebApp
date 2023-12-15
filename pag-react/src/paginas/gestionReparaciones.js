import React, { useEffect, useState } from "react";
import { crearReparacion, actualizarReparacion, eliminarReparacion, obtenerReparaciones } from '../api/reparacion-api'
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css'
import { obtenerCliente } from "../api/cliente-api";
import { obtenerVehiculos } from "../api/vehiculo-api";
import { obtenerEmpleados } from "../api/empleado-api";
import { obtenerTipoV } from "../api/tipoV-api";

const GestionReparaciones = () => {
    const [reparaciones, setReparaciones] = useState(null);
    const [idClientes, setIdClientes] = useState(null);
    const [cargarPlaca, setCargarPlaca] = useState(null);
    const [cargarEmpleado, setCargarEmpleado] = useState(null);
    const [cargarTipoV, setCargarTipoV] = useState(null);
    const [codigosCliente, setCodigosClientes] = useState(null);
    const [id, setId] = useState("");
    const [documentoClientes, setDocumentoCliente] = useState("");
    const [codigo, setCodigo] = useState("");
    const [placa, setPlaca] = useState("");
    const [fecha, setFecha] = useState("");
    const [idTipoV, setTipoV] = useState("");
    const [idEmpleado, setIdEmpleado] = useState("");
    const [listaRepuestos, setListaRepuestos] = useState("");
    const [costoRepuestos, setCostoRepuestos] = useState("");
    const [costoTotal, setCostoTotal] = useState("");
    const [costoTrabajo, setCostoTrabajo] = useState("");
    const [estadoPago, setEstadoPago] = useState('');
    const [estadoReparacion, setEstadoReparacion] = useState('');
    const [descripcionTrabajo, setDescripcionTrabajo] = useState('');
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        async function cargarReparaciones() {
            try {
                const res = await obtenerReparaciones();
                setReparaciones(res);
                const codigos = res.map((codigo) => ({
                    cod_cliente: codigo.cod_cliente
                }))
                setCodigosClientes(codigos);
            } catch (error) {
                console.error("Error al cargar la orden de reparación:", error);
            }
        }
        cargarReparaciones();
    }, []);

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    const reparacionesFiltradas = reparaciones && reparaciones.filter((reparacion) =>
        `${reparacion.placa} ${reparacion.id_cliente} ${reparacion.cod_cliente} ${reparacion.estado_pago} ${reparacion.estado_reparacion} ${reparacion.id_empleado}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
        async function cargarTipoV() {
            try {
                const tipoV = await obtenerTipoV();
                const id = tipoV.map((tipo) => ({
                    id_tipo_vehiculo: tipo.id_tipo_vehiculo,
                    marca: tipo.marca,
                    modelo: tipo.modelo
                }));
                setCargarTipoV(id);
            } catch (error) {
                console.error("Error al cargar id tipo vehiculo:", error);
            }
        }
        cargarTipoV();
    }, []);


    useEffect(() => {
        async function cargarCliente() {
            try {
                const clientes = await obtenerCliente();
                const idClientes = clientes.map((cliente) => ({
                    id_cliente: cliente.id_cliente,
                    documento: cliente.documento,
                    nombres: cliente.nombres
                }));
                setIdClientes(idClientes);
            } catch (error) {
                console.error("Error al cargar id cliente:", error);
            }
        }
        cargarCliente();
    }, []);

    useEffect(() => {
        async function cargarPlaca() {
            try {
                const vehiculos = await obtenerVehiculos();
                const placa = vehiculos.map((vehiculo) => ({
                    placa: vehiculo.placa
                }));
                setCargarPlaca(placa);
            } catch (error) {
                console.error("Error al cargar la placa:", error);
            }
        }
        cargarPlaca();
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
                setCargarEmpleado(id);
            } catch (error) {
                console.error("Error al cargar id empleado:", error);
            }
        }
        cargarEmpleado();
    }, []);

    const abrirModal = (op, id, idCliente, codCliente, placa, fecha, idTipoV, idEmpleado,
        lista, costoRepuestos, costoTrabajo, costoTotal, estadoPago, estadoReparacion, descripcionTrabajo) => {
        setId('');
        setDocumentoCliente('');
        setCodigo(generarCodigo(codigosCliente));
        setPlaca('');
        setFecha('');
        setTipoV('');
        setIdEmpleado('');
        setListaRepuestos('');
        setCostoRepuestos('');
        setCostoTrabajo('');
        setCostoTotal('');
        setEstadoPago('');
        setEstadoReparacion('');
        setDescripcionTrabajo('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar orden de reparación');
        } else if (op === 2) {
            setTitle('Editar orden de reparación');
            setId(id);
            setDocumentoCliente(idCliente);
            setCodigo(codCliente);
            setPlaca(placa);
            setFecha(fecha);
            setTipoV(idTipoV);
            setIdEmpleado(idEmpleado);
            setListaRepuestos(lista);
            setCostoRepuestos(costoRepuestos);
            setCostoTrabajo(costoTrabajo);
            setCostoTotal(costoTotal);
            setEstadoPago(estadoPago);
            setEstadoReparacion(estadoReparacion);
            setDescripcionTrabajo(descripcionTrabajo);
        }
        window.setTimeout(function () {
            document.getElementById('fecha').focus();
        }, 500);


    }

    const validarCampos = async () => {
        if (estadoReparacion === "") {
            mostrar_alerta('Selecciona un estado reparación', 'warning');
            return;
        }
        if (
            !documentoClientes || !codigo || !placa || !fecha || !idTipoV || !estadoReparacion ||
            !idEmpleado || !listaRepuestos || !costoRepuestos || !costoTrabajo || !costoTotal || !descripcionTrabajo
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }



        const reparacion = {
            cod_cliente: codigo,
            fecha_ingreso: fecha,
            lista_repuestos: listaRepuestos,
            costo_repuestos: costoRepuestos,
            costo_trabajo: costoTrabajo,
            costo_total: costoTotal,
            estado_pago: estadoPago,
            estado_reparacion: estadoReparacion,
            descripcion_trabajo: descripcionTrabajo,
            id_cliente: documentoClientes,
            placa,
            id_tipo_vehiculo: idTipoV,
            id_empleado: idEmpleado
        };

        try {
            if (operacion === 1) {
                await crearReparacion(reparacion);
                mostrar_alerta('Orden de reparación ingresada exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarReparacion(id, reparacion);
                mostrar_alerta('Orden de reparación actualizada exitosamente', 'success');
            }

            const res = await obtenerReparaciones();
            setReparaciones(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarReparacion = async (id, id_cliente) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar la orden de reparación del cliente ${id_cliente}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarReparacion(id);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerReparaciones();
                setReparaciones(res);
            } else {
                mostrar_alerta('La orden de reparación NO pudo ser eliminada', 'info');
            }
        } catch (error) {
            console.error("Error al eliminar orden de reparación:", error);
            mostrar_alerta('Hubo un error al eliminar la orden de reparación', 'error');
        }
    };

    return (
        <>
            <div className="App">
                <h1>Gestion de reparacion</h1>
                <div className="container-fluid">
                    <div className="row">

                        {/* Contenido principal */}
                        <div className="col-md-20">
                            <div className="formularios-gestion d-flex flex-row align-items-center" >
                                <div className="row mt-5 me-1 align-items-center">
                                    <div className="col-20 text-end">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Buscar..."
                                                value={busqueda}
                                                onChange={handleBusquedaChange}
                                            />
                                            <button className="btn btn-primary" type="button">
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-40">

                                        {/* Botón de añadir */}
                                        <button
                                            className="btn btn-dark"
                                            onClick={() => abrirModal(1)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalReparacion"
                                            style={{ maxWidth: '150px' }}
                                        >
                                            <i className="fa-solid fa-circle-plus"></i> Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        {/* Estructura modificada para permitir más espacio horizontal */}
                                        <div style={{ overflowX: 'auto' }}>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Placa</th>
                                                        <th>Id Cliente</th>
                                                        <th>Fecha ingreso</th>
                                                        <th>Costo repuestos</th>
                                                        <th>Costo trabajo</th>
                                                        <th>Costo total</th>
                                                        <th>Estado pago</th>
                                                        <th>Estado de reparación</th>
                                                        <th>Descripcion trabajo</th>
                                                        <th>Codigo cliente</th>
                                                        <th>Tipo vehiculo</th>
                                                        <th>Empleado</th>
                                                        <th>Lista repuestos</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {reparaciones && reparacionesFiltradas.map((reparacion) => (
                                                        <tr>
                                                            <td>{reparacion.placa}</td>
                                                            <td>{reparacion.id_cliente}</td>
                                                            <td>{reparacion.fecha_ingreso}</td>
                                                            <td>{reparacion.costo_repuestos}</td>
                                                            <td>{reparacion.costo_trabajo}</td>
                                                            <td>{reparacion.costo_total}</td>
                                                            <td>{reparacion.estado_pago}</td>
                                                            <td>{reparacion.estado_reparacion}</td>
                                                            <td>{reparacion.descripcion_trabajo}</td>
                                                            <td>{reparacion.cod_cliente}</td>
                                                            <td>{reparacion.id_tipo_vehiculo}</td>
                                                            <td>{reparacion.id_empleado}</td>
                                                            <td>{reparacion.lista_repuestos}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, reparacion.id_reparacion, reparacion.id_cliente, reparacion.cod_cliente, reparacion.placa, reparacion.fecha_ingreso, reparacion.id_tipo_vehiculo, reparacion.id_empleado, reparacion.lista_repuestos, reparacion.costo_repuestos, reparacion.costo_trabajo, reparacion.costo_total, reparacion.estado_pago, reparacion.estado_reparacion, reparacion.descripcion_trabajo)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalReparacion">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarReparacion(reparacion.id_reparacion, reparacion.id_cliente)}>
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal de reparación */}
                <div id="modalReparacion" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="h5">{title}</label>
                                <button type="button" className="btn-close" data-bs-dismiss='modal' arial-label='Close'></button>
                            </div>
                            <div className="modal-body">

                                {operacion === 2 && (
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa-solid fa-arrow-up-1-9"></i></span>
                                        <input
                                            type="text"
                                            id="id_reparaciones"
                                            className="form-control"
                                            value={id}
                                            readOnly
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                                    <select className="form-control" required onChange={(e) => setDocumentoCliente(parseInt(e.target.value, 10))}>
                                        <option value="" disabled selected>Selecciona un cliente</option>
                                        {idClientes && idClientes.map((cliente, index) => (
                                            <option key={index} value={cliente.id_cliente}>
                                                {`${cliente.documento} - ${cliente.nombres}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-key"></i></span>
                                    <input type="text" id="codCliente" className="form-control" placeholder="Codigo cliente" value={codigo} disabled
                                        onChange={(e) => setCodigo(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                                    <select className="form-control" required onChange={(e) => setPlaca(e.target.value.toString())}>
                                        <option value="" disabled selected>Selecciona una placa</option>
                                        {cargarPlaca && cargarPlaca.map((placa, index) => (
                                            <option key={index} value={placa.placa}>
                                                {placa.placa}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-calendar-days"></i></span>
                                    <input type="date" id="fecha" className="form-control" value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-car-side"></i></span>
                                    <select className="form-control" required onChange={(e) => setTipoV(parseInt(e.target.value, 10))}>
                                        <option value='' disabled selected>Seleccione el tipo de vehículo</option>
                                        {cargarTipoV && cargarTipoV.map((tipo, index) => (
                                            <option key={index} value={tipo.id_tipo_vehiculo}>
                                                {`${tipo.marca} - ${tipo.modelo}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-users"></i></span>
                                    <select className="form-control" required onChange={(e) => setIdEmpleado(parseInt(e.target.value, 10))}>
                                        <option value="" disabled selected>Selecciona su id de empleado</option>
                                        {cargarEmpleado && cargarEmpleado.map((empleado, index) => (
                                            <option key={index} value={empleado.id_empleado}>
                                                {`${empleado.documento} - ${empleado.nombres}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-list"></i></span>
                                    <input type="text" id="listaRepuestos" className="form-control" placeholder="Lista de repuestos" value={listaRepuestos}
                                        onChange={(e) => setListaRepuestos(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-money-bill-1"></i></span>
                                    <input type="number" id="costo_repuestos" className="form-control" placeholder="Costo repuestos" value={costoRepuestos}
                                        onChange={(e) => setCostoRepuestos(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-money-bill-1-wave"></i></span>
                                    <input type="number" id="costo_trabajo" className="form-control" placeholder="Costo trabajo" value={costoTrabajo}
                                        onChange={(e) => setCostoTrabajo(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-hand-holding-dollar"></i></span>
                                    <input type="number" id="costo_total" className="form-control" placeholder="Costo total" value={costoTotal}
                                        onChange={(e) => setCostoTotal(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-screwdriver-wrench"></i></span>
                                    <select className="form-control" required onChange={(e) => setEstadoPago(e.target.value)}>
                                        <option value="" disabled selected>Selecciona el estado de pago</option>
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Pagado">Pagado</option>
                                        <option value="Proceso">Proceso</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-screwdriver-wrench"></i></span>
                                    <select className="form-control" required onChange={(e) => setEstadoReparacion(e.target.value)}>
                                        <option value="" disabled selected>Selecciona el estado de reparación</option>
                                        <option value="En progreso">En progreso</option>
                                        <option value="Pruebas">Pruebas</option>
                                        <option value="Finalizado">Finalizado</option>
                                        <option value="Entregado">Entregado</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-clipboard-list"></i></span>
                                    <input type="text" id="costo_total" className="form-control" placeholder="Descripcion trabajo" value={descripcionTrabajo}
                                        onChange={(e) => setDescripcionTrabajo(e.target.value)}></input>
                                </div>

                                <div className="d-grid col-6 mx-auto">
                                    <button className="btn btn-success" onClick={() => validarCampos()}>
                                        <i className="fa-solid fa-floppy-disk"></i> Guardar
                                    </button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id='btnCerrar' type="button" className="btn btn-secondary" data-bs-dismiss='modal'>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function generarCodigo(lista) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo;

    do {
        codigo = '';
        for (let i = 0; i < 10; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres.charAt(indiceAleatorio);
        }
    } while (lista && lista.map(rep => rep.codigo).includes(codigo));

    return codigo;
}


export default GestionReparaciones;
