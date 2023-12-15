import axios from 'axios';

const url = 'http://localhost:8000/empleado/api/v1/empleado/'

export const obtenerEmpleados = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const crearEmpleado = async (empleado) => {
    const response = await axios.post(url, empleado);
    return response.data;
};

export const eliminarEmpleado = async (id) => {
    const response = await axios.delete(`http://localhost:8000/empleado/api/v1/empleado/${id}/`);
    return response.data;
};

export const actualizarEmpleado = async (id, empleado) => {
    const response = await axios.put(`http://localhost:8000/empleado/api/v1/empleado/${id}/`, empleado);
    return response.data;
};
