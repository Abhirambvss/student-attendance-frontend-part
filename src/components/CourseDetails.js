import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../components/Header'
import { TailSpin } from 'react-loader-spinner';
import { Link } from "react-router-dom";

const CourseDetails = () => {
    const [fetchData, setFetchData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [data, setData] = useState({
        name: "",
        code: "",
    });
    const email = localStorage.getItem('email');
    const BASE_URL = 'https://student-attendance2022.herokuapp.com/course'
    useEffect(() => {
        axios.get(`${BASE_URL}/${email}`)
            .then(res => {
                // console.log(res.data);
                setFetchData(res.data.Courses)
            })

    })
    const handleOnChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    }
    const uploadCourseDetails = () => {
        const userData = {
            CourseName: data.name,
            CourseCode: data.code,
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email')
        };
        try {
            axios.post('https://student-attendance2022.herokuapp.com/course', userData).then((response) => {
                console.log(response.data);
                console.log(response.status);
            });
        } catch (error) {
            alert(error.message);
        }

        setData({
            name: "",
            code: ""
        })
    }
    const deleteCourse = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`)
            .then((response) => {
                console.log(response);
                alert(response.data.message);
            })

    }
    const displayForm = () => {
        return (<div className="flex flex-col justify-between items-center">
            <span className="text-gray-700">Name of the Course</span>
            <input type="text"
                className="mt-1 block rounded text-blue-500"
                name="name"
                placeholder="Course Name"
                value={data.name}
                onChange={handleOnChange}
            />
            <span className="text-gray-700">Course Code</span>
            <input type="text"
                className="mt-1 block rounded text-blue-500"
                name="code"
                placeholder="Course Code"
                value={data.code}
                onChange={handleOnChange}
            />
            <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={uploadCourseDetails}>Add Course</button>

        </div>)

    }
    return (<>
        <Header />
        {displayForm()}
        <hr />
        {(uploading) ?
            (<div className="flex justify-center">
                <TailSpin
                    color="#0ea5e9"
                    ariaLabel="loading-indicator" />
            </div>)
            : (<><div className="flex justify-center">
                <table className="table-fixed ">
                    <thead>
                        <tr>
                            <th className="m-2 p-2 content-evenly">Course Name</th>
                            <th className="m-2 p-2 content-evenly">Course Code</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {fetchData.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td className="m-2 p-2 content-evenly"><p>{item.CourseName}</p>
                                    </td>
                                    <td className="m-2 p-2 content-evenly"><p>{item.CourseCode}</p></td>
                                    <td className="m-2 p-2 content-evenly">
                                        <Link to={`/teacher/${item.CourseCode}`}>
                                            <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center">Add Students</button>
                                        </Link>
                                        <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={() => { deleteCourse(item._id) }}>Delete Course</button>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div></>)}

    </>
    )
}

export default CourseDetails