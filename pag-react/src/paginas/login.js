import '../estilos/login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
        navigate('/inicio');
    } else {
        alert('Intente de nuevo.');
    }
};

return (
    <section className='section-login'>
        <div className="contenedor-login">
            <div className="formulario">
                <form action='#'>
                <h2>Iniciar Sesión</h2>
                <div className="input-contenedor">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Usuario</label>
                </div>
                <div className="input-contenedor">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>Contraseña</label>
                </div>
                <div className="olvidar">
                        <a href="#">Olvidé la contraseña</a>
                </div>
                </form>
                <div>
                    <button className='btnLogin' onClick={handleLogin}>Acceder</button>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Login;