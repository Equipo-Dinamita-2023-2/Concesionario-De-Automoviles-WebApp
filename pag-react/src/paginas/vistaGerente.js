import BarraLateral from '../componentes/barraLateral';
import '../estilos/gerente.css'
import { useState, useEffect } from 'react';
import GestionEmpleado from './gestionEmpleado';
import GestionRepuesto from './gestionRepuestos';
import GestionSucursal from './gestionSucursal';
import GestionVehiculo from './gestionarVehiculo';

const Gerente = () => {
    const [contenido, setContenido] = useState(null);

    const mostrarContenido = (opcion) => {
        switch (opcion) {
            case 'empleado':
                setContenido(<GestionEmpleado />);
                break;
            case 'sucursal':
                setContenido(<GestionSucursal />);
                break;
            case 'vehiculos':
                setContenido(<GestionVehiculo />);
                break;
            case 'repuestos':
                setContenido(<GestionRepuesto />);
                break;
            default:
                setContenido(<GestionEmpleado />);
        }
    };

    useEffect(() => {
        mostrarContenido('empleado');
    }, []);

    return (
        <div className='gerente'>
            <div className='contenido-gerente'>
                <aside id='aside'>
                    <BarraLateral mostrarContenido={mostrarContenido} modo={'gerente'} />
                </aside>
                <section id='section'>
                    {contenido}
                </section>
            </div>
        </div>
    );
}

export default Gerente;