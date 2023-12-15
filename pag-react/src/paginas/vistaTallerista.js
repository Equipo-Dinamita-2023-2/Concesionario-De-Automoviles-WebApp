import BarraLateral from '../componentes/barraLateral';
import '../estilos/gerente.css'
import { useState,useEffect } from 'react';
import GestionCliente from './gestionCliente';
import GestionReparaciones from './gestionReparaciones';

const Tallerista = () => {
    const [contenido, setContenido] = useState(null);

    const mostrarContenido = (opcion) => {
        switch (opcion) {
            case 'cliente':
                setContenido(<GestionCliente />);
                break;
            case 'reparaciones':
                setContenido(<GestionReparaciones />);
                break;
            default:
                setContenido(<GestionReparaciones/>);
        }
    };

    useEffect(() => {
        mostrarContenido('reparaciones');
    }, []);
    return (
        <div className='gerente'>
            <div className='contenido-gerente'>
                <aside id='aside'>
                    <BarraLateral mostrarContenido={mostrarContenido} modo={'tallerista'} />
                </aside>
                <section id='section'>
                    {contenido}
                </section>
            </div>
        </div>
    )
}

export default Tallerista;