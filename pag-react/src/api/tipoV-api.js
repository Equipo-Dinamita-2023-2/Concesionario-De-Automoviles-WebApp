import axios from 'axios';
import { version } from 'react';

const url = 'http://localhost:8000/tipovehiculo/api/v1/tipovehiculo/'

export const obtenerTipoV = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const crearTipoV = async (vehiculo) => {
    const response = await axios.post(url, vehiculo);
    return response.data;
};

export const eliminarTipoV = async (id) => {
    const response = await axios.delete(`http://localhost:8000/tipovehiculo/api/v1/tipovehiculo/${id}/`);
    return response.data;
};

export const actualizarTipoV = async (id, vehiculo) => {
    const response = await axios.put(`http://localhost:8000/tipovehiculo/api/v1/tipovehiculo/${id}/`, vehiculo);
    return response.data;
};
