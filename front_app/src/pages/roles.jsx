// Archivo: NuevoFormulario.js

import React, { useState, useEffect } from 'react';
import '../styles/formulario.css';  // Cambia el nombre del archivo CSS aquí

const initialState = {
  documento: '',
  nombres: '',
  apellidos: '',
  celular: '',
  correo: '',
  contraseña: '',
  dirección: '',
  ciudad: '',
  ocupacion: ''
};

const NuevoFormulario = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFieldErrors(errors);
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setFormData(initialState);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateField = (fieldName, value) => {
    let fieldError = '';

    if (fieldName === 'documento' || fieldName === 'celular') {
      if (!/^\d+$/.test(value)) {
        fieldError = `El campo ${fieldName} solo debe contener números.`;
      }
    }

    if (fieldName === 'correo') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        fieldError = 'El formato del correo electrónico es inválido.';
      }
    }

    return fieldError;
  };

  const validateForm = () => {
    const errors = {};

    if (!/^\d+$/.test(formData.documento)) {
      errors.documento = 'El campo documento solo debe contener números.';
    }

    if (!/^\d+$/.test(formData.celular)) {
      errors.celular = 'El campo celular solo debe contener números.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errors.correo = 'El formato del correo electrónico es inválido.';
    }

    return errors;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="seccion-rol">
    <div className="nuevo-contenedor">
      <form className="nuevo-formulario" onSubmit={handleSubmit}>
        {Object.keys(initialState).map((fieldName) => (
          <div className="nuevo-campo" key={fieldName}>
            <label className="nueva-etiqueta" htmlFor={fieldName}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            </label>
            <input
              className={`nuevo-input ${fieldName !== 'contraseña' ? 'nuevo-input' : ''}`}
              type={fieldName === 'contraseña' ? 'password' : 'text'}
              id={fieldName}
              name={fieldName}
              value={formData[fieldName]}
              onChange={handleChange}
            />
            {fieldErrors[fieldName] && isModalOpen && (
              <div className="nueva-ventana-emergente animacion" onClick={closeModal}>
                {fieldErrors[fieldName]}
              </div>
            )}
          </div>
        ))}

        {isModalOpen && (
          <div className="nuevo-modal" onClick={closeModal}>
            <div className="nueva-ventana-emergente animacion">
              {Object.keys(fieldErrors).map((fieldName) => (
                fieldErrors[fieldName] && (
                  <div key={fieldName}>
                    {fieldErrors[fieldName]}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        <div className="nuevo-campo">
          <label className="nueva-etiqueta" htmlFor="ocupacion">
            Ocupación:
          </label>
          <select
            className="nuevo-select"
            id="ocupacion"
            name="ocupacion"
            value={formData.ocupacion}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="vendedor">Vendedor</option>
            <option value="programador">Programador</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>

        <button className="nuevo-boton" type="submit">
          Enviar
        </button>
      </form>
    </div>
    </section>
  );

};

export default NuevoFormulario;
