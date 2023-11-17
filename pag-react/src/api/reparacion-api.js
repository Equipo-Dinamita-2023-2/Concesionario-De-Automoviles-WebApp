import axios from 'axios'

export const obtenerReparaciones = async () => {
        const response = await axios.get('http://localhost:8000/reparacion/api/v1/reparacion/');
        return response.data;
};

export const crearReparacion = async (reparacion) => {
        const response = await axios.post('http://localhost:8000/reparacion/api/v1/reparacion/', reparacion);
        return response.data;

};

export const eliminarReparacion = async () => {
        const response = await axios.delete('http://localhost:8000/reparacion/api/v1/reparacion/');
        return response.data;
};

export const actualizarReparacion = async () => {
        const response = await axios.put('http://localhost:8000/reparacion/api/v1/reparacion/');
        return response.data;
};

