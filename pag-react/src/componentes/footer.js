import {Link} from 'react-router-dom'
<<<<<<< HEAD
=======
import "../estilos/cabecera.css"
>>>>>>> CDAW-72-CDA2-78-CDAW84

function Footer() {
    return (
            <footer>
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Información</h3>
                    <ul>
                        <li>
                            <Link to="/pagos-envios">Métodos de pago y envíos</Link>
                        </li>
                        <li>
                            <Link to="/devoluciones">Cambios y devoluciones</Link>
                        </li>
                        <li>
                            <Link to="/preguntas">Preguntas frecuentes</Link>
                        </li>
<<<<<<< HEAD
                        <li>
                            <Link to="/promociones">Promociones</Link>
                        </li>
=======
>>>>>>> CDAW-72-CDA2-78-CDAW84
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li>
                            <Link to="/privacidad">Política de privacidad</Link>
                        </li>
                        <li>
                            <Link to="/terminos-condiciones">Términos y condiciones</Link>
                        </li>
                        <li>
                            <Link to="/mapa">Mapa</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
        
    );
}

export default Footer;
