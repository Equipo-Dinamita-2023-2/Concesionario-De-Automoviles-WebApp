import axios from 'axios'

export const obtenerCliente = async () => {
    const response = await axios.get('http://localhost:8000/cliente/api/v1/cliente/');
    return response.data;
};

export const crearCliente = async (cliente) => {
        const response = await axios.post('http://localhost:8000/cliente/api/v1/cliente/', cliente);
        return response.data;
};

export const eliminarCliente = async (id) => {
        const response = await axios.delete(`http://localhost:8000/cliente/api/v1/cliente/${id}/`);
        return response.data;
    };
    
    export const actualizarCliente = async (id, cliente) => {
        const response = await axios.put(`http://localhost:8000/cliente/api/v1/cliente/${id}/`, cliente);
        return response.data;
    };
    

