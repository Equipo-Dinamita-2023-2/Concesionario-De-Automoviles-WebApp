import '../estilos/cotizacion-ejemplo.css';
import React, { useState } from 'react';
import Cabecera from '../componentes/cabecera';
import ContenedorImagen from '../componentes/contenedorImagen'
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg"
import Footer from '../componentes/footer';
import jsPDF from 'jspdf';

function BuscarAuto(){
    const [mostrarResultados, setMostrarResultados] = useState(false);

    const handleBuscarClick = () => {
        setMostrarResultados(true);
    };

    return (
        <div className="container-ejemplo">
            <div className='formulario-busqueda'>
            <input type="text" id="busqueda" placeholder="Buscar..."/>
            <button id="boton-buscar" className='buscar-ejemplo' onClick={handleBuscarClick}>Buscar</button>
            </div>
            {mostrarResultados && (
                <div id="resultados" className="hidden">
                    <label htmlFor="marca" className="label-reparar">Marca:</label>
                    <input type="text" id="marca" className="input-reparar" />

                    <label htmlFor="modelo" className="label-reparar">Modelo:</label>
                    <input type="text" id="modelo" className="input-reparar" />

                    <label htmlFor="ano" className="label-reparar">Año:</label>
                    <input type="text" id="ano" className="input-reparar" />

                    <label htmlFor="precio" className="label-reparar">Precio:</label>
                    <input type="text" id="precio" className="input-reparar" />
                </div>
            )}
        </div>
    );
}


const CotizacionGenerator = () => {
    const precioBase = 5000000;
    const seguro = 100000;
    const descuento = -50000;
    const total = precioBase + seguro + descuento;
  
    const financiamiento = {
      terminosPrestamo: '60 meses',
      tasaInteres: '3.5% EA',
      cuotaInicial: 1000000,
      cuotasMensuales: 300000
    };
  
    const impuestosTasas = {
      impuestosLocalesEstatales: 20000,
      tasasLicenciaRegistro: 500000
    };
  
    const garantiasServicios = {
      condicionesGarantia: 'en el manual',
      terminosPago: 'financiamiento mensual',
      politicasDevolucion: '30 días, sin restricciones'
    };
  
    const concesionario = {
      nombre: 'AutoShop',
      contacto: 'autoshop@gmail.com'
    };
  
    const notasAdicionales = 'Esta cotización es válida hasta el 15 de diciembre de 2023';
  
    // Función para generar el PDF
    const generarPDF = () => {
      const doc = new jsPDF();
  
      // Agregar la información al documento
      doc.text('Precio', 20, 10);
      doc.text(`Precio base: $${precioBase}`, 20, 20);
      doc.text(`Seguro: $${seguro}`, 20, 30);
      doc.text(`Descuento: $${descuento}`, 20, 40);
      doc.text(`Total: $${total}`, 20, 50);
      
      // Sección de Financiamiento
      doc.text('Financiamiento', 20, 70);
      doc.text(`Términos del préstamo: ${financiamiento.terminosPrestamo}`, 20, 80);
      doc.text(`Tasa de interés: ${financiamiento.tasaInteres}`, 20, 90);
      doc.text(`Cuota inicial: $${financiamiento.cuotaInicial}`, 20, 100);
      doc.text(`Cuotas mensuales: $${financiamiento.cuotasMensuales}`, 20, 110);
      
      // Sección de Impuestos y Tasas
      doc.text('Impuestos y Tasas', 20, 130);
      doc.text(`Impuestos locales y estatales: $${impuestosTasas.impuestosLocalesEstatales}`, 20, 140);
      doc.text(`Tasas de licencia y registro: $${impuestosTasas.tasasLicenciaRegistro}`, 20, 150);
      
      // Sección de Garantías y Servicios
      doc.text('Garantías y Servicios', 20, 170);
      doc.text(`Condiciones de la garantía: ${garantiasServicios.condicionesGarantia}`, 20, 180);
      doc.text(`Términos de pago: ${garantiasServicios.terminosPago}`, 20, 190);
      doc.text(`Políticas de devolución: ${garantiasServicios.politicasDevolucion}`, 20, 200);
      
      // Información del Concesionario
      doc.text('Información del Concesionario', 20, 220);
      doc.text(`Nombre: ${concesionario.nombre}`, 20, 230);
      doc.text(`Contacto: ${concesionario.contacto}`, 20, 240);
      
      // Notas Adicionales
      doc.text('Notas Adicionales', 20, 260);
      doc.text(notasAdicionales, 20, 270);
      
      // Guardar el documento como un archivo PDF
      doc.save('CotizacionAutomovil.pdf');
    };
  
    return (
      <div>
        {/* Otros elementos del formulario si es necesario */}
        <button onClick={generarPDF}>Generar PDF</button>
      </div>
    );
};

function Cotizacion() {
    return(
        <>
        <Cabecera/>
        <ContenedorImagen imagen={publicidad}/>
        <h1 className='titulos'>Cotizaciones</h1>
        <BuscarAuto/>
        <CotizacionGenerator/>
        <Footer/>
        </>
    );
}
export default Cotizacion;