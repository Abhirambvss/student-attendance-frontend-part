import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";
const NavBar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const [showLogoutButton, setShowlogoutButton] = useState(false)
    const login = localStorage.getItem('login')
    const name = localStorage.getItem('name')
    const imageUrl = localStorage.getItem('imageUrl')
    const history = useHistory();
    const Logout = () => {
        localStorage.removeItem('login')
        localStorage.removeItem('name')
        localStorage.removeItem('imageUrl')
        console.clear()
        alert("You have been logged out successfully");
        history.push("/")


    }
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                            <Link to="/profession">  Home</Link>

                        </div>

                        <div className="flex flex-row justify-between items-center" >
                            <div>
                                {login && <div>
                                    <span className="text-white">Welcome {name}</span>
                                </div>}
                            </div>

                        </div>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

                            <li className="nav-item">
                                <div
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    onClick={() => { setShowlogoutButton(!showLogoutButton) }}
                                >
                                    {login && <img height={50} width={50} className="rounded-full" src={imageUrl} alt="profilePicture" />}
                                    {/* <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Tweet</span> */}
                                </div>
                            </li>
                            <li className="nav-item">
                                <div
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                >
                                    {showLogoutButton && <GoogleLogout
                                        clientId={clientId}
                                        buttonText="Logout"
                                        onLogoutSuccess={Logout}
                                    >
                                    </GoogleLogout>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavBar
