import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import Logo from '../img/itr.png';
import { AiOutlineHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { LuPanelRightClose } from 'react-icons/lu';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { MdExitToApp } from "react-icons/md"; 
import './Navbar.css';

const Navbar = ({handleLogout }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const logout = () => {
        // Realiza la acción de logout y redirige al usuario al Login
        handleLogout();
        navigate('/');
    };



    return (
        <div className='navegacion'>
            <div className='hamburger-btn' onClick={toggleMenu}>
                {menuVisible ? <IoClose className='box-icon-btn' /> : <GiHamburgerMenu className='box-icon-btn' />}
            </div>
            <nav className={`nav ${menuVisible && 'open'}`}>
                <ul>
                    <li>
                        <Link to='/' className='logo'>
                            <img src={Logo} alt='Logo' />
                        </Link>
                    </li>
                    <li>
                        <Link to='/Inicio' className='Link-btn'>
                            <button className='btnes-nav'>
                                <AiOutlineHome className='box-icon' />
                                <span>Inicio</span>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/Menu' className='Link-btn'>
                            <button className='btnes-nav'>
                                <LuPanelRightClose className='box-icon' />
                                <span>Usuarios</span>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/Dispositivo' className='Link-btn'>
                            <button className='btnes-nav'>
                                <TbDeviceAnalytics className='box-icon' />
                                <span>Dispositivo</span>
                            </button>
                        </Link>
                    </li>
                    {/* Agrega más elementos del menú aquí */}

                    <li>
                        <Link to='/' className='Link-btn' onClick={logout}>
                            <button className='btnes-nav'>
                                <MdExitToApp className='box-icon' />
                                <span>Cerrar Sesión</span>
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
