// Toggle Section Display
function toggleSection(id) {
    const section = document.getElementById(id);
    section.style.display = (section.style.display === 'block') ? 'none' : 'block';
}

// Show Image on Click
const imgBox = document.getElementById('imgBox');
let isImage = true;
imgBox.addEventListener('click', function () {
    if (isImage) {
        imgBox.style.backgroundImage = 'url("images/profile.jpg")';
        isImage = false;
    } else {
        imgBox.style.backgroundImage = 'url("/")';
        isImage = true;
    }
});

// form validation
const myform = document.getElementById('myform');
myform.addEventListener('submit', function (event) {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var emailCheck = email.includes("@") && email.includes(".com");

    var namePop = document.getElementById("namePop")
    var emailPop = document.getElementById("emailPop")
    var msgPop = document.getElementById("msgPop")

    if (name === "" && email === "" && message === "") {
        msgPop.innerText = 'Please fill all the fields!';
        event.preventDefault();

    } else if (name === "") {
        namePop.innerText = 'Please fill Name field!';
        event.preventDefault();

    } else if (email === "") {
        emailPop.innerText = 'Please fill Email field!';
        event.preventDefault();

    } else if (message === "") {
        msgPop.innerText = 'Please fill Message field!';
        event.preventDefault();

    } else if (!emailCheck) {
        emailPop.innerText = 'Please enter a valid email with @ and .com!';
        event.preventDefault();

    } else {
        alert("Thank you " + name + ", we have received your email as " + email);
    };
});