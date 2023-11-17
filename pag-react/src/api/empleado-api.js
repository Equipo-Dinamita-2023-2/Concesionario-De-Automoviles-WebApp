import axios from 'axios'

export const obtenerEmpleados = async () => {
    const response = await axios.get('http://localhost:8000/empleado/api/v1/empleado/');
    return response.data;
};