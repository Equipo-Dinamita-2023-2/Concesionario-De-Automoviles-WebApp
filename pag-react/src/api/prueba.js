import axios from 'axios'

export const obtenerCliente = async () => {
    try {
        const response = await axios.get('http://localhost:8000/cliente/api/v1/cliente/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
};