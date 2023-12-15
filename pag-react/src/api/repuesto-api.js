import axios from 'axios';

const url = 'http://localhost:8000/repuesto/api/v1/repuesto/'

export const obtenerRepuesto = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const crearRepuesto = async (repuesto) => {
    const response = await axios.post(url, repuesto);
    return response.data;
};

export const eliminarRepuesto = async (id) => {
    const response = await axios.delete(`http://localhost:8000/repuesto/api/v1/repuesto/${id}/`);
    return response.data;
};

export const actualizarRepuesto = async (id, sucursal) => {
    const response = await axios.put(`http://localhost:8000/repuesto/api/v1/repuesto/${id}/`, sucursal);
    return response.data;
};
