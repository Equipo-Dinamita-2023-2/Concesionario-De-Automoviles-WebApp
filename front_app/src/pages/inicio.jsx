import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer';
import empresarios from '../images/empresarios.jpg';
import taller from '../images/taller.jpg';
import reparacion from '../images/reparacion-auto.jpg';
import repuestos from '../images/repuestos-carro.jpg';
import asesor from '../images/asesor-auto.jpg';
import calidad from '../images/carro-calidad.jpg';
import '../styles/inicio.css'

function ImagenesFondo(){
    return(
        <div className="contenedor">
            <div className="parte-izquierda">
                <div className="texto">
                    <h1>Una sola parada para satisfacer todas tus necesidades de transporte</h1>
                </div>
            </div>
            <div className="parte-derecha"></div>
        </div>
    );
}

function Acerca(){
    return(
        <>
        <h1 className="titulos">Sobre nosotros</h1>
        <section className="hero-section">
        <div className="container-about">
            <div className="text-content" id='texto-somos'>
                <h3>¿Quienes somos?</h3>
                <p>Autoshop es una empresa que ha dejado su huella en el mundo automovilístico desde sus modestos inicios hasta convertirse en un referente en la venta y reparación de automóviles. 
                    Fundada en 2023 por cinco entusiastas del mundo automotor: Juan Loaiza, Estiven Martinez, Sebastián Muñoz, Julián Rendón y Yissy Posso. Autoshop nació como una pequeña tienda de repuestos y un taller de reparación 
                    en la ciudad de Cali.</p>
            </div>
            <img className="hero-image" id='image-empresarios' alt="hero" src={empresarios}/>
        </div>
        </section>

        <section class="hero-section">
        <div class="container-about">
            <img class="hero-image" id='image-taller' alt="hero" src={taller}/>
            <div class="text-content" id='texto-mision'>
                <h3>Nuestra misión</h3>
                <p>Nuestra misión es ofrecer vehículos de alta calidad y un servicio excepcional a nuestros clientes. 
                Adicionalmente, satisfacer las necesidades de movilidad de nuestros clientes, ofreciendo una amplia gama de vehículos nuevos y 
                usados de alta calidad que se adapten a sus preferencias y presupuestos.</p>

            </div>
        </div>
    </section>
        
    </>
    )
}

function Servicios(){
    return(
    <div id="servicios">
    <h1 className="titulos">Servicios</h1>
    <div className="container">
        <div className="box">
            <h2>Venta de autos</h2>
            <p>Encontrará una amplia variedad de automóviles nuevos y usados, cada uno seleccionado minuciosamente para asegurarse de que cumple con los estándares más exigentes de calidad.</p>
        </div>
        <div className="box"><img src={reparacion} alt="" className="imagenes-servicios"/></div>
        <div className="box">
            <h2>Asesoramiento</h2>
            <p>Comprendemos que la elección de un vehículo puede ser abrumadora, por lo que estamos aquí para brindarle orientación experta. </p>
        </div>
        <div className="box"><img src={repuestos} alt="" className="imagenes-servicios"/></div>
        <div className="box"><img src={calidad} alt="" className="imagenes-servicios"/></div>
        <div className="box">
            <h2>Reparación de autos</h2>
            <p>Cuidamos de su vehículo con un equipo de expertos altamente calificados y dedicados a garantizar que su automóvil se mantenga en óptimas condiciones. </p>
        </div>
        <div className="box"><img src={asesor} alt="" className="imagenes-servicios"/></div>
        <div className="box">
            <h2>Venta de repuestos</h2>
            <p>Además de la venta de autos, también ofrecemos una variedad de piezas y accesorios originales para su vehículo.</p>
        </div>
    </div>
    </div>   
);
}

function Contacto(){
    return(
        <div id="contactos">
            <h1 className="titulos">Contactos</h1>
            <div className="contenedor-contactos">
                <div className="direccion">
                    <h2>Dirección</h2>
                    <p>123 Calle principal, Cali, Colombia</p>
                </div>
                <div className="telefono">
                    <h2>Teléfonos</h2>
                    <p>+1-123-456-7890</p>
                    <p>+1-123-456-7890</p>
                    <p>+1-123-456-7890</p>
                </div>
                <div className="correo">
                    <h2>Correo electrónico</h2>
                    <p>info@autoshop.com</p>
                    <p>admin@autoshop.com</p>
                    <p>gerente@autoshop.com</p>
                </div>
            </div>
        </div>
    );
}

function Main(){
    return(
    <main>
        <Acerca />
        <Servicios/>
        <Contacto/>
    </main>
    );
}

export default function Inicio() {
    return (
        <>
            <Header />
            <ImagenesFondo/>
            <Main/>
            <Footer/>
        </>
    );
}