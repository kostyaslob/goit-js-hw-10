import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const delay = Number(event.target.elements.delay.value);
    const selectedRadio = document.querySelector('input[name="state"]:checked');    
   
    new Promise((resolve, reject) => {
        setTimeout(() => {
            selectedRadio.value === "fulfilled" ? resolve(delay) : reject(delay);
        }, delay);
    })
    .then((delay) => {
        iziToast.show({
            title: "OK",
            titleColor: "#fff", 
            titleSize: "16px",
            titleLineHeight: "1.5",

            message: `Fulfilled promise in ${delay}ms`,
            messageColor: "#fff",
            messageSize: "16px",
            messageLineHeight: "1.5",

            backgroundColor: "#59a10d",

            progressBar: false,
            position: "topRight",

         });
    })
    .catch((delay) => {
        iziToast.show({
            title: "Error",
            titleColor: "#fff", 
            titleSize: "16px",
            titleLineHeight: "1.5",

            message: `Rejected promise in ${delay}ms`,
            messageColor: "#fff",
            messageSize: "16px",
            messageLineHeight: "1.5",

            backgroundColor: "#ef4040",

            progressBar: false,
            position: "topRight",
         });
    });
});
