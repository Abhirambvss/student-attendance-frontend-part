import axios from "axios";
const baseURL = process.env.REACT_APP_FACE_API_ENDPOINT;
const subscriptionKey = process.env.REACT_APP_FACE_API_KEY
const faceAttributes = "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
const detectionModel = "detection_01";
export const faceApiForUrl = axios.create({
    // baseURL: baseURL,
    timeout: 50000,
    baseURL: "https://studentattendance.cognitiveservices.azure.com/",
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json"
    },
    params: {
        returnFaceId: true,
        // returnFaceLandmarks: false,
        // returnFaceAttributes: faceAttributes,
        detectionModel: detectionModel
    }
});
// The current API Key is calling host 'centralindia.cognitiveservices.azure.com' with custom subdomain of 'centralindia' which doesn't match the resource custom domain 'studentattendance'.
export const faceApiForUpload = axios.create({
    timeout: 50000,
    baseURL: "https://studentattendance.cognitiveservices.azure.com/",
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/octet-stream"
    },
    params: {
        returnFaceId: true,
        // returnFaceLandmarks: false,
        // returnFaceAttributes: faceAttributes,
        detectionModel: detectionModel
    }
});