import axios from 'axios';

const url = 'http://localhost:8000/rol/api/v1/rol/'

export const obtenerRoles = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const crearRoles = async (rol) => {
    const response = await axios.post(url, rol);
    return response.data;
};

export const eliminarRoles = async (id) => {
    const response = await axios.delete(`http://localhost:8000/rol/api/v1/rol/${id}/`);
    return response.data;
};

export const actualizarRoles = async (id, rol) => {
    const response = await axios.put(`http://localhost:8000/rol/api/v1/rol/${id}/`, rol);
    return response.data;
};
