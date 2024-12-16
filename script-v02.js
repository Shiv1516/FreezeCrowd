const validEmails = [
  "sandeep@freezecrowd.com",
  "amit@xio.com",
  "anuj@aajux.com",
];
const deactiveEmails = [
  "amit@freezecrowd.com",
  "sandeep@xio.com",
  "shiv@aajux.com",
];
const regDomains = ["freezecrowd.com", "xio.com", "aajux.com"];
const inputFields = document.querySelectorAll(".input-box input");
const startButton = document.getElementById("startButton");
const startBtn = startButton.querySelector(".start-btn");

inputFields.forEach((inputField) => {
  inputField.addEventListener("focus", () => {
    const parentNode = inputField.parentNode;
    parentNode.classList.add("focus-on");
  });
  inputField.addEventListener("blur", () => {
    const parentNode = inputField.parentNode;
    parentNode.classList.remove("focus-on");
  });

  inputField.addEventListener("input", () => {
    const parentNode = inputField.parentNode;
    const errorMessage = parentNode.querySelector(".errorMessage");
    if (inputField.value.trim() !== "") {
      parentNode.classList.add("focus");
    } else {
      parentNode.classList.remove("focus");
      errorMessage.innerText = "";
    }
  });
});

function checkSchoolEmail() {
  //DOM Declearation
  const emailInput = document.getElementById("schoolemail");
  const passwordInput = document.querySelector(".verfied-pwd");
  const activeateMessage = document.querySelector(".activate-login");
  const errorMessageEmail = document.getElementById("errorMessageEmail");
  //Emails Authentications
  const enteredEmail = emailInput.value.toLowerCase();
  const domain = enteredEmail.split("@")[1];
  //Checking Entering Email
  if (isValidEmail(enteredEmail)) {
    errorMessageEmail.innerText = "";
    emailInput.parentNode.classList.remove("error");
    if (validEmails.includes(enteredEmail)) {
      //Valid, Registered, Active Users
      pwdOn();
      startBtn.innerText = "Login";
    } else if (deactiveEmails.includes(enteredEmail)) {
      //Valid, Registered & Deactive Users
      startBtn.innerText = "Resend Link";
      pwdOff();
      startBtn.classList.add("deactive");
      activeateMessage.style.display = "block";
    } else if (regDomains.includes(domain)) {
      //Valid & Only School Registered Users
      startBtn.innerText = "Sign Up Now!";
      pwdOff();
    } else {
      //Valid & School Not Registered Users
      startBtn.innerText = "Register Your School";
      pwdOff();
    }
  } else {
    //invalid emails
    errorMessageEmail.innerText = "Invalid email format.";
    emailInput.parentNode.classList.add("error");
    pwdOff();
  }
  function pwdOn(errText) {
    passwordInput.style.display = "block";
    activeateMessage.style.display = "none";
    if (startBtn.classList.contains("deactive")) {
      startBtn.classList.remove("deactive");
    }
  }
  function pwdOff(errText) {
    passwordInput.style.display = "none";
    activeateMessage.style.display = "none";
    if (startBtn.classList.contains("deactive")) {
      startBtn.classList.remove("deactive");
    }
  }
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function submitFirstStep() {
  const emailInput = document.getElementById("schoolemail");
  const errorMessageEmail = document.getElementById("errorMessageEmail");
  const startBtnText = startBtn.innerText.toLowerCase();
  const passwordInput = document.querySelector("#logPassword");
  const signupUserForm = document.querySelector("#signup-user");
  const signupDomainForm = document.querySelector("#signup-domain");
  const errorMessagePwd =
    passwordInput.parentNode.querySelector(".errorMessage");
  if (startBtnText == "start journey") {
    emailInput.parentNode.classList.add("error");
    errorMessageEmail.innerText = "Please enter school email.";
  } else if (startBtnText == "login") {
    console.log("password not mached");
    if (passwordInput.value === "admin") {
      passwordInput.parentNode.classList.remove("error");
      window.location.href = "index.html";
      errorMessagePwd.innerText = "";
    } else {
      errorMessagePwd.innerText = "Password not valid";
      passwordInput.parentNode.classList.add("error");
    }
  } else if (startBtnText == "sign up now!") {
    signupUserForm.classList.remove("off-form");
  } else if (startBtnText == "register your school") {
    signupDomainForm.classList.remove("off-form");
  } else {
    emailInput.parentNode.classList.remove("error");
    errorMessageEmail.innerText = "";
  }
}

function resetForm() {
  const emailInput = document.getElementById("schoolemail");
  emailInput.value = "";
}
function submitSignupUserForm(e) {
  const formRegs = document.querySelector(".register-account");
  const fullNameInput = document.getElementById("studentName");
  const phoneNumberInput = document.getElementById("userPhone");
  const dobInput = document.getElementById("userDOB");
  e.preventDefault();
  if (fullNameInput.value.trim() === "") {
    const errMess = fullNameInput.parentNode.querySelector(".errorMessage");
    errMess.innerText = "Enter your full name.";
    return;
  }

  if (!/^\d{10}$/.test(phoneNumberInput.value)) {
    const errMess = phoneNumberInput.parentNode.querySelector(".errorMessage");
    errMess.innerText = "Enter 10-digit phone number.";
    return;
  }

  const currentDate = new Date();
  const selectedDate = new Date(dobInput.value);

  if (selectedDate >= currentDate) {
    const errMess = dobInput.parentNode.querySelector(".errorMessage");
    errMess.innerText = "Enter a valid date of birth.";
    return;
  }
  openSucessform();
}
function openSucessform() {
  document.querySelector(".register-account").style.display = "none";
  document.querySelector(".sucessRegForm").classList.remove("dn");
}
function openSucessDomainform() {
  document.querySelector(".register-domain").style.display = "none";
  document.querySelector(".sucessDomainForm").classList.remove("dn");
}
function submitSignupUserForm(e) {
  e.preventDefault();
  openSucessDomainform();
}
function closeSucessForm() {
  document.querySelector("#signup-user").classList.add("off-form");
  document.querySelector(".sucessRegForm").classList.add("dn");
}
function closeform() {
  document.querySelector("#signup-user").classList.add("off-form");
}
function closeDomainform() {
  document.querySelector("#signup-domain").classList.add("off-form");
}
