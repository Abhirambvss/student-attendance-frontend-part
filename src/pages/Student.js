import React, { useState, useEffect } from 'react'
import { faceApiForUpload, faceApiForUrl } from '../services/FaceAPI';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
import Header from '../components/Header'
import { sendEmail } from '../components/sendEmail';

const Student = () => {
    const BASE_URL = 'https://student-attendance2022.herokuapp.com/teacher'
    const [rollNumber, setRollNumber] = useState(0);
    const [CourseCode, setCourseCode] = useState("");
    const [file, setFile] = useState({});
    const [uploading, setUploading] = useState(false);
    const [fetchData, setFetchData] = useState([]);
    const [attendance, setAttendance] = useState(false);
    const date1 = new Date().toDateString();
    const date2 = new Date().toLocaleTimeString();
    const date = date1.concat(', ', date2);
    // const [verified, setVerified] = useState(false);
    const email = localStorage.getItem('email')
    useEffect(() => {
        axios.get(`https://student-attendance2022.herokuapp.com/student/${email}`)
            .then(res => {
                // console.log(res.data);
                const result = res.data;
                setFetchData(result)
            })
    })

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }
    const handleOnChange = (e) => {
        const value = e.target.value;
        setRollNumber(value)
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setCourseCode(value);
    }

    const findStudentDetails = async () => {
        let result;
        if (CourseCode && rollNumber && file) {
            try {
                await axios.patch('https://student-attendance2022.herokuapp.com/teacher', {
                    rollNumber: rollNumber,
                    CourseCode: CourseCode
                })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.message) {
                            alert(res.data.message);
                            window.location.reload();
                        }

                        result = res.data.imageURL;
                    })

            } catch (error) {
                console.log(error);
                alert(error);
            }
            return result;
        }
        else {
            alert('Please fill all the details');
            window.location.reload();
        }


    }
    const CheckFaceInDatabase = async () => {
        const results = await findStudentDetails();
        let result;
        try {
            const response = await faceApiForUrl.post(
                `/face/v1.0/detect`,
                { "url": results }
            );
            // setData(response.data.length);
            // console.log(response.data);
            // console.log(response.data[0].faceId);
            result = response.data[0].faceId;

            // setOutputImage(true);
        }
        catch (err) {
            // console.log(err.response);
            window.alert("An error occured.Please try again");
        }
        return result;
    }

    const CheckFaceInUploadedFile = async () => {
        let result;
        try {
            const response = await faceApiForUpload.post(
                `/face/v1.0/detect`,
                file
            );
            // setData(response.data.length);
            // console.log(response.data);
            // console.log(response.data[0].faceId);
            result = response.data[0].faceId;
            // setOutputImage(true);
        }
        catch (err) {
            console.log(err.response.data);
            window.alert("An error occured");
        }
        return result;
    }
    const OnSubmit = async () => {
        console.log(date);
        setUploading(true);
        const result1 = await CheckFaceInDatabase();
        const result2 = await CheckFaceInUploadedFile();
        let response1;
        try {
            const response = await faceApiForUrl.post(
                `/face/v1.0/verify`,
                {
                    "faceId1": result1,
                    "faceId2": result2
                }
            );
            response1 = response;
            if (response.data.isIdentical) {
                const emailRequirements = {
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                    time: date,
                    course: CourseCode
                }
                sendEmail(emailRequirements);
                await axios.post('https://student-attendance2022.herokuapp.com/student',
                    {
                        name: localStorage.getItem('name'),
                        email: localStorage.getItem('email'),
                        attendanceTimeAndDate: date,
                        CourseCode: CourseCode
                    })
                    .then(res => {
                        console.log(res.data);
                    })
            }
            // console.log(response1.data);
            setUploading(false);
        }
        catch (err) {
            // console.log(err);
            window.alert("An error occured.Please try again");
            window.location.reload();
        }
        return (
            <div>
                {(response1.data.isIdentical) ? alert('Your are now verified and your attendance is marked ') : alert('Your faces does not match')}
            </div>
        )
    }


    return (<>
        <Header className="flex flex-col" />
        <div>
            {(uploading) ? (<div className="flex justify-center">
                <TailSpin
                    color="#0ea5e9"
                    ariaLabel="loading-indicator" />
            </div>
            ) :
                (<><div className="p-2">
                    <span className="text-gray-700">Course Code</span>
                    <input type="text" className="mt-1 block rounded text-blue-500" onChange={handleChange} placeholder="Course Code" />
                    <span className="text-gray-700">Roll Number</span>
                    <input type="text" className="mt-1 block rounded text-blue-500" onChange={handleOnChange} placeholder="Roll Number" />
                    <span className="text-gray-700">Image of Student</span>
                    <input type="file" accept="image/png,image/jpg,image/jpeg" className="mt-1 block rounded text-blue-500" onChange={handleUpload} />
                    <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={OnSubmit}>Submit</button>
                    <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={() => { setAttendance(true) }}>Attendance Till Date</button>
                </div>
                </>)}
            {attendance && <div className="flex justify-center">
                <table className="table-fixed ">
                    <thead>
                        <tr>
                            <th className="m-2 p-2 content-evenly">Name</th>
                            <th className="m-2 p-2 content-evenly">Email</th>
                            <th className="m-2 p-2 content-evenly">Course</th>
                            <th className="m-2 p-2 content-evenly">Timestamp</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            fetchData && fetchData.attendanceDetails.reverse().map((arrayItem, index) => {
                                return (<>
                                    <tr key={index}>
                                        <td className="m-2 p-2 content-evenly"><p>{fetchData.name}</p>
                                        </td>
                                        <td className="m-2 p-2 content-evenly"><p>{fetchData.email}</p></td>
                                        <td className="m-2 p-2 content-evenly"><p>{arrayItem.Course}</p></td>
                                        <td className="m-2 p-2 content-evenly"><p>{arrayItem.Time}</p></td>
                                    </tr>
                                </>

                                )

                            })


                        }
                    </tbody>
                </table>
            </div>
            }

        </div>
    </>
    )
}
export default Student