import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import okIcon from "../img/ok-icon.svg";
import warningIcon from "../img/warning-icon.svg";
import cautionIcon from "../img/caution-icon.svg";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const delay = Number(event.target.elements.delay.value);
    const selectedRadio = document.querySelector('input[name="state"]:checked');

    if (!delay || isNaN(delay) || delay <= 0) {
        iziToast.show({
            title: "Caution",
            titleColor: "#fff", 
            titleSize: "16px",
            titleLineHeight: "1.5",

            message: `Not valid data`,
            messageColor: "#fff",
            messageSize: "16px",
            messageLineHeight: "1.5",

            backgroundColor: "#ffa000",
            iconUrl: cautionIcon,

            progressBar: false,
            position: "topRight",
        });
        return; 
    }
    
    if (!selectedRadio) {
        iziToast.show({
            title: "Caution",
            titleColor: "#fff", 
            titleSize: "16px",
            titleLineHeight: "1.5",

            message: `You forgot important data`,
            messageColor: "#fff",
            messageSize: "16px",
            messageLineHeight: "1.5",

            backgroundColor: "#ffa000",
            iconUrl: cautionIcon,

            progressBar: false,
            position: "topRight",
        });
        return;
    }
   
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
            iconUrl: okIcon,

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
            iconUrl: warningIcon,        

            progressBar: false,
            position: "topRight",
         });
    });
    form.reset();
});
