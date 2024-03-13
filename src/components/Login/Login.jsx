import React, { useRef, useState, useEffect } from 'react';
import './Login.css';
import Logo from '../../img/itr.png';
const URL = 'http://localhost:80/login/login.php';

const enviarDatos = async (url, data) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!resp.ok) {
            throw new Error('Error en la solicitud');
        }

        const json = await resp.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw new Error('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
    }
};

const Login = ({ onLogin }) => {
    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            // Si hay datos de sesión en localStorage, realiza la autenticación automáticamente
            onLogin(loggedInUser);
        }
    }, [onLogin]);

    const handleLogin = async () => {
        setEspera(true);
        const data = {
            usuario: emailRef.current.value,
            clave: passwordRef.current.value,
        };

        try {
            const response = await enviarDatos(URL, data);
            setError(response.error);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setEspera(false);
            if (response.conectado) {
                onLogin(data.usuario);
                // Guardar datos de sesión en localStorage
                localStorage.setItem('loggedInUser', data.usuario);
            }
        } catch (error) {
            setError('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
            setEspera(false);
        }
    };

    return (
        <div className='login'>
            <div className='row'>
                <div className='col-sm-4 offset-4 mt-5'>
                    <div className='card pt-5'>
                        <div className='card-header text-center'>
                            <img src={Logo} alt='Logo' />
                        </div>
                        <div className='card-body'>
                            <div className='input-group mb-3'>
                                <span className='input-group-text' id='basic-addon1'>
                                    📧
                                </span>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Email'
                                    aria-label='Email'
                                    aria-describedby='basic-addon1'
                                    ref={emailRef}
                                />
                            </div>

                            <div className='input-group mb-3'>
                                <span className='input-group-text' id='basic-addon2'>
                                    🔑
                                </span>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder='Contraseña'
                                    aria-label='Contraseña'
                                    aria-describedby='basic-addon2'
                                    ref={passwordRef}
                                />
                            </div>
                            {error && (
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            )}

                            <button
                                type='button'
                                className='btn btn-info btn-lg btn-block w-100 text-center text-white'
                                onClick={handleLogin}
                                disabled={espera}
                            >
                                {espera && (
                                    <span
                                        className='spinner-border spinner-border-sm mr-2'
                                        role='status'
                                        aria-hidden='true'
                                    ></span>
                                )}
                                Ingresar
                            </button>

                            <div className='card-footer text-center'>
                                <span>¿Ha olvidado su contraseña?</span>
                                <a href='/'>Haz click aquí</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
