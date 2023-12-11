import React, { useEffect, useState } from "react";
import { obtenerSucursal, crearSucursal, eliminarSucursal, actualizarSucursal } from "../api/sucursal-api"; 
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css'

const GestionSucursal = () => {
    const [sucursal, setSucursal] = useState([]);
    const [id, setId] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [celular, setCelular] = useState("");
    const [fijo, setFijo] = useState("");
    const [correo, setCorreo] = useState("");
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function cargarSucursal() {
            try {
                const res = await obtenerSucursal();
                setSucursal(res);
                console.log(res);
            } catch (error) {
                console.error("Error al cargar sucursal:", error);
            }
        }
        cargarSucursal();
    }, []);

    const abrirModal = (op, id, ciudad, direccion, celular, fijo, correo) => {
        setId('');
        setCelular('');
        setCiudad('');
        setFijo('');
        setDireccion('');
        setCorreo('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar sucursal');
        } else if (op === 2) {
            setTitle('Editar sucursal');
            setId(id);
            setCiudad(ciudad);
            setDireccion(direccion);
            setCelular(celular);
            setFijo(fijo);
            setCorreo(correo);
            
        }
        window.setTimeout(function () {
            document.getElementById('ciudad').focus();
        }, 500);


    }

    const validarCampos = async () => {
        if (
            !ciudad || !direccion || !celular || !fijo || !correo
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }

        const sucursal = {
            id_sucursal: id,
            ciudad,
            direccion,
            celular,
            fijo,
            correo,
        };

        try {
            if (operacion === 1) {
                await crearSucursal(sucursal);
                mostrar_alerta('Sucursal ingresada exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarSucursal(id, sucursal);
                mostrar_alerta('Sucursal actualizada exitosamente', 'success');
            }

            const res = await obtenerSucursal();
            setSucursal(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarSucursal = async (id, ciudad, direccion) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar la sucursal ubicada en la ciudad de ${ciudad} y dirección ${direccion}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarSucursal(id);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerSucursal();
                setSucursal(res);
            } else {
                mostrar_alerta('El sucursal NO pudo ser eliminado', 'info');
            }
        } catch (error) {
            console.error("Error al eliminar sucursal:", error);
            mostrar_alerta('Hubo un error al eliminar la sucursal', 'error');
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
                                        data-bs-target="#modalSucursal"
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
                                                        <th>Id</th>
                                                        <th>Ciudad</th>
                                                        <th>Dirección</th>
                                                        <th>Celular</th>
                                                        <th>Fijo</th>
                                                        <th>Correo</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {sucursal.map((sucursal) => (
                                                        <tr>
                                                            <td>{sucursal.id_sucursal}</td>
                                                            <td>{sucursal.ciudad}</td>
                                                            <td>{sucursal.direccion}</td>
                                                            <td>{sucursal.celular}</td>
                                                            <td>{sucursal.fijo}</td>
                                                            <td>{sucursal.correo}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, sucursal.id_sucursal, sucursal.ciudad, sucursal.direccion, sucursal.celular, sucursal.fijo, sucursal.correo)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalSucursal">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarSucursal(sucursal.id_sucursal, sucursal.ciudad, sucursal.direccion)}>
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
                {/* Modal de sucursal */}
                <div id="modalSucursal" className="modal fade" aria-hidden="true">
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
                                            id="id"
                                            className="form-control"
                                            value={id}
                                            readOnly
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-city"></i></span>
                                    <input type="text" id="ciudad" className="form-control" placeholder="Ciudad" value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-location-dot"></i></span>
                                    <input type="text" id="direccion" className="form-control" placeholder="Dirección" value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-mobile"></i></span>
                                    <input type="number" id="celular" className="form-control" placeholder="Celular" value={celular}
                                        onChange={(e) => setCelular(e.target.value)}></input>
                                </div>
                                
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
                                    <input type="number" id="fijo" className="form-control" placeholder="Fijo" value={fijo}
                                        onChange={(e) => setFijo(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                                    <input type="text" id="correo" className="form-control" placeholder="Correo electrónico" value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}></input>
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



export default GestionSucursal;
