import emailjs from '@emailjs/browser';

export const sendEmail = (requirements) => {
    const SERVICE_ID = process.env.REACT_APP_EMAIL_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

    const templateParams = {
        to_name: requirements.name,
        time: requirements.time,
        course: requirements.course,
        reply_to: requirements.email
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        })


}
