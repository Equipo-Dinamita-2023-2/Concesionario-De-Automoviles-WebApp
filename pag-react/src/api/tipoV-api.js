import axios from 'axios'

export const obtenerTipoV = async () => {
        const response = await axios.get('http://localhost:8000/tipovehiculo/api/v1/tipovehiculo/');
        return response.data;
};

