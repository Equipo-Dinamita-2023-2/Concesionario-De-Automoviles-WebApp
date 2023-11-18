import React, { useEffect, useState } from "react";
import Cabecera from "../componentes/cabecera";
import Footer from "../componentes/footer";
import ContenedorImagen from "../componentes/contenedorImagen";
import publicidad from "../imagenes/mujer-eligiendo-automovil-sala-exposicion-automoviles.jpg";
import { crearReparacion } from "../api/reparacion-api";
import { obtenerCliente } from "../api/cliente-api";
import { obtenerVehiculos } from "../api/vehiculo-api";
import { obtenerTipoV } from "../api/tipoV-api";
import { obtenerEmpleados } from "../api/empleado-api";
import '../estilos/reparar.css'

function Reparar() {
  const [identificacionCliente, setIdentificacionCliente] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [autos, setAutos] = useState("");
  const [idVendedor, setIdVendedor] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [estadoReparacion, setEstadoReparacion] = useState("");
  const [descripcionProblema, setDescripcionProblema] = useState("");
  const [repuestos, setRepuestos] = useState("");
  
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculo] = useState([]);
  const [tipos, setTipo] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    async function cargarCliente() {
      try {
        const res = await obtenerCliente();
        setClientes(res);
      } catch (error) {
        console.error("Error al cargar cliente:", error);
      }
    }
    cargarCliente();
  }, []);

  useEffect(() => {
    async function cargarVehiculos() {
      try {
        const res = await obtenerVehiculos();
        setVehiculo(res);
      } catch (error) {
        console.error("Error al cargar vehiculos:", error);
      }
    }
    cargarVehiculos();
  }, []);

  useEffect(() => {
    async function cargarTipos() {
      try {
        const res = await obtenerTipoV();
        setTipo(res);
      } catch (error) {
        console.error("Error al cargar tipos de vehiculos:", error);
      }
    }
    cargarTipos();
  }, []);

  useEffect(() => {
    async function cargarEmpleados() {
      try {
        const res = await obtenerEmpleados();
        console.log(res);
        setEmpleados(res);
      } catch (error) {
        console.error("Error al cargar los empleados:", error);
      }
    }
    cargarEmpleados();
  }, []);

  const handleEnviarClick = async () => {
    const reparacionData = {
      identificacionCliente,
      placa,
      tipoVehiculo,
      autos,
      idVendedor,
      fechaIngreso,
      estadoReparacion,
      descripcionProblema,
      repuestos,
    };

    try {
      await crearReparacion(reparacionData);
      setIdentificacionCliente("");
      setPlaca("");
      setTipoVehiculo("");
      setAutos("");
      setIdVendedor("");
      setFechaIngreso("");
      setEstadoReparacion("");
      setDescripcionProblema("");
      setRepuestos("");
    } catch (error) {
      console.error("Error creando una orden de reparación:", error.response);
    }
  };

  return (
    <>
      <Cabecera />
      <ContenedorImagen imagen={publicidad} />
      <h1 className="titulos">Reparar</h1>
      <h2 className="subtitulos">Información del cliente</h2>
      <form className="formulario-reparar">
      <label htmlFor="cedula-reparar" className="label-reparar">
        Identificación:
      </label>
      <select
        className="seleccion"
        required
        value={identificacionCliente}
        onChange={(e) => setIdentificacionCliente(e.target.value)}
      >
          <option className="opciones" disabled>Selecciona una identificación</option>
            {clientes.map((cliente, index) => (
            <option className="opciones" key={index} value={cliente.nombres}>{`${cliente.documento} - ${cliente.nombres}`}</option>
            ))}
      </select>

      <label htmlFor="placa" className="label-reparar">
        Tipo de vehiculo:
      </label>
      <select
        className="seleccion"
        required
        value={autos}
        onChange={(e) => setAutos(e.target.value)}
      >
          <option className="opciones" disabled>Selecciona un tipo de vehiculo</option>
            {tipos.map((tipo, index) => (
            <option className="opciones" key={index} value={tipo.marca}>{`${tipo.marca} - ${tipo.modelo}`}</option>
            ))}
      </select>

      <label htmlFor="tipoVehiculo" className="label-reparar">
        Placa:
      </label>
      <select
        className="seleccion"
        required
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
      >
          <option className="opciones" disabled>Selecciona una placa</option>
            {vehiculos.map((vehiculo, index) => (
            <option className="opciones" key={index} value={vehiculo.placa}>{vehiculo.placa}</option>
            ))}
      </select>
      </form>


      
      <h2 className="subtitulos">Información del vendedor</h2>
      <form className="formulario-reparar">
  <label htmlFor="id-vendedor" className="label-reparar">
    Identificación:
  </label>
  <select
    className="seleccion"
    required
    value={idVendedor}
    onChange={(e) => setIdVendedor(e.target.value)}
  >
    <option className="opciones" disabled>
      Seleccione un tipo de vehiculo
    </option>
    {empleados.map((empleado, index) => (
      <option
        className="opciones"
        key={index}
        value={empleado.nombre}
      >{`${empleado.documento} - ${empleado.nombres}`}</option>
    ))}
  </select>
</form>
      

      <h2 className="subtitulos">Detalles del ingreso</h2>
      <form className="formulario-reparar">
        <label htmlFor="fechaIngreso-reparar" className="label-reparar">
          Fecha de Ingreso:
        </label>
        <input
          type="date"
          id="fechaIngreso-reparar"
          name="fechaIngreso-reparar"
          className="input-reparar"
          required
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
        />

        <label htmlFor="estadoReparacion-reparar" className="label-reparar">
          Estado de reparación:
        </label>
        <input
          type="text"
          id="estadoReparacion"
          name="estadoReparacion"
          className="input-reparar"
          required
          value={estadoReparacion}
          onChange={(e) => setEstadoReparacion(e.target.value)}
        />

        <label htmlFor="descripcionProblema" className="label-reparar">
          Descripción del Problema:
        </label>
        <textarea
          id="descripcionProblema"
          name="descripcionProblema"
          rows="4"
          className="input-reparar"
          required
          value={descripcionProblema}
          onChange={(e) => setDescripcionProblema(e.target.value)}
        ></textarea>

        <label htmlFor="repuestos-reparar" className="label-reparar">
          Repuestos:
        </label>
        <textarea
          id="repuestos"
          name="repuestos"
          rows="4"
          className="input-reparar"
          required
          value={repuestos}
          onChange={(e) => setRepuestos(e.target.value)}
        ></textarea>
      </form>

      <div id="boton-reparar">
        <button className="cta" onClick={handleEnviarClick}>
          <span className="hover-underline-animation">Enviar</span>
          <svg
            viewBox="0 0 46 16"
            height="10"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
            id="arrow-horizontal"
          >
            <path
              transform="translate(30)"
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              data-name="Path 10"
              id="Path_10"
            ></path>
          </svg>
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Reparar;
