import {Link} from 'react-router-dom'
import logo from '../imagenes/logo.png'
import '../estilos/header.css'

function Header(){
    return(
        <header id="header">
            <div>
                <img src={logo} alt='Logo' id='imagen'/>
            </div>
            <nav id="navegacion">
            <ul>
                <li><Link to="/inicio">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/reparar">Reparar</Link></li>
                <li><Link to="/cotizar">Cotizar</Link></li>
            </ul>
        </nav>
        </header>

    )
}

export default Header;
