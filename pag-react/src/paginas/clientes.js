import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function Clientes() {
    
    const new_clientes = [

        { id_cliente: 1, documento: 111, nombre: "Juan", apellidos: "Perez",celular:311455,correo:"esteszv@gmail.com",
        direccion:"Cl 12e", ciudad: "Bogotá"},

       { id_cliente: 2, documento: 231, nombre: "Andres", apellidos: "Carvajal",celular:3145287896,correo:"a.carva@gmail.com",
       direccion:"cl 14A #74-5", ciudad: "Cali"},

      { id_cliente: 3, documento: 6565, nombre: "Felipe", apellidos: "Mezut",celular:3105874596,correo:"fer.na@gmail.com",
      direccion:"Cl 52e", ciudad: "Bogotá"},

      ]; 
    
      const [data, setData] = useState(new_clientes);
      const [modalEditar, setModalEditar] = useState(false);
      const [modalEliminar, setModalEliminar] = useState(false);
      const [modalInsertar, setModalInsertar] = useState(false);
    
      const [clienteSeleccionado, setClienteSeleccionado] = useState({
        id_cliente: '',
        documento: '',
        nombre: '',
        apellidos: '',
        celular: '',
        correo: '',
        direccion: '',
        ciudad: '',
      });
    
      const seleccionarCliente=(elemento, caso)=>{
        setClienteSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setClienteSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }
    
      const editar=()=>{
        var dataNueva=data;
        dataNueva.map(cliente=>{
          if(cliente.id_cliente===clienteSeleccionado.id_cliente){
            cliente.documento=clienteSeleccionado.documento;
            cliente.nombre=clienteSeleccionado.nombre;
            cliente.apellidos=clienteSeleccionado.apellidos;
            cliente.celular=clienteSeleccionado.celular;
            cliente.correo=clienteSeleccionado.correo;
            cliente.direccion=clienteSeleccionado.direccion;
            cliente.ciudad=clienteSeleccionado.ciudad;
          }
        });
        setData(dataNueva);
        setModalEditar(false);
      }
    
      const eliminar =()=>{
        setData(data.filter(cliente=>cliente.id_cliente!==clienteSeleccionado.id_cliente));
        setModalEliminar(false);
      }
    
      const abrirModalInsertar=()=>{
        setClienteSeleccionado(null);
        setModalInsertar(true);
      }
    
      const insertar =()=>{
        var valorInsertar=clienteSeleccionado;
        valorInsertar.id_cliente=data[data.length-1].id_cliente+1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
      }
    
      return (
        <div className="App">
          <h2>|CRUD| Clientes</h2>
          <br />
        <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
        <br /><br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Documento</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(cliente=>(
                <tr>
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.documento}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellidos}</td>
                  <td>{cliente.celular}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.ciudad}</td>
                  <td><button className="btn btn-primary" onClick={()=>seleccionarCliente(cliente, 'Editar')}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>seleccionarCliente(cliente, 'Eliminar')}>Eliminar</button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
    
          <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar CRUD</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Id</label>
                <input
                  className="form-control"
                  readOnly
                  type='number'
                  name="id_cliente"
                  value={clienteSeleccionado && clienteSeleccionado.id_cliente}
                />
                <br />
    
                <label>Documento</label>
                <input
                  className="form-control"
                  type='number'
                  name="documento"
                  value={clienteSeleccionado && clienteSeleccionado.documento}
                  onChange={handleChange}
                />
                <br />
    
                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={clienteSeleccionado && clienteSeleccionado.nombre}
                  onChange={handleChange}
                />
                <br />

                <label>Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="apellidos"
                  value={clienteSeleccionado && clienteSeleccionado.apellidos}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type='number'
                  name="celular"
                  value={clienteSeleccionado && clienteSeleccionado.celular}
                  onChange={handleChange}
                />
                <br />

                <label>Correo</label>
                <input
                  className="form-control"
                  type='email'
                  name="correo"
                  value={clienteSeleccionado && clienteSeleccionado.correo}
                  onChange={handleChange}
                />
                <br />


                <label>Dirección</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={clienteSeleccionado && clienteSeleccionado.direccion}
                  onChange={handleChange}
                />
                <br />

                
                <label>Ciudad</label>
                <input
                  className="form-control"
                  type="text"
                  name="ciudad"
                  value={clienteSeleccionado && clienteSeleccionado.ciudad}
                  onChange={handleChange}
                />
                <br />
              </div>


            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={()=>editar()}>
                Actualizar
              </button>
              <button
                className="btn btn-danger"
                onClick={()=>setModalEditar(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
    
    
          <Modal isOpen={modalEliminar}>
            <ModalBody>
              Estás Seguro que deseas eliminar el cliente {clienteSeleccionado && clienteSeleccionado.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>eliminar()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={()=>setModalEliminar(false)}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
    
    
            <Modal isOpen={modalInsertar}>
            <ModalHeader>
              <div>
                <h3>Insertar clientes</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type='number'
                  name="id_cliente"
                  value={data[data.length-1].id_cliente+1}
                />
                <br />
    
                <label>Documento</label>
                <input
                  className="form-control"
                  type='number'
                  name="documento"
                  value={clienteSeleccionado ? clienteSeleccionado.documento: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={clienteSeleccionado ? clienteSeleccionado.nombre: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="apellidos"
                  value={clienteSeleccionado ? clienteSeleccionado.apellidos: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type='number'
                  name="celular"
                  value={clienteSeleccionado ? clienteSeleccionado.celular: ''}
                  onChange={handleChange}
                />
                <br />


                <label>Correo</label>
                <input
                  className="form-control"
                  type="text"
                  name="correo"
                  value={clienteSeleccionado ? clienteSeleccionado.correo: ''}
                  onChange={handleChange}
                />
                <br />


                <label>Dirección</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={clienteSeleccionado ? clienteSeleccionado.direccion: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Ciudad</label>
                <input
                  className="form-control"
                  type="text"
                  name="ciudad"
                  value={clienteSeleccionado ? clienteSeleccionado.ciudad: ''}
                  onChange={handleChange}
                />
                <br />
              </div>

            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary"
              onClick={()=>insertar()}>
                Insertar
              </button>
              <button
                className="btn btn-danger"
                onClick={()=>setModalInsertar(false)}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      );
}

export default Clientes
 
