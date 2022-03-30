// import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function Login() {

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const [name, setName] = useState("");
    const [login, setLogin] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const history = useHistory();
    const responseGoogle = (response) => {
        console.log(response);
        console.log(name, imageUrl);
    }
    const loginSuccess = (response) => {
        if (response.accessToken) {
            setName(response.profileObj.name);
            setLogin(true)
            setImageUrl(response.profileObj.imageUrl)
            console.log(response.profileObj);
            localStorage.setItem('login', 1)
            localStorage.setItem('name', response.profileObj.name)
            localStorage.setItem('imageUrl', response.profileObj.imageUrl)
            history.push("/profession");


        }


    }



    return (


        <div className="mx-2 px-2 flex justify-center h-screen items-center">

            {!login && (<GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={loginSuccess}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            // className="m-auto"
            />)}


        </div>

    );
}

export default Login;
