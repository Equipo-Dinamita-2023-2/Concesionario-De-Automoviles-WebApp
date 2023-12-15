import React, { useEffect, useState } from "react";
import { obtenerTipoV, crearTipoV, actualizarTipoV, eliminarTipoV } from "../api/tipoV-api";
import { mostrar_alerta } from "../componentes/funciones";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import '../estilos/general.css'

const GestionVehiculo = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [id, setId] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [anho, setAnho] = useState("")
    const [color, setColor] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState('');
    const [operacion, setOperacion] = useState('');
    const [title, setTitle] = useState('');
    const [busqueda, setBusqueda] = useState('');

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
        `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anho} ${vehiculo.marca} ${vehiculo.color}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
        async function cargarVehiculos() {
            try {
                const res = await obtenerTipoV();
                setVehiculos(res);
                console.log(res);
            } catch (error) {
                console.error("Error al cargar vehiculo:", error);
            }
        }
        cargarVehiculos();
    }, []);


    const abrirModal = (op, id, marca, modelo, anho, color, stock, precio) => {
        setId('');
        setMarca('');
        setModelo('');
        setAnho('');
        setColor('');
        setStock('');
        setPrecio('');
        setOperacion(op);

        if (op === 1) {
            setTitle('Registrar vehiculo');
        } else if (op === 2) {
            setTitle('Editar vehiculo');
            setId(id);
            setMarca(marca);
            setModelo(modelo);
            setAnho(anho);
            setColor(color);
            setStock(stock);
            setPrecio(precio);
        }

    }

    const validarCampos = async () => {
        if (
            !marca || !modelo || !anho || !color ||
            !color || !stock || !precio
        ) {
            mostrar_alerta('Recuerda rellenar todos los campos', 'warning');
            return;
        }

        const vehiculo = {
            marca,
            modelo,
            anho,
            color,
            stock,
            precio
        };

        try {
            if (operacion === 1) {
                await crearTipoV(vehiculo);
                mostrar_alerta('Vehiculo ingresado exitosamente', 'success');
            } else if (operacion === 2) {
                await actualizarTipoV(id, vehiculo);
                mostrar_alerta('Vehiculo actualizado exitosamente', 'success');
            }

            const res = await obtenerTipoV();
            setVehiculos(res);

            document.getElementById('btnCerrar').click();
        } catch (error) {
            console.error("Error en la operación:", error);
            mostrar_alerta('No pudo llevarse a cabo la operación exitosamente', 'warning');
        }
    };

    const borrarVehiculo = async (id, marca, modelo) => {
        const MySwal = withReactContent(Swal);
        try {
            const result = await MySwal.fire({
                title: `¿Seguro desea eliminar el vehículo ${marca} ${modelo}?`,
                icon: 'question',
                text: 'No se podrá recuperar una vez se haya ejecutado',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await eliminarTipoV(id);
                mostrar_alerta('Se ha eliminado exitosamente', 'success');
                const res = await obtenerTipoV();
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
                <h1>Gestion de vehiculos</h1>
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
                                            data-bs-target="#modalVehiculos"
                                            style={{ maxWidth: '150px' }}
                                        >
                                            <i className="fa-solid fa-circle-plus"></i> Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3 me-3">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        {/* Estructura modificada para permitir más espacio horizontal */}
                                        <div style={{ overflowX: 'auto' }}>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Tipo vehiculo</th>
                                                        <th>Marca</th>
                                                        <th>Modelo</th>
                                                        <th>Año</th>
                                                        <th>Color</th>
                                                        <th>Stock</th>
                                                        <th>Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="table-group-divider">
                                                    {vehiculosFiltrados.map((vehiculo) => (
                                                        <tr key={vehiculo.id_tipo_vehiculo}>
                                                            <td>{vehiculo.id_tipo_vehiculo}</td>
                                                            <td>{vehiculo.marca}</td>
                                                            <td>{vehiculo.modelo}</td>
                                                            <td>{vehiculo.anho}</td>
                                                            <td>{vehiculo.color}</td>
                                                            <td>{vehiculo.stock}</td>
                                                            <td>{vehiculo.precio}</td>
                                                            <td>
                                                                <button onClick={() => abrirModal(2, vehiculo.id_tipo_vehiculo, vehiculo.marca, vehiculo.modelo, vehiculo.anho, vehiculo.color, vehiculo.stock, vehiculo.precio)}
                                                                    className="btn btn-warning" data-bs-toggle='modal' data-bs-target="#modalVehiculos">
                                                                    <i className="fa-solid fa-edit"></i>
                                                                </button>
                                                                &nbsp;
                                                                <button className="btn btn-danger" onClick={() => borrarVehiculo(vehiculo.id_tipo_vehiculo, vehiculo.marca, vehiculo.modelo)}>
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
                                    <span className="input-group-text"><i className="fa-brands fa-markdown"></i></span>
                                    <input type="text" id="marca" className="form-control" placeholder="Marca" value={marca}
                                        onChange={(e) => setMarca(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-code"></i></span>
                                    <input type="text" id="modelo" className="form-control" placeholder="Modelo" value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-calendar-days"></i></span>
                                    <input type="number" id="anho" className="form-control" placeholder="Año" value={anho}
                                        onChange={(e) => setAnho(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-paint-roller"></i></span>
                                    <input type="text" id="color" className="form-control" placeholder="Color" value={color}
                                        onChange={(e) => setColor(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-arrow-up-1-9"></i></span>
                                    <input type="number" id="stock" className="form-control" placeholder="Stock" value={stock}
                                        onChange={(e) => setStock(e.target.value)}></input>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fa-solid fa-hand-holding-dollar"></i></span>
                                    <input type="number" id="precio" className="form-control" placeholder="Precio" value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}></input>
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
