document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-first");
  const inputFields = document.querySelectorAll(".input-box input");
  const createAccountStart = document.querySelector(".create-account-btn");
  const registerAccountForm = document.querySelector(".register-account");
  const schoolRegisterForm = document.querySelector(".school-registeration");
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

      if (inputField.value.trim() !== "") {
        parentNode.classList.add("focus");
      } else {
        parentNode.classList.remove("focus");
      }
    });
  });

  createAccountStart.addEventListener("click", (event) => {
    let hasError = false;
    form.querySelectorAll("input[required]").forEach((inputField) => {
      const parentNode = inputField.parentNode;
      if (inputField.value.trim() === "") {
        parentNode.classList.add("error");
        hasError = true;
      } else {
        parentNode.classList.remove("error");
        if (inputField.type === "email" && !isValidEmail(inputField.value)) {
          parentNode.classList.add("error");
          hasError = true;
        }
      }
    });
    let emailValue = document.getElementById("schoolemail").value.trim();
    let logPassword = document.getElementById("logPassword").value;
    if (isValidEmail(emailValue)) {
      if (emailValue.endsWith("@freezecrowd.com") && logPassword == "admin") {
        // document.querySelector(".sign-up-2").classList.remove("off-form");
        window.location.href = "index.html";
      }
    } else {
    }
    if (hasError) {
      event.preventDefault();
    }
  });
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
function closeform() {
  document.querySelector(".sign-up-2").classList.add("off-form");
}
function joinNowForm() {
  document.querySelector(".sign-up-2").classList.remove("off-form");
}
