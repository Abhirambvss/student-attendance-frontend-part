import React, { useState } from 'react'
import { faceApiForUpload, faceApiForUrl } from '../services/FaceAPI';
import axios from "axios";


const Student = () => {
    const BASE_URL = 'https://student-attendance2022.herokuapp.com/teacher'
    const [rollNumber, setRollNumber] = useState(0);
    const [file, setFile] = useState({});
    const [verified, setVerified] = useState(false);
    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }
    const handleOnChange = (e) => {
        const value = e.target.value;
        setRollNumber(value)
    };

    const findStudentDetails = async () => {
        let result;
        try {
            await axios.patch(BASE_URL, { rollNumber: rollNumber })
                .then(res => {
                    result = res.data.imageURL;
                })

        } catch (error) {
            console.log(error);
            alert(error);
        }
        return result;


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
            console.log(err.response.data);
            window.alert("An error occured");
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

        const result1 = await CheckFaceInDatabase();
        const result2 = await CheckFaceInUploadedFile();
        try {
            const response = await faceApiForUrl.post(
                `/face/v1.0/verify`,
                {
                    "faceId1": result1,
                    "faceId2": result2
                }
            );
            // setData(response.data.length);
            console.log(response.data);
            if (response.data.isIdentical) {
                setVerified(true)
            }

            // setOutputImage(true);
        }
        catch (err) {
            console.log(err.response.data);
            window.alert("An error occured");
        }
        return (
            <div>
                {(verified) ? alert('You are now verified') : alert('Your faces does not match')}
            </div>
        )
    }

    return (
        <div>
            <div>
                <span className="text-gray-700">Roll Number</span>
                <input type="text" className="mt-1 block rounded text-blue-500" onChange={handleOnChange} placeholder="Roll Number" />
                <span className="text-gray-700">Image of Student</span>
            </div>
            <div>
                <input type="file" accept="image/png,image/jpg,image/jpeg" className="mt-1 block rounded text-blue-500" onChange={handleUpload} />
                <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={OnSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default Student