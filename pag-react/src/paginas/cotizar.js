import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorConImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"

function Informacion(){
    return(
        <>
        <form className="formulario-reparar">
            <label htmlFor="id-cliente" className="label-reparar">Identificación del cliente:</label>
            <input type="text" id="id-cliente" name="id-cliente" className="input-reparar"required/>

            <label htmlFor="placa" className="label-reparar">Placa:</label>
            <input type="text" id="placa" name="placa" className="input-reparar"required/>
            
            <label htmlFor="fechaCotizacion" className="label-reparar">Fecha de Cotización:</label>
            <input type="date" id="fechaCotizacion" name="fechaCotizacion" className="input-reparar" required/>

            <label htmlFor="diasVigentes" className="label-reparar">Identificación del cliente:</label>
            <input type="number" id="diasVigentes" name="diasVigentes" className="input-reparar"required/>

            <label htmlFor="id-tipoV" className="label-reparar">Identificación del cliente:</label>
            <input type="text" id="id-tipoV" name="id-tipoV" className="input-reparar"required/>

            <label htmlFor="descripcionCotizacion" className="label-reparar">Descripción de la cotización:</label>
            <textarea id="descripcionCotizacion" name="descripcionCotizacion" rows="4" className="input-reparar" required></textarea>

            <div id="boton-reparar">
                <button className="cta">
                    <span className="hover-underline-animation"> Enviar </span>
                    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
                </button>
            </div>
        </form>
        </>

    );
}

function Cotizar(){
    
    return(
        <div>
            <Cabecera/>
            <ContenedorConImagen imagen={publicidad}/>
            <h1 className="titulos">Cotizar</h1>
            <Informacion/>
            <Footer/>
        </div>
        
    )
}

export default Cotizar;