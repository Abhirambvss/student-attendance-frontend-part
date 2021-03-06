import React, { useRef, useEffect, useState } from 'react';
import { uploadFileToBlob, isStorageConfigured } from './blobStorage/addImageToBlob';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
const storageConfigured = isStorageConfigured();


const StudentDetails = () => {
    const { CourseCode } = useParams();
    const [fetchData, setFetchData] = useState([]);
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState({
        name: "",
        rollNumber: "",
    });
    // const [blobList, setBlobList] = useState([]);
    const ref = useRef();

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState(null);

    // current file to delete from container

    // UI/form management
    const [uploading, setUploading] = useState(false);
    // const [inputKey, setInputKey] = useState(Math.random().toString(36));
    const BASE_URL = 'https://student-attendance2022.herokuapp.com/teacher'
    useEffect(() => {
        axios.get(`${BASE_URL}/${CourseCode}`)
            .then(res => {
                setFetchData(res.data.Students)
                // console.log(res.data.Students);
            })
    })

    const onFileChange = (event) => {
        // capture file into state
        setFileSelected(event.target.files[0]);
        setFileName(event.target.files[0].name)
    };
    const handleOnChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (data && fileSelected) {
            const imageUrl = await onFileUpload();
            console.log(imageUrl);
            const imageFileUrl = 'https://abhiramstudentattendance.blob.core.windows.net/student-attendance/' + fileName
            const userData = {
                name: data.name,
                rollNumber: data.rollNumber,
                imageURL: imageFileUrl,
                CourseCode: CourseCode
            };
            try {
                axios.post(BASE_URL, userData).then((response) => {
                    console.log(response.data);
                    if (response.data.message) {
                        alert(response.data.message);
                    }
                    console.log(response.status);
                });
            } catch (error) {
                alert(error.message);
            }

            setData({
                name: "",
                rollNumber: ""
            })
            ref.current.value = "";
            setFileSelected(null);
        }
        else {
            alert("Please fill all the fields");
            window.location.reload();
        }

    }

    const onFileUpload = async () => {
        // prepare UI
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(fileSelected);
        // setImageUrl(blobsInContainer);
        // prepare UI for results

        // setBlobList(blobsInContainer);

        // reset state/form
        setFileSelected(null);
        setUploading(false);
        // setInputKey(Math.random().toString(36));
        return blobsInContainer;
    };

    const onDelete = async (imageFile) => {
        setUploading(true);
        // const blobsInContainer = await deleteFiles(imageFile);
        // setBlobList(blobsInContainer);
        setFileSelected(null);
        setUploading(false);
        // setInputKey(Math.random().toString(36));
    }

    const deleteDoc = async (id, imageUrl) => {
        if (imageUrl) {
            let temp = imageUrl.slice(imageUrl.lastIndexOf("/")).replace('/', "");
            onDelete(temp);
        }
        const url = BASE_URL
        await axios.delete(`${url}/${id}`, { data: { CourseCode: CourseCode } })
            .then((response) => {
                console.log(response);
                alert(response.data.message);
            })
    }

    // display form
    const DisplayForm = () => (

        <div
            className="flex flex-col justify-between items-center">
            <span className="text-gray-700" >Student name</span>
            <input
                type="text"
                className="mt-1 block rounded text-blue-500"
                placeholder="Student Name"
                name="name"
                value={data.name}
                onChange={handleOnChange} />

            <span className="text-gray-700">Roll Number</span>
            <input type="text"
                className="mt-1 block rounded text-blue-500"
                name="rollNumber"
                placeholder="Roll Number"
                value={data.rollNumber}
                onChange={handleOnChange} />

            <span className="text-gray-700">Image of Student</span>
            <input type="file"
                accept="image/png,image/jpg,image/jpeg"
                className="mt-1 block rounded text-blue-500"
                onChange={onFileChange}
                ref={ref} />
            <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={onSubmit}>Submit</button>
        </div>
    )

    return (
        <div>
            {DisplayForm()}
            {(storageConfigured && uploading) ?
                (<div className="flex justify-center">
                    <TailSpin
                        color="#0ea5e9"
                        ariaLabel="loading-indicator" />
                </div>)
                : (<><div className="flex justify-center">
                    <table className="table-fixed ">
                        <thead>
                            <tr>
                                <th className="m-2 p-2 content-evenly">Name</th>
                                <th className="m-2 p-2 content-evenly">ID</th>
                                <th className="m-2 p-2 content-evenly">Photo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {fetchData.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className="m-2 p-2 content-evenly"><p>{item.name}</p>
                                        </td>
                                        <td className="m-2 p-2 content-evenly"><p>{item.rollNumber}</p></td>
                                        <td className="m-2 p-2 content-evenly"> {(item.imageURL) && <img src={item.imageURL} width="100" height="100" alt="profile"></img>}</td>
                                        <td className="m-2 p-2 content-evenly"> <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center"
                                            onClick={() => {
                                                deleteDoc(item._id, item.imageURL);
                                            }}>Delete</button></td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div></>)}
            <hr />

        </div>
    );
};


export default StudentDetails;