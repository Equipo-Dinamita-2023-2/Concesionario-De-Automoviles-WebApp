import axios from 'axios';

const url = 'http://localhost:8000/cotizacion/api/v2/cotizacion/'

export const obtenerCotizacion = async () => {
    const response = await axios.get(url);
    return response.data;
};

export const crearCotizacion = async (cotizacion) => {
    const response = await axios.post(url, cotizacion);
    return response.data;
};

export const eliminarCotizacion = async (id) => {
    const response = await axios.delete(`http://localhost:8000/cotizacion/api/v1/cotizacion/${id}/`);
    return response.data;
};

export const actualizarCotizacion = async (id, cotizacion) => {
    const response = await axios.put(`http://localhost:8000/cotizacion/api/v1/cotizacion/${id}/`, cotizacion);
    return response.data;
};
