import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader,ModalFooter} from 'reactstrap';

function Formulario() {

    const new_formulario=[

    {documento: 1, nombre: "Estiven ", apellidos: "Martinez", celular: 3146105201, correo: "estivenfrv@gmai.com",
    contrasena: "admin", direccion: "Cra 24", ciudad: "Cali", rol: ""},
    
    {documento: 2, nombre: "Pepe", apellidos: "Gonzalo", celular: 31415514201, correo: "lilan@gmai.com",
    contrasena: "admin", direccion: "Cra 54", ciudad: "Bogotá", rol: ""},
    
];

    const [data, setData]=useState(new_formulario);

    return (
        <div>

            <h2>Editar</h2>
            <br/>

        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Celular</th>
                    <th>Correo</th>
                    <th>Contraseña</th>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>Rol</th>
                </tr>
            </thead>

            <tbody>
                {data.map(elemento=>(

                    <tr>
                        <td>{elemento.documento}</td>
                        <td>{elemento.nombre}</td>
                        <td>{elemento.apellidos}</td>
                        <td>{elemento.celular}</td>
                        <td>{elemento.correo}</td>
                        <td>{elemento.contrasena}</td>
                        <td>{elemento.direccion}</td>
                        <td>{elemento.ciudad}</td>
                        <td>{elemento.rol}</td>
                        <td><button className="btn btn-primary">Editar</button>{" "}</td>
                        <td><button className="btn btn-danger">Eliminar</button>{" "}</td>
                    </tr>

                ))
                }
            </tbody>

        </table>

        <Modal>
            <ModalHeader>
                <div>
                    <h3>Editar trabajador</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                
            </ModalBody>
        </Modal>
        </div>
    )
}

export default Formulario
