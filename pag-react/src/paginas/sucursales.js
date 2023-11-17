
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function Sucursales() {
    
    const new_sucursales = [
        { id_sucursal: 1, ciudad: "B/quilla", direccion:"", celular:444,fijo:404,correo:"bquilla@gmai.com" },
        { id_sucursal: 2, ciudad: "Cali", direccion:"", celular:444,fijo:404,correo:"cali@gmai.com" },
        { id_sucursal: 3, ciudad: "Medellín", direccion:"", celular:444,fijo:404,correo:"Mdllin@gmai.com" },
        { id_sucursal: 4, ciudad: "Armenia", direccion:"", celular:444,fijo:404,correo:"am_nia@gmai.com" },
      ];
    
      const [data, setData] = useState(new_sucursales);
      const [modalEditar, setModalEditar] = useState(false);
      const [modalEliminar, setModalEliminar] = useState(false);
      const [modalInsertar, setModalInsertar] = useState(false);
    
      const [sucursalSeleccionado, setSucursalSeleccionado] = useState({
        id_sucursal: '',
        ciudad: '',
        direccion: '',
        celular: '',
        fijo: '',
        correo:'',
      });
    
      const seleccionarSucursal=(elemento, caso)=>{
        setSucursalSeleccionado(elemento);
    (caso==='Editar')?setModalEditar(true):setModalEliminar(true)
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setSucursalSeleccionado((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }
    
      const editar=()=>{
        var dataNueva=data;
        dataNueva.map(sucursal=>{
          if(sucursal.id_sucursal===sucursalSeleccionado.id_sucursal){
            sucursal.ciudad=sucursalSeleccionado.ciudad;
            sucursal.direccion=sucursalSeleccionado.direccion;
            sucursal.celular=sucursalSeleccionado.celular;
            sucursal.fijo=sucursalSeleccionado.fijo;
            sucursal.correo=sucursalSeleccionado.correo;
          }
        }); 

        setData(dataNueva);
        setModalEditar(false);
      }
    
      const eliminar =()=>{
        setData(data.filter(sucursal=>sucursal.id_sucursal!==sucursalSeleccionado.id_sucursal));
        setModalEliminar(false);
      }
    
      const abrirModalInsertar=()=>{
        setSucursalSeleccionado(null);
        setModalInsertar(true);
      }
    
      const insertar =()=>{
        var valorInsertar=sucursalSeleccionado;
        valorInsertar.id_sucursal=data[data.length-1].id_sucursal+1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
      }
    
      return (
        <div className="App">
          <h2>|CRUD| Sucursales</h2>
          <br />
        <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
        <br /><br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Celular</th>
                <th>Fijo</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(sucursal=>(
                <tr>
                  <td>{sucursal.id_sucursal}</td>
                  <td>{sucursal.ciudad}</td>
                  <td>{sucursal.direccion}</td>
                  <td>{sucursal.celular}</td>
                  <td>{sucursal.fijo}</td>
                  <td>{sucursal.correo}</td> 
                  <td><button className="btn btn-primary" onClick={()=>seleccionarSucursal(sucursal, 'Editar')}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>seleccionarSucursal(sucursal, 'Eliminar')}>Eliminar</button></td>
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
                  name="id_sucursal"
                  value={sucursalSeleccionado && sucursalSeleccionado.id_sucursal}
                />
                <br />
    
                <label>Ciudad</label>
                <input
                  className="form-control"
                  type='text'
                  name="ciudad"
                  value={sucursalSeleccionado && sucursalSeleccionado.ciudad}
                  onChange={handleChange}
                />
                <br />
    
                <label>Dirección</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={sucursalSeleccionado && sucursalSeleccionado.direccion}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type='number'
                  name="celular"
                  value={sucursalSeleccionado && sucursalSeleccionado.celular}
                  onChange={handleChange}
                />
                <br />

                <label>Fijo</label> 
                <input
                  className="form-control"
                  type='number'
                  name="fijo"
                  value={sucursalSeleccionado && sucursalSeleccionado.fijo}
                  onChange={handleChange}
                />
                <br />

                <label>Correo</label>
                <input
                  className="form-control"
                  type='email'
                  name="correo"
                  value={sucursalSeleccionado && sucursalSeleccionado.correo}
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
              Estás Seguro que deseas eliminar la sucursal {sucursalSeleccionado && sucursalSeleccionado.sucursal}
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
                <h3>Insertar sucursales</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID</label>
                <input
                  className="form-control"
                  readOnly
                  type='number'
                  name="id_sucursal"
                  value={data[data.length-1].id_sucursal+1}
                />
                <br />
    
                <label>Ciudad</label>
                <input
                  className="form-control"
                  type='text'
                  name="ciudad"
                  value={sucursalSeleccionado ? sucursalSeleccionado.ciudad: ''}
                  onChange={handleChange}
                />
                <br />
    
                <label>Direccion</label>
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  value={sucursalSeleccionado ? sucursalSeleccionado.direccion: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Celular</label>
                <input
                  className="form-control"
                  type='number'
                  name="celular"
                  value={sucursalSeleccionado ? sucursalSeleccionado.celular: ''}
                  onChange={handleChange}
                />
                <br />

                <label>Fijo</label>
                <input
                  className="form-control"
                  type='number'
                  name="fijo"
                  value={sucursalSeleccionado ? sucursalSeleccionado.fijo: ''}
                  onChange={handleChange}
                />
                <br />


                <label>Correo</label>
                <input
                  className="form-control"
                  type='email'
                  name="correo"
                  value={sucursalSeleccionado ? sucursalSeleccionado.correo: ''}
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

export default Sucursales
 
