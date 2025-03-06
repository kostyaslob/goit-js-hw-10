const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");
const submitButton = document.querySelector("button");

let formData = {
    email: "",
    message: ""
};

loadFormData()

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", onFormInput);

function onFormSubmit(event) {
    event.preventDefault();
    submitButton.blur();

    const email = input.value.trim();
    const message = textarea.value.trim();

    if (email === "" || message === "") {
        return alert("Fill please all fields");
    }

    console.log(formData)
    
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData = {
        email: "",
        message: "",
    };
}

function onFormInput() {
    formData.email = input.value.trim();
    formData.message = textarea.value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); 
}

function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
        formData = JSON.parse(savedData);
        input.value = formData.email || "";
        textarea.value = formData.message || "";
    }
}
