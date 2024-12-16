function userSettings() {
  const settingsContainer = document.getElementById("userSettings");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}
document.addEventListener("click", (event) => {
  const userContainer = document.querySelector(".user-settings");
  const settingsContainer = document.getElementById("userSettings");

  if (
    !userContainer.contains(event.target) &&
    event.target !== settingsContainer
  ) {
    settingsContainer.style.display = "none";
  }
});

function openPopup() {
  const settingsContainer = document.getElementById("modaopen");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

function closePopup() {
  const settingsContainer = document.getElementById("modaopen");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}
function freezetag(e) {
  if (e.target.closest(".photo-modal")) {
    e.target.closest(".photo-modal").classList.add("freeze-tag-on");
  }
}
function freezetagclose(e) {
  if (e.target.closest(".photo-modal")) {
    e.target.closest(".photo-modal").classList.remove("freeze-tag-on");
  }
}

