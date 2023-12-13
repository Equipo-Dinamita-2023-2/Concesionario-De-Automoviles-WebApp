import '../estilos/login.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpleados } from '../api/empleado-api'
import { obtenerReparaciones } from '../api/reparacion-api';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true); // Estado para rastrear el modo actual
    const [credenciales, setCredenciales] = useState([]);
    const [codigos, setCodigos] = useState([]);
    const handleToggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

const handleAction = () => {
    if (isLoginMode) {
        const empleadoValido = credenciales.some(
            (credencial) =>
                credencial.correo === username &&
                credencial.contrasenha === password &&
                credencial.id_rol === 1
        );

        const gerenteValido = credenciales.some(
            (credencial) =>
                credencial.correo === username &&
                credencial.contrasenha === password &&
                credencial.id_rol === 3
        );
        
        const talleristaValido = credenciales.some(
            (credencial) =>
                credencial.correo === username &&
                credencial.contrasenha === password &&
                credencial.id_rol === 2
        );  

        if (empleadoValido) {
            navigate('/inicio');
        } else if (gerenteValido) {
            navigate('/gerente');
        } else if(talleristaValido){
            navigate('/tallerista')
        }else {
            alert('Intente de nuevo.');
        }


    } else {

        const codigoClienteValido = codigos.some(
            (codigo) =>
                codigo.cod_cliente === username
        );

        if (codigoClienteValido) {
            navigate('/progreso');
        } else {
            alert('Intente de nuevo.');
        }
    }
    };

    useEffect(() => {
        async function cargarEmpleado() {
            try {
                const empleados = await obtenerEmpleados();
                console.log(empleados);
                const credencialesEmpleado = empleados.map((empleado) => ({
                    correo: empleado.correo,
                    contrasenha: empleado.contrasenha,
                    id_rol: empleado.id_rol
                }));
                setCredenciales(credencialesEmpleado);
                console.log(credenciales);
            } catch (error) {
                console.error("Error al cargar empleado:", error);
            }
        }
        cargarEmpleado();
    }, [credenciales]);

    useEffect(() => {
        async function cargarCodigo() {
            try {
                const reparacion = await obtenerReparaciones();
                console.log(reparacion);
                const codigoCliente = reparacion.map((cliente) => ({
                    cod_cliente: cliente.cod_cliente
                }));
                setCodigos(codigoCliente);
                console.log(codigos);
            } catch (error) {
                console.error("Error al cargar cliente:", error);
            }
        }
        cargarCodigo();
    }, [codigos]);
    
    return (
        <section className='section-login'>
            <div className="contenedor-login">
                <div className="formulario">
                    <form action='#'>
                        <h2>{isLoginMode ? 'Iniciar Sesión' : 'Ingresar'}</h2>
                        <div className="input-contenedor">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label>{isLoginMode ? 'Usuario' : 'Código'}</label>
                        </div>
                        {isLoginMode && (
                            <div className="input-contenedor">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label>Contraseña</label>
                            </div>
                        )}
                        {isLoginMode && (
                            <div className="olvidar">
                                <a href="#">Olvidé la contraseña</a>
                            </div>
                        )}
                    </form>
                    <div>
                        <button className='btnLogin' onClick={handleAction}>
                            {isLoginMode ? 'Iniciar sesión' : 'Acceder'}
                        </button>
                    </div>
                    <div>
                        <p onClick={handleToggleMode} className="toggle-mode">
                            {isLoginMode ? 'Soy cliente' : 'Soy empleado'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;