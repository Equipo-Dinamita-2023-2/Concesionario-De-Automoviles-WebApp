import React, { useEffect, useState } from "react";
import { obtenerEmpleados, crearEmpleado, eliminarEmpleado, actualizarEmpleado } from "../api/empleado-api";
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css'
import { obtenerRoles } from "../api/roles-api";
import { obtenerSucursal } from "../api/sucursal-api";

const GestionEmpleado = () => {
    const [empleados, setEmpleados] = useState([]);
    const [cargarRol, setCargarRol] = useState([]);
    const [cargarSucursal, setCargarSucursal] = useState(null);
    const [id, setId] = useState("");
    const [documento, setDocumento] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [idRol, setIdRol] = useState("");
    const [idSucursal, setIdSucursal] = useState("");
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        async function cargarEmpleados() {
            try {
                const res = await obtenerEmpleados();
                setEmpleados(res);
                
            } catch (error) {
                console.error("Error al cargar empleado:", error);
            }
        }
        cargarEmpleados();
    }, []);

    useEffect(() => {
        async function cargarRol() {
            try {
                const roles = await obtenerRoles();
                const idRol = roles.map((rol) => ({
                    id_rol: rol.id_rol,
                    tipo_rol: rol.tipo_rol
                }));
                setCargarRol(idRol);
            } catch (error) {
                console.error("Error al cargar los roles:", error);
            }
        }
        cargarRol();
    }, []);

    useEffect(() => {
        async function cargarSucursales() {
            try {
                const sucursales = await obtenerSucursal();
                const idSucursal = sucursales.map((sucursal) => ({
                    id_sucursal: sucursal.id_sucursal,
                    ciudad: sucursal.ciudad,
                    direccion: sucursal.direccion
                }));
                setCargarSucursal(idSucursal);
            } catch (error) {
                console.error("Error al cargar las sucursales:", error);
            }
        }
        cargarSucursales();
    }, []);

    const abrirModal = (op, id, documento, nombres, apellidos, celular, correo, password,
        ciudad, direccion, idRol, idSucursal) => {
        setId('');
        setDocumento('');
        setNombre('');
        setApellidos('');
        setCelular('');
        setDireccion('');
        setCiudad('');
        setIdRol('');
        setIdSucursal('');
        setCorreo('');
        setPassword('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar empleado');
        } else if (op === 2) {
            setTitle('Editar empleado');
            setId(id);
            setDocumento(documento);
            setCelular(celular);
            setApellidos(apellidos);
            setNombre(nombres);
            setPassword(password);
            setCorreo(correo);
            setDireccion(direccion);
            setCiudad(ciudad);
            setIdRol(idRol);
            setIdSucursal(idSucursal);
        }
        window.setTimeout(function () {
            document.getElementById('documento').focus();
        }, 500);


    }

    const validarCampos = async () => {
        if (
            !documento || !nombre || !apellidos || !celular || !correo ||
            !password || !direccion || !ciudad || !idRol || !idSucursal
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }

        const empleado = {
            id_empleado: id,
            documento,
            nombres: nombre,
            apellidos,
            celular,
            correo,
            contrasenha: password,
            direccion,
            ciudad,
            id_rol: idRol,
            id_sucursal: idSucursal,
        };

        try {
            if (operacion === 1) {
                await crearEmpleado(empleado);
                mostrar_alerta('Empleado ingresado exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarEmpleado(id, empleado);
                mostrar_alerta('Empleado actualizado exitosamente', 'success');
            }

            const res = await obtenerEmpleados();
            setEmpleados(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarEmpleado = async (id, nombre, apellido) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar al empleado ${nombre} ${apellido}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarEmpleado(id);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerEmpleados();
                setEmpleados(res);
            } else {
                mostrar_alerta('El empleado NO pudo ser eliminado', 'info');
            }
        } catch (error) {
            console.error("Error al eliminar empleado:", error);
            mostrar_alerta('Hubo un error al eliminar el empleado', 'error');
        }
    };

    return (
        <>
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
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
                                        data-bs-target="#modalEmpleados"
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
                                                        <th>Contraseña</th>
                                                        <th>Dirección</th>
                                                        <th>Ciudad</th>
                                                        <th>Rol</th>
                                                        <th>Sucursal</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {empleados.map((empleado) => (
                                                        <tr>
                                                            <td>{empleado.documento}</td>
                                                            <td>{empleado.nombres}</td>
                                                            <td>{empleado.apellidos}</td>
                                                            <td>{empleado.celular}</td>
                                                            <td>{empleado.correo}</td>
                                                            <td>{empleado.contrasenha}</td>
                                                            <td>{empleado.direccion}</td>
                                                            <td>{empleado.ciudad}</td>
                                                            <td>{empleado.id_rol}</td>
                                                            <td>{empleado.id_sucursal}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, empleado.id_empleado, empleado.documento, empleado.nombres, empleado.apellidos, empleado.celular, empleado.correo, empleado.contrasenha, empleado.ciudad, empleado.direccion, empleado.id_rol, empleado.id_sucursal)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalEmpleados">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarEmpleado(empleado.id_empleado, empleado.nombres, empleado.apellidos)}>
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
                {/* Modal de empleados */}
                <div id="modalEmpleados" className="modal fade" aria-hidden="true">
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
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input type="text" id="contrasenha" className="form-control" placeholder="Contraseña" value={password}
                                        onChange={(e) => setPassword(e.target.value)}></input>
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

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-users"></i></span>
                                    <select className="form-control" required onChange={(e) => setIdRol(parseInt(e.target.value, 10))}>

                                        <option value="" disabled selected>Selecciona el rol</option>
                                        {cargarRol && cargarRol.map((rol, index) => (
                                            <option key={index} value={rol.id_rol}>
                                                {rol.tipo_rol}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-code-branch"></i></span>
                                    <select className="form-control" required onChange={(e) => setIdSucursal(parseInt(e.target.value, 10))}>
                                        <option value="" disabled selected>Selecciona la sucursal</option>
                                        {cargarSucursal && cargarSucursal.map((sucursal, index) => (
                                            <option key={index} value={sucursal.id_sucursal}>
                                                {`${sucursal.direccion} - ${sucursal.ciudad}`}
                                            </option>
                                        ))}
                                    </select>
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



export default GestionEmpleado;
