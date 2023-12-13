// BarraLateral.js
import React from 'react';

const BarraLateral = ({ mostrarContenido }) => {
  return (
    <div className='sidebar'>
      <div className='perfil'>
        {/* Aquí puedes agregar el icono y el nombre de usuario */}
        <div className='perfil-info'>
          
          <span>Nombre de Usuario</span>
        </div>
      </div>
      <ul>
        <li>
          <button className='boton-barra' onClick={() => mostrarContenido('empleado')}>Gestión empleados</button>
        </li>
        <li>
          <button className='boton-barra' onClick={() => mostrarContenido('sucursal')}>Gestión sucursal</button>
        </li>
        <li>
          <button className='boton-barra' onClick={() => mostrarContenido('vehiculos')}>Gestión vehiculos</button>
        </li>
        <li>
          <button className='boton-barra' onClick={() => mostrarContenido('repuestos')}>Gestión repuestos</button>
        </li>
      </ul>
      <div className='cerrar-sesion'>
        {/* Aquí puedes agregar el botón de cerrar sesión */}
        <button className='boton-barra'>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default BarraLateral;
