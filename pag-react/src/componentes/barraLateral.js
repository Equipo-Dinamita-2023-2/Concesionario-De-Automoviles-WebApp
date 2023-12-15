import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const BarraLateral = ({ mostrarContenido, modo }) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    navigate('/');
  };

  return (
    <div className='sidebar'>
      <div className='perfil'>
        <div className='perfil-info'>
          <FaUserCircle className='foto-user' />
          <span>{modo === 'gerente' ? 'Gerente' : 'Tallerista'}</span>
        </div>
      </div>
      <ul>
        {modo === 'gerente' ? (
          <>
            <li>
              <button
                className='boton-barra'
                onClick={() => mostrarContenido('empleado')}
              >
                Gestionar Empleados
              </button>
            </li>
            <li>
              <button
                className='boton-barra'
                onClick={() => mostrarContenido('sucursal')}
              >
                Gestionar Sucursales
              </button>
            </li>
            <li>
              <button
                className='boton-barra'
                onClick={() => mostrarContenido('vehiculos')}
              >
                Gestionar Vehículos
              </button>
            </li>
            <li>
              <button
                className='boton-barra'
                onClick={() => mostrarContenido('repuestos')}
              >
                Gestionar Repuestos
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                className='boton-barra'
                onClick={() => mostrarContenido('cliente')}
              >
                Gestionar Clientes
              </button>
            </li>
            <li>
              <button
                className='boton-barra'
                onClick={() => mostrarContenido('reparaciones')}
              >
                Gestionar Reparaciones
              </button>
            </li>
          </>
        )}
      </ul>
      <div className='cerrar-sesion'>
        <button className='boton-barra' onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default BarraLateral;
