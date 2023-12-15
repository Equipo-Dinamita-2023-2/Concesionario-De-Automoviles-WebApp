import React, { useState, useEffect } from 'react';
import { IoBuild } from "react-icons/io5";
import { SiSpeedtest } from "react-icons/si";
import { AiOutlineCheck } from "react-icons/ai";
import { TbUserCheck } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";
import '../estilos/progreso.css';
import { obtenerReparaciones } from '../api/reparacion-api';

function Progreso() {
    const [etapa, setEtapa] = useState(1);
    const [estadoReparacion, setEstadoReparacion] = useState([]);

    useEffect(() => {
        async function cargarReparaciones() {
            try {
                const res = await obtenerReparaciones();
                const estado = res.map((estado) =>({
                    estado_reparacion: estado.estado_reparacion
                }))

                console.log(estado)
                setEstadoReparacion(estado);
            } catch (error) {
                console.error("Error al cargar el estado de reparación:", error);
            }
        }
        cargarReparaciones();
    }, []);
    
    useEffect(() => {
        switch (estadoReparacion) {
            case 'En proceso':
                setEtapa(1);
                break;
            case 'Pruebas':
                setEtapa(2);
                break;
            case 'Finalizado':
                setEtapa(3);
                break;
            case 'Entregado':
                setEtapa(4);
                break;
            default:
                setEtapa(1);
        }
    }, [estadoReparacion]);
    
    return (
    <>
    
    <div className="contenedor-progreso">
        <ul className='ul'>
            <li className={`li ${etapa >= 1 ? 'active' : ''}`}>
                <IoBuild className='icono-progreso' />
                <div className={`progress one ${etapa >= 1 ? 'active' : ''}`}>
                    <p>1</p>
                    <MdOutlineDone className='hecho' />
                </div>
                <p className='text-progress'>En proceso</p>
            </li>

            <li className={`li ${etapa >= 2 ? 'active' : ''}`}>
                <SiSpeedtest className='icono-progreso' />
                <div className={`progress two ${etapa >= 2 ? 'active' : ''}`}>
                    <p>2</p>
                    <MdOutlineDone className='hecho' />
                </div>
                <p className='text-progress'>Pruebas</p>
            </li>

            <li className={`li ${etapa >= 3 ? 'active' : ''}`} >
                <AiOutlineCheck className='icono-progreso' />
                <div className={`progress three ${etapa >= 3 ? 'active' : ''}`}>
                    <p>3</p>
                    <MdOutlineDone className='hecho' />
                </div>
                <p className='text-progress'>Finalizado</p>
            </li>

            <li className={`li ${etapa >= 4 ? 'active' : ''}`}>
                <TbUserCheck className='icono-progreso'></TbUserCheck>
                <div className={`progress four ${etapa === 4 ? 'active' : ''}`}>
                    <p>4</p>
                    <MdOutlineDone className='hecho' />
                </div>
                <p className='text-progress'>Entregado</p>
            </li>
      </ul>
    </div>
    </>
  );
}

export default Progreso;
