# Student Attendance Web App

This project is successfully deployed and is available at :https://student-attendance2022.netlify.app/

## Project Explanation

This is a MERN stack web application made as a part of Microsoft Future Ready Talent Program.

This project will verify the attendance of the students through face verification.

The face verification of this project is done with the help of **Microsoft Azure Face API**.

This attendance verification application allows the teachers/professors to add the student details along with their photo and allows the students to upload their photo to the application for verification.

Then the faces in teacher uploaded image and student uploaded image are identified and then will be verified with each other.This identification and verification of faces is done through **Microsoft Azure Face API**.

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


At any point of time, if the user want to logout then simply click the profile picture in the header

![logout](https://user-images.githubusercontent.com/67111658/164232531-77a3a979-505b-4ac8-b195-c2df35eb7f91.PNG)

After Clicking the logout button, the user will be logged out successfully

![logout success](https://user-images.githubusercontent.com/67111658/164232721-cef8641b-2345-4376-8f06-21273822efdd.PNG)



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
