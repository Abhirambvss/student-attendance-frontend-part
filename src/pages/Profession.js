import React from 'react';
import { Link } from "react-router-dom";
import NavBar from '../components/Header'
const Profession = () => {

    return (
        <div>
            <NavBar />

            <div className="flex justify-center items-center align-items-center">
                <Link to="/student">
                    <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2" onClick={() => { console.log("hello Student") }}>Student</button>
                </Link>
                <Link to="/course">
                    <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2" onClick={() => { console.log("hello Teacher") }}>Teacher</button>
                </Link>
            </div>
        </div>
    )
}
export default Profession