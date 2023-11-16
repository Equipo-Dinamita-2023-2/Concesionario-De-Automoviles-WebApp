import '../estilos/cabecera.css'
import {Link} from 'react-router-dom'
import logo from '../imagenes/logo.png'
import {FaRegUser} from 'react-icons/fa'
import {BiMenu} from "react-icons/bi"
import { useEffect} from 'react'


function Cabecera(){
    function accion() {
        let menu = document.querySelector('#menu-icon');
        let navbar = document.querySelector('.navbar');
    
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('open');
        }
    }
    useEffect(() => {
        accion();
    }, []);

    
    return(
        <header className='cabecera'>
            <div className='logoCabecera'>
                <img src={logo} alt='Logo' id='imagen'/>
            </div>
            <ul className='navbar'>
                <li><Link to="/inicio" className='active'>Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/reparar">Reparar</Link></li>
                <li><Link to="/cotizar">Cotizar</Link></li>
            </ul>

            <div className='main'>
                <Link to="#" className='user'><FaRegUser className='ri-user-fill'/>Perfil</Link>
                <Link to="#">Cerrar sesión</Link>
                <div id='menu-icon'><BiMenu/></div>
            </div>
        </header>
    )
}

export default Cabecera;