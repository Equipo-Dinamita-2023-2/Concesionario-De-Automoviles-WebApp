import axios from 'axios'

export const obtenerVehiculos = async () => {
        const response = await axios.get('http://localhost:8000/vehiculo/api/v1/vehiculo/');
        return response.data;
};