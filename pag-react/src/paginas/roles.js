
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function Roles() {
    
    const new_trabajadores = [
        { id_empleado: 1, documento: 444, nombre: "Estiven", apellidos: "Martinez",celular:314610,correo:"estivenfrv@gmail.com",
    contrasenha: "",direccion:"Cra24A", ciudad: "Cali", rol:"Vendedor" },

    { id_empleado: 3, documento: 111, nombre: "Juan", apellidos: "Perez",celular:311455,correo:"esteszv@gmail.com",
    contrasenha:"",direccion:"Cl 12e", ciudad: "Bogotá", rol:"Tallerista" },

    { id_empleado: 3, documento:0, nombre: "Yessenia", apellidos: "Rivas",celular:1441,correo:"yrivas@gmail.com",
    contrasenha:"",direccion:"Cr5#89", ciudad: "B/quilla", rol:"Vendedor" },

      ];
    
      const [data, setData] = useState(new_trabajadores);
      const [modalEditar, setModalEditar] = useState(false);
      const [modalEliminar, setModalEliminar] = useState(false);
      const [modalInsertar, setModalInsertar] = useState(false);
    
      const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
        id_ciente: '',
        documento: '',
        nombre: '',
        apellidos: '',
        celular: '',
        contrasenha:'',
        correo: '',
        direccion: '',
        ciudad: '',
        rol:'',
      });
    
      const seleccionarEmpleado=(elemento, caso)=>{
        setEmpleadoSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setEmpleadoSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }
    
      const editar=()=>{
        var dataNueva=data;
        dataNueva.map(empleado=>{
          if(empleado.id_empleado===empleadoSeleccionado.id_empleado){
            empleado.documento=empleadoSeleccionado.documento;
            empleado.nombre=empleadoSeleccionado.nombre;
            empleado.apellidos=empleadoSeleccionado.apellidos;
            empleado.celular=empleadoSeleccionado.celular;
            empleado.correo=empleadoSeleccionado.correo;
            empleado.contrasenha=empleadoSeleccionado.contrasenha;
            empleado.direccion=empleadoSeleccionado.direccion;
            empleado.ciudad=empleadoSeleccionado.ciudad;
            empleado.nombre=empleadoSeleccionado.nombre;
          }
        });
        setData(dataNueva);
        setModalEditar(false);
      }
    
      const eliminar =()=>{
        setData(data.filter(empleado=>empleado.id_empleado!==empleadoSeleccionado.id_empleado));
        setModalEliminar(false);
      }
    
      const abrirModalInsertar=()=>{
        setEmpleadoSeleccionado(null);
        setModalInsertar(true);
      }
    
      const insertar =()=>{
        var valorInsertar=empleadoSeleccionado;
        valorInsertar.id_empleado=data[data.length-1].id_empleado+1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
      }
    
      return (
        <div className="App">
          <h2>|CRUD| empleados</h2>
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
                <th>Contraseña</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(empleado=>(
                <tr>
                  <td>{empleado.id_empleado}</td>
                  <td>{empleado.documento}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellidos}</td>
                  <td>{empleado.celular}</td>
                  <td>{empleado.correo}</td>
                  <td>{empleado.contrasenha}</td>
                  <td>{empleado.direccion}</td>
                  <td>{empleado.ciudad}</td>
                  <td>{empleado.rol}</td>
                  <td><button className="btn btn-primary" onClick={()=>seleccionarEmpleado(empleado, 'Editar')}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>seleccionarEmpleado(empleado, 'Eliminar')}>Eliminar</button></td>
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
                  name="id_empleado"
                  value={empleadoSeleccionado && empleadoSeleccionado.id_empleado}
                />
                <br />
    
                <label>Documento</label>
                <input
                  className="form-control"
                  type='number'
                  name="documento"
                  value={empleadoSeleccionado && empleadoSeleccionado.documento}
                  onChange={handleChange}
                />
                <br />
    
                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={empleadoSeleccionado && empleadoSeleccionado.nombre}
                  onChange={handleChange}
                />
                <br />

                <label>Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="apellidos"
                  value={empleadoSeleccionado && empleadoSeleccionado.apellidos}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type='number'
                  name="celular"
                  value={empleadoSeleccionado && empleadoSeleccionado.celular}
                  onChange={handleChange}
                />
                <br />

                <label>Correo</label>
                <input
                  className="form-control"
                  type='email'
                  name="correo"
                  value={empleadoSeleccionado && empleadoSeleccionado.correo}
                  onChange={handleChange}
                />
                <br />


                <label>Contraseña</label>
                <input
                  className="form-control"
                  type='password'
                  name="contrasenha"
                  value={empleadoSeleccionado && empleadoSeleccionado.contrasenha}
                  onChange={handleChange}
                />
                <br />

                <label>Dirección</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={empleadoSeleccionado && empleadoSeleccionado.direccion}
                  onChange={handleChange}
                />
                <br />

                
                <label>Ciudad</label>
                <input
                  className="form-control"
                  type="text"
                  name="ciudad"
                  value={empleadoSeleccionado && empleadoSeleccionado.ciudad}
                  onChange={handleChange}
                />
                <br />

                <label>Rol</label>
                <input
                  className="form-control"
                  type="text"
                  name="rol"
                  value={empleadoSeleccionado && empleadoSeleccionado.rol}
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
              Estás Seguro que deseas eliminar el empleado {empleadoSeleccionado && empleadoSeleccionado.nombre}
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
                <h3>Insertar empleado</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type={Number}
                  name="id_empleado"
                  value={data[data.length-1].id_empleado+1}
                />
                <br />
    
                <label>Documento</label>
                <input
                  className="form-control"
                  type={Number}
                  name="documento"
                  value={empleadoSeleccionado ? empleadoSeleccionado.documento: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={empleadoSeleccionado ? empleadoSeleccionado.nombre: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="apellidos"
                  value={empleadoSeleccionado ? empleadoSeleccionado.apellidos: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type={Number}
                  name="celular"
                  value={empleadoSeleccionado ? empleadoSeleccionado.celular: ''}
                  onChange={handleChange}
                />
                <br />


                <label>Correo</label>
                <input
                  className="form-control"
                  type="text"
                  name="correo"
                  value={empleadoSeleccionado ? empleadoSeleccionado.correo: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Contraseña</label>
                <input
                  className="form-control"
                  type="text"
                  name="contrasenha"
                  value={empleadoSeleccionado ? empleadoSeleccionado.contrasenha: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Dirección</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={empleadoSeleccionado ? empleadoSeleccionado.direccion: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Ciudad</label>
                <input
                  className="form-control"
                  type="text"
                  name="ciudad"
                  value={empleadoSeleccionado ? empleadoSeleccionado.ciudad: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Rol</label>
                <input
                  className="form-control"
                  type="text"
                  name="rol"
                  value={empleadoSeleccionado ? empleadoSeleccionado.rol: ''}
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

export default Roles
 
