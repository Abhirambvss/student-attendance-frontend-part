import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const NavBar = () => {
    const [showloginButton, setShowloginButton] = useState(true);
    const [showLogoutButton, setShowlogoutButton] = useState(false);
    const [name, setName] = useState(null);
    const [proPic, setProPic] = useState(null);

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        // localStorage.setItem('User', res.profileObj);
        setName(res.profileObj.givenName);
        setProPic(res.profileObj.imageUrl);
        setShowloginButton(false);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
    };

    return (
        <div style={{ position: 'fixed', zIndex: '100' }} className="w-full px-8 py-2 lg:px-36 lg:py-4 bg-col1 text-white border-b-2 border-col2 flex justify-between items-center">

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Link to="/about">
                    <button className=" border-2 border-col4 px-2 lg:px-4 py-1 hover:bg-col5 hover:border-col5 text-base lg:text-lg  rounded-xl transition-all duration-150 ease-in mx-8 ">My algorithms</button>
                </Link>

                {showloginButton ?
                    <GoogleLogin
                        clientId={clientId}
                        render={renderProps => (
                            <button className=" border-2 border-col4 px-2 lg:px-4 py-1 hover:bg-col5 hover:border-col5 text-base lg:text-lg  rounded-xl transition-all duration-150 ease-in" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
                        )}
                        buttonText="Sign In"
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                    : <>
                        {showLogoutButton ?
                            <GoogleLogout
                                clientId={clientId}
                                render={renderProps => (
                                    <div>
                                        <button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                                buttonText="Sign Out"
                                onLogoutSuccess={onSignoutSuccess}
                            >
                            </GoogleLogout>
                            :
                            <>
                            </>
                        }

                        <div style={{ display: 'flex' }} onClick={() => setShowlogoutButton(!showLogoutButton)}>
                            <span style={{ margin: "3px 15px 0px 0px", fontSize: "20px" }}>{name}</span>
                            <span style={{ margin: "3px 15px 0px 0px", zIndex: "10" }}>
                                <img
                                    className="dropbtn"
                                    src={proPic ? proPic : null}
                                    alt="Profile image"
                                />
                            </span>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default NavBar