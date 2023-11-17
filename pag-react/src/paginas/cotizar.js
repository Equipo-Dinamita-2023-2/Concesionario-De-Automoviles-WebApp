import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorConImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"

function Informacion(){
    return(
        <>
        <form className="formulario-reparar">
            <label htmlFor="id-cliente" className="label-reparar">Identificación del cliente:</label>
            <select className="seleccion">
                <option selected="selected"  className="opciones">Identificación</option>
                <option className="opciones"></option>
                <option className="opciones"></option>
                <option className="opciones"></option>
            </select>

            <label htmlFor="placa" className="label-reparar">Placa:</label>
            <select className="seleccion">
                <option selected="selected" className="opciones">Placa</option>
                <option className="opciones"></option>
                <option className="opciones"></option>
                <option className="opciones"></option>
            </select>
            
            <label htmlFor="fechaCotizacion" className="label-reparar">Fecha de Cotización:</label>
            <input type="date" id="fechaCotizacion" name="fechaCotizacion" className="input-reparar" required/>

            <label htmlFor="diasVigentes" className="label-reparar">Dias vigentes:</label>
            <input type="number" min="1" max="31" id="diasVigentes" name="diasVigentes" className="input-reparar"required/>

            <label htmlFor="id-tipoV" className="label-reparar">Identificación tipo vehiculo:</label>
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