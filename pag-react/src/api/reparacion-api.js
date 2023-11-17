import axios from 'axios'

export const obtenerReparaciones = async () => {
    try {
        const response = await axios.get('http://localhost:8000/reparacion/api/v1/reparacion/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las ordenes de reparación:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
};