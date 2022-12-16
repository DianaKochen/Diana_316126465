//calculation for the points in the enter detail page
function calculate() {
    let points = 0;
    const genderElem = document.getElementById("Gender");
    const statusElem = document.getElementById("status");
    const numOfKidsElem = document.getElementById("NumOfKids");
    const incomeElem = document.getElementById("Income");

    if (!numOfKidsElem.value) {
        alert('חובה להזין מספר ילדים');
        return;
    }
    else if (numOfKidsElem.value > 12) {
        alert('מספר ילדים שהוזן אינו תקין');
        return;
    }

    if (!incomeElem.value || incomeElem.value == 0 || incomeElem.value > 1_000_000) {
        alert('גובה הכנסה אינו תקין');
        return;
    }

    if (genderElem.value === "female") {
        points += 2.5;
    } else {
        points += 1.5;
    }

    if (statusElem.value === "married") {
        points += 2;
    }

    points += +numOfKidsElem.value;

    document.getElementById("Total").value = points;

    sessionStorage.setItem("income", incomeElem.value);

    sessionStorage.setItem('points', points);
}

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
        key = event.clipboardData.getData("text/plain");
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function sendReview() {
    const nameElem = document.querySelector("#ContactForm #Name");
    const phoneElem = document.querySelector("#ContactForm #PhoneNumber");
    const emailElem = document.querySelector("#ContactForm #EmailAdress");
    const reviewElem = document.querySelector("#ContactForm #Review");

    // NAME VALIDATION //
    nameElem.classList.remove("input-valid");
    if (nameElem.value) {
        if (!onlyLettersValidator(nameElem.value)) {
            alert("שם מלא לא תקין");
            nameElem.classList.add("input-error");
            return;
        }
    } else {
        alert("שם מלא הוא שדה חובה");
        nameElem.classList.add("input-error");
        return;
    }
    // name is valid
    nameElem.classList.remove("input-error");
    nameElem.classList.add("input-valid");

    // PHONE VALIDATION //
    phoneElem.classList.remove("input-valid");
    if (phoneElem.value) {
        if (!phoneInputValidator(phoneElem.value)) {
            alert("מספר טלפון לא תקין");
            phoneElem.classList.add("input-error");
            return;
        }
    } else {
        alert("מספר טלפון הוא שדה חובה");
        phoneElem.classList.add("input-error");
        return;
    }
    // phone is valid
    phoneElem.classList.remove("input-error");
    phoneElem.classList.add("input-valid");

    // EMAIL VALIDATION //
    emailElem.classList.remove("input-valid");
    if (emailElem.value) {
        if (!emailValidator(emailElem.value)) {
            alert("אימייל לא תקין");
            emailElem.classList.add("input-error");
            return;
        }
    } else {
        alert("אימייל הוא שדה חובה");
        emailElem.classList.add("input-error");
        return;
    }
    // email is valid
    emailElem.classList.remove("input-error");
    emailElem.classList.add("input-valid");

    // REVIEW VALIDATION //
    reviewElem.classList.remove("input-valid");
    if (!reviewElem.value) {
        alert("חובה להזין משוב");
        reviewElem.classList.add("input-error");
        return;
    }
    // review is valid
    reviewElem.classList.remove("input-error");
    reviewElem.classList.add("input-valid");

    alert('הטופס נשלח בהצלחה');
}

function onlyLettersValidator(str) {
    return /^[a-zA-Zא-ת ]+$/.test(str);
}

function phoneInputValidator(phone) {
    return /[0-9]|\./.test(phone);
}

function emailValidator(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}