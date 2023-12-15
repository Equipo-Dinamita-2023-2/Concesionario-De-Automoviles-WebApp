import React, { useEffect, useState } from "react";
import { obtenerRepuesto, crearRepuesto, actualizarRepuesto, eliminarRepuesto } from "../api/repuesto-api";
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css';
import { obtenerTipoV } from "../api/tipoV-api";

const GestionRepuesto = () => {
    const [repuestos, setRepuestos] = useState([]);
    const [cargarTipoV, setCargarTipoV] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [url, setUrl] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [idTipoV, setIdTipoV] = useState("");
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        async function cargarRepuestos() {
            try {
                const res = await obtenerRepuesto();
                setRepuestos(res);
                console.log(res);
            } catch (error) {
                console.error("Error al cargar repuestos:", error);
            }
        }
        cargarRepuestos();
    }, []);

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    const repuestosFiltrados = repuestos.filter((repuesto) =>
        `${repuesto.nombre_repuesto} ${repuesto.precio} ${repuesto.id_tipo_vehiculo}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
        async function cargarTipo() {
            try {
                const tipoV = await obtenerTipoV();
                const id = tipoV.map((tipo) => ({
                    id_tipo_vehiculo: tipo.id_tipo_vehiculo,
                    modelo: tipo.modelo,
                    marca: tipo.marca
                }));
                setCargarTipoV(id);
            } catch (error) {
                console.error("Error al cargar id tipo vehiculo:", error);
            }
        }
        cargarTipo();
    }, []);

    const abrirModal = (op, id, nombre, stock, precio, url, descripcion, idTipoV) => {
        setId('');
        setNombre('');
        setStock('');
        setPrecio('');
        setUrl('');
        setDescripcion('');
        setIdTipoV('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar repuesto');
        } else if (op === 2) {
            setTitle('Editar repuesto');
            setId(id);
            setNombre(nombre);
            setStock(stock);
            setPrecio(precio);
            setUrl(url);
            setDescripcion(descripcion);
            setIdTipoV(idTipoV);

        }
        window.setTimeout(function () {
            document.getElementById('nombre').focus();
        }, 500);


    }

    const validarCampos = async () => {
        if (
            !nombre || !stock || !precio || !url || !descripcion || !idTipoV
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }

        const repuesto = {
            nombre_repuesto: nombre,
            stock,
            precio,
            url,
            descripcion,
            id_tipo_vehiculo: idTipoV,
        };

        try {
            if (operacion === 1) {
                await crearRepuesto(repuesto);
                mostrar_alerta('Repuesto ingresado exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarRepuesto(id, repuesto);
                mostrar_alerta('Repuesto actualizado exitosamente', 'success');
            }

            const res = await obtenerRepuesto();
            setRepuestos(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarRepuesto = async (id, nombre) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar ${nombre}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarRepuesto(id);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerRepuesto();
                setRepuestos(res);
            } else {
                mostrar_alerta('El repuesto NO pudo ser eliminado', 'info');
            }
        } catch (error) {
            console.error("Error al eliminar repuesto:", error);
            mostrar_alerta('Hubo un error al eliminar la repuesto', 'error');
        }
    };

    return (
        <>
            <div className="App">
                <h1>Gestion de repuestos</h1>
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
                                            data-bs-target="#modalRepuesto"
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
                                                        <th>Nombre</th>
                                                        <th>Stock</th>
                                                        <th>Precio</th>
                                                        <th>Url</th>
                                                        <th>Descripcion</th>
                                                        <th>Id tipo vehiculo</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {repuestosFiltrados.map((repuesto) => (
                                                        <tr>
                                                            <td>{repuesto.nombre_repuesto}</td>
                                                            <td>{repuesto.stock}</td>
                                                            <td>{repuesto.precio}</td>
                                                            <td>{repuesto.url}</td>
                                                            <td>{repuesto.descripcion}</td>
                                                            <td>{repuesto.id_tipo_vehiculo}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, repuesto.id_tipo_vehiculo, repuesto.nombre_repuesto, repuesto.stock, repuesto.precio, repuesto.url, repuesto.descripcion, repuesto.id_tipo_vehiculo)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalRepuesto">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarRepuesto(repuesto.id_repuesto, repuesto.nombre_repuesto)}>
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
                {/* Modal de repuesto */}
                <div id="modalRepuesto" className="modal fade" aria-hidden="true">
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
                                    <span className="input-group-text"><i className="fa-solid fa-signature"></i></span>
                                    <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-hashtag"></i></span>
                                    <input type="number" id="stock" className="form-control" placeholder="Stock" value={stock}
                                        onChange={(e) => setStock(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-sack-dollar"></i></span>
                                    <input type="number" id="precio" className="form-control" placeholder="Precio" value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-code"></i></span>
                                    <input type="text" id="url" className="form-control" placeholder="Url" value={url}
                                        onChange={(e) => setUrl(e.target.value)}></input>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-info"></i></span>
                                    <input type="text" id="descripcion" className="form-control" placeholder="Descripcion" value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}></input>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-car-side"></i></span>
                                    <select className="form-control" required onChange={(e) => setIdTipoV(parseInt(e.target.value, 10))}>
                                        <option value="" disabled selected>Seleccione el tipo de vehículo</option>
                                        {cargarTipoV && cargarTipoV.map((tipo, index) => (
                                            <option key={index} value={tipo.id_tipo_vehiculo}>
                                                {`${tipo.marca} - ${tipo.modelo}`}
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



export default GestionRepuesto;
