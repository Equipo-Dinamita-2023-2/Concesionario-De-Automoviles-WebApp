import axios from 'axios';

const url = 'http://localhost:8000/sucursal/api/v1/sucursal/'

export const obtenerSucursal = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const crearSucursal = async (sucursal) => {
    const response = await axios.post(url, sucursal);
    return response.data;
};

export const eliminarSucursal = async (id) => {
    const response = await axios.delete(`http://localhost:8000/sucursal/api/v1/sucursal/${id}/`);
    return response.data;
};

export const actualizarSucursal = async (id, sucursal) => {
    const response = await axios.put(`http://localhost:8000/sucursal/api/v1/sucursal/${id}/`, sucursal);
    return response.data;
};
