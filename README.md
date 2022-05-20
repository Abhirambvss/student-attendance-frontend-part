# Student Attendance Web App

This project is successfully deployed and is available at : https://student-attendance2022.netlify.app/

The codebase for the backend part of this project can be accessed here : https://github.com/Abhirambvss/student-attendance-backend

## Project Explanation

This is a MERN stack web application made as a part of IT413 NoSQL databases.

This project will verify the attendance of the students through face verification.

The face verification of this project is done with the help of **Microsoft Azure Face API**.

This attendance verification application allows the teachers/professors to add the student details along with their photo and allows the students to upload their photo to the application for verification.

Then the faces in teacher uploaded image and student uploaded image are identified and then will be verified with each other.This identification and verification of faces is done through **Microsoft Azure Face API**.

The images uploaded by the teacher are uploaded to **Azure Blob Storage**

## The flow of the application is explained below through detailed screenshots 

### The Login Page

Teachers or Students anyone who want to use the application must sign in using the Google Account as shown to proceed further

![login](https://user-images.githubusercontent.com/67111658/164230897-2f9c4cb4-b338-4481-b54c-61ebbb5d9f14.PNG)

### Home Page

After Signing in, the interface will look like this.Here Teachers or Students should select their respective option to proceed further

![homepage](https://user-images.githubusercontent.com/67111658/164232187-109d61f6-1dd3-498c-8931-4ab09cb37a2a.PNG)

### Teacher Page

After clicking the teacher option, the user will be navigated to the teacher page

![teacher page](https://user-images.githubusercontent.com/67111658/164233598-d67b9459-c42a-4ba5-a70d-7b42dde070a9.PNG)

Now, the teacher can fill the details of students and submit them to store the student details to our database

![Teacher filling](https://user-images.githubusercontent.com/67111658/164234010-0afbb633-5828-4a88-9717-3956d571d8dc.PNG)

On Submitting, the details will be stored to the database and will be displayed to the teacher as shown

![teacher submitted](https://user-images.githubusercontent.com/67111658/164234316-9c191633-b75c-4f98-b8b0-fc57b9f5e936.PNG)

If the teacher want to delete the student details then simply by clicking the delete button the details will be deleted

![teacher page](https://user-images.githubusercontent.com/67111658/164233598-d67b9459-c42a-4ba5-a70d-7b42dde070a9.PNG)

### Student Page

The student page looks as shown below

![Student page](https://user-images.githubusercontent.com/67111658/164235008-71c00060-29b4-4c71-8479-eca85681a4aa.PNG)

Now, the student can verify their attendance by entering their roll number and uploading a photo as shown

![student filled](https://user-images.githubusercontent.com/67111658/164236285-bbdf2997-c493-4d71-85ab-2b6ec25ad0b9.PNG)

After clicking the submit button, the student photo will be matched and verified internally with the teacher uploaded photo for that particular ID/Roll Number

If the face matches, then the student will get a alert as shown 

![student verified](https://user-images.githubusercontent.com/67111658/164236988-27052646-e1a6-4e23-858d-ed19773b7427.PNG)

If the student face id not matched, then the student will get an alert as shown

![student not matched](https://user-images.githubusercontent.com/67111658/164237305-421b2e8f-c481-427f-b503-117f053a1327.PNG)

At any point of time, if the user want to logout then simply click the profile picture in the header

![logout](https://user-images.githubusercontent.com/67111658/164232531-77a3a979-505b-4ac8-b195-c2df35eb7f91.PNG)

After Clicking the logout button, the user will be logged out successfully

![logout success](https://user-images.githubusercontent.com/67111658/164232721-cef8641b-2345-4376-8f06-21273822efdd.PNG)

### Deployment

The front end part of this project is hosted using **Netlify**

The back end part of this project is deployed using **Heroku**
