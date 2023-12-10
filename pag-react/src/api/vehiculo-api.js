import axios from 'axios'

const url = 'http://localhost:8000/vehiculo/api/v1/vehiculo/'

export const obtenerVehiculos = async () => {
        const response = await axios.get(url);
        return response.data;
};

export const crearVehiculo = async (vehiculo) => {
        const response = await axios.post(url, vehiculo);
        return response.data;
};

export const eliminarVehiculo = async (id) => {
        const response = await axios.delete(`http://localhost:8000/vehiculo/api/v1/vehiculo/${id}/`);
        return response.data;
};

export const actualizarVehiculo = async (id, vehiculo) => {
        const response = await axios.put(`http://localhost:8000/vehiculo/api/v1/vehiculo/${id}/`, vehiculo);
        return response.data;
};
