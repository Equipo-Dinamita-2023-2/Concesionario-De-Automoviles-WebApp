import React, { useEffect, useState } from "react";
import { obtenerCliente, crearCliente, eliminarCliente, actualizarCliente } from "../api/cliente-api"; 
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css'

const GestionCliente = () => {
    const [cliente, setCliente] = useState([]);
    const [id, setId] = useState("");
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function cargarCliente() {
            try {
                const res = await obtenerCliente();
                setCliente(res);
                console.log(res);
            } catch (error) {
                console.error("Error al cargar cliente:", error);
            }
        }
        cargarCliente();
    }, []);

    const abrirModal = (op, id, documento, nombres, apellidos, celular, correo,
        direccion, ciudad) => {
        setId('');
        setDocumento('');
        setNombre('');
        setApellidos('');
        setCelular('');
        setDireccion('');
        setCiudad('');
        setCorreo('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar cliente');
        } else if (op === 2) {
            setTitle('Editar cliente');
            setId(id);
            setDocumento(documento);
            setCelular(celular);
            setApellidos(apellidos);
            setNombre(nombres);
            setCorreo(correo);
            setDireccion(direccion);
            setCiudad(ciudad);
        }
        window.setTimeout(function () {
            document.getElementById('documento').focus();
        }, 500);


    }

    const validarCampos = async () => {
        if (
            !documento || !nombre || !apellidos || !celular || 
            !correo || !direccion || !ciudad 
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }

        const cliente = {
            documento,
            nombres: nombre,
            apellidos,
            celular,
            correo,
            direccion,
            ciudad,
        };

        try {
            if (operacion === 1) {
                await crearCliente(cliente);
                mostrar_alerta('Cliente ingresado exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarCliente(id, cliente);
                mostrar_alerta('Cliente actualizado exitosamente', 'success');
            }

            const res = await obtenerCliente();
            setCliente(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarCliente = async (id, nombre, apellido) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar al cliente ${nombre} ${apellido}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarCliente(id);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerCliente();
                setCliente(res);
            } else {
                mostrar_alerta('El Cliente NO pudo ser eliminado', 'info');
            }
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            mostrar_alerta('Hubo un error al eliminar el cliente', 'error');
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
                                        data-bs-target="#modalCliente"
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
                                                        <th>Documento</th>
                                                        <th>Nombres</th>
                                                        <th>Apellidos</th>
                                                        <th>Celular</th>
                                                        <th>Correo</th>
                                                        <th>Dirección</th>
                                                        <th>Ciudad</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {cliente.map((cliente) => (
                                                        <tr>
                                                            <td>{cliente.documento}</td>
                                                            <td>{cliente.nombres}</td>
                                                            <td>{cliente.apellidos}</td>
                                                            <td>{cliente.celular}</td>
                                                            <td>{cliente.correo}</td>
                                                            <td>{cliente.direccion}</td>
                                                            <td>{cliente.ciudad}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, cliente.id_cliente, cliente.documento, cliente.nombres, cliente.apellidos, cliente.celular, cliente.correo, cliente.direccion, cliente.ciudad)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalCliente">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarCliente(cliente.id_cliente, cliente.nombres, cliente.apellidos)}>
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
                {/* Modal de cliente */}
                <div id="modalCliente" className="modal fade" aria-hidden="true">
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
                                    <span className="input-group-text"><i className="fa-solid fa-id-card"></i></span>
                                    <input type="number" id="documento" className="form-control" placeholder="Documento de identidad" value={documento}
                                        onChange={(e) => setDocumento(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                                    <input type="text" id="nombre" className="form-control" placeholder="Nombres" value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-regular fa-user"></i></span>
                                    <input type="text" id="apellidos" className="form-control" placeholder="Apellidos" value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
                                    <input type="number" id="celular" className="form-control" placeholder="Celular" value={celular}
                                        onChange={(e) => setCelular(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                                    <input type="text" id="correo" className="form-control" placeholder="Correo electrónico" value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}></input>
                                </div>

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



export default GestionCliente;
