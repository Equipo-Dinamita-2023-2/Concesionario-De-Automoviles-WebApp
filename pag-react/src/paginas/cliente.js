import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import GestionCliente from "./gestionCliente";
import '../estilos/general.css'


function Cliente(){

    return(
        <>
            <Cabecera/>
            <div className="contenedor-cliente">
            <GestionCliente/>
            </div>
            <Footer/>
        </>
    )
}

export default Cliente;