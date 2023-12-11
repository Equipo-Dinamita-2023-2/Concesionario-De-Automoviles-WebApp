import React, { useEffect, useState } from "react";
import { obtenerVehiculos, crearVehiculo, eliminarVehiculo, actualizarVehiculo } from "../api/vehiculo-api"; 
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css'

const GestionVehiculo = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [placa, setPlaca] = useState("");
    const [url, setUrl] = useState("")
    const [tipo_uso, setTipo_uso] = useState("");
    const [idTipoV, setIdTipoV] = useState("");
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function cargarVehiculos() {
            try {
                const res = await obtenerVehiculos();
                setVehiculos(res);
                console.log(res);
            } catch (error) {
                console.error("Error al cargar vehiculo:", error);
            }
        }
        cargarVehiculos();
    }, []);

    const abrirModal = (op, placa, tipo_uso, url, idTipoV) => {
        setIdTipoV('');
        setPlaca('');
        setTipo_uso('');
        setUrl('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar vehiculo');
        } else if (op === 2) {
            setTitle('Editar vehiculo');
            setIdTipoV(idTipoV);
            setPlaca(placa);
            setTipo_uso(tipo_uso);
            setUrl(url);
            
        }

    }

    const validarCampos = async () => {
        if (
            !placa || !idTipoV || !tipo_uso || !url
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }

        const vehiculo = {
            placa,
            tipo_uso,
            url,
            id_tipo_vehiculo: idTipoV
        };

        try {
            if (operacion === 1) {
                await crearVehiculo(vehiculo);
                mostrar_alerta('Vehiculo ingresado exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarVehiculo(placa, vehiculo);
                mostrar_alerta('Vehiculo actualizado exitosamente', 'success');
            }

            const res = await obtenerVehiculos();
            setVehiculos(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarVehiculo = async (placa) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar el vehículo de placa ${placa}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarVehiculo(placa);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerVehiculos();
                setVehiculos(res);
            } else {
                mostrar_alerta('El vehiculo NO pudo ser eliminado', 'info');
            }
        } catch (error) {
            console.error("Error al eliminar vehiculo:", error);
            mostrar_alerta('Hubo un error al eliminar la vehiculo', 'error');
        }
    };

    return (
        <>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        {/* Barra lateral */}
                        <div className="col-md-3 bg-light">
                            <h4>Barra Lateral</h4>
                            {/* Agrega más contenido según sea necesario */}
                        </div>
                        {/* Contenido principal */}
                        <div className="col-md-9">
                            <div className="row mt-3 align-items-center">
                                <div className="col-6 text-end">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar..."
                                        />
                                        <button className="btn btn-primary" type="button">
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-5">
                                    <select className="form-select me-2">
                                        <option value="todos">Todos</option>
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                    {/* Botón de añadir */}
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => abrirModal(1)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalVehiculos"
                                        style={{ maxWidth: '150px' }}
                                    >
                                        <i className="fa-solid fa-circle-plus"></i> Añadir
                                    </button>
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
                                                        <th>Uso</th>
                                                        <th>Url</th>
                                                        <th>Id tipo vehiculo</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {vehiculos.map((vehiculo) => (
                                                        <tr>
                                                            <td>{vehiculo.placa}</td>
                                                            <td>{vehiculo.tipo_uso}</td>
                                                            <td>{vehiculo.url}</td>
                                                            <td>{vehiculo.id_tipo_vehiculo}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, vehiculo.placa, vehiculo.tipo_uso, vehiculo.url, vehiculo.id_tipo_vehiculo)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalVehiculos">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarVehiculo(vehiculo.placa)}>
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
                {/* Modal de vehiculo */}
                <div id="modalVehiculos" className="modal fade" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <label className="h5">{title}</label>
                                <button type="button" className="btn-close" data-bs-dismiss='modal' arial-label='Close'></button>
                            </div>
                            <div className="modal-body">

                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fa-solid fa-arrow-up-1-9"></i></span>
                                        <input
                                            type="text"
                                            id="placa"
                                            className="form-control"
                                            value={placa}
                                            placeholder="Placa"
                                            onChange={(e) => setPlaca(e.target.value)}
                                        />
                                    </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-car-rear"></i></span>
                                    <input type="text" id="tipo-uso" className="form-control" placeholder="Tipo uso" value={tipo_uso}
                                        onChange={(e) => setTipo_uso(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-code"></i></span>
                                    <input type="text" id="url" className="form-control" placeholder="URL" value={url}
                                        onChange={(e) => setUrl(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-truck-ramp-box"></i></span>
                                    <input type="number" id="idTipoV" className="form-control" placeholder="Tipo vehiculo" value={idTipoV}
                                        onChange={(e) => setIdTipoV(e.target.value)}></input>
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



export default GestionVehiculo;
