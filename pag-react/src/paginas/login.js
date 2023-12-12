import '../estilos/login.css'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const captcha = useRef(null);
    const [isLoginMode, setIsLoginMode] = useState(true); // Estado para rastrear el modo actual

    const handleToggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const handleAction = () => {
        if (isLoginMode) {
            if (username === 'empleado' && password === 'empleado' && captcha.current.getValue()) {
                navigate('/inicio');
            } else if (!captcha.current.getValue()) {
                alert('Porfavor resuelta la captcha');
            } else {
                alert('Verifique el usuario y la contraseña');
            }
        } else if(username === 'cliente'){
            navigate('/progreso')
        }
    };

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('Captcha validada');
        }
    };

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
                            <div className="recaptcha">
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LeiQS8pAAAAABY4oS7SZCaTo22zrBqbcq-Idk-e"
                                    onChange={onChange}
                                />,
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