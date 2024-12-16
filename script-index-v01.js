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
//Tab Function Start
const initializeTabs = (
  tabsSelector,
  tabContentsSelector,
  inputBoxId = null
) => {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabContents = document.querySelectorAll(tabContentsSelector);
  const inputBox = inputBoxId ? document.getElementById(inputBoxId) : null;
  const handleTabClick = (clickedTab) => {
    const tabId = clickedTab.getAttribute("data-tab");
    tabContents.forEach((content) => content.classList.remove("active-cat"));
    tabs.forEach((tab) => tab.classList.remove("active"));
    clickedTab.classList.add("active");
    const activeContent = document.getElementById(tabId);
    activeContent.classList.add("active-cat");
    if (inputBox) {
      inputBox.placeholder = tabId;
    }
  };
  if (inputBox && tabs.length > 0) {
    inputBox.placeholder = tabs[0].getAttribute("data-tab");
  }
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => handleTabClick(tab))
  );
};
initializeTabs("#profile-edit-nav li", ".info-tabs");
initializeTabs("#interest-cat li", ".interest-list", "search-interest");
//Tab Function End
//Snow fall Effect Start
function createSnowflake(container) {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  const randomX = Math.random() * container.clientWidth;
  const randomSize = Math.random() * 10 + 5;
  const randomOpacity = Math.random() * 0.5 + 0.5;
  snowflake.style.left = randomX + "px";
  snowflake.style.width = `${randomSize}px`;
  snowflake.style.height = `${randomSize}px`;
  snowflake.style.opacity = randomOpacity;
  container.appendChild(snowflake);
  return { element: snowflake, speed: Math.random() };
}
function updateSnowflake(snowflake, speed, containerHeight) {
  const currentY = parseFloat(snowflake.style.top) || 0;
  const newY = currentY + speed;

  snowflake.style.top = newY + "px";
  if (newY > containerHeight) {
    snowflake.style.top = "0px";
  }
}
function animateSnowfall(container) {
  const containerHeight = container.clientHeight;
  const snowflakes = [];

  function animate() {
    snowflakes.forEach((snowflake) => {
      updateSnowflake(snowflake.element, snowflake.speed, containerHeight);
    });

    requestAnimationFrame(animate);
  }
  for (let i = 0; i < 5; i++) {
    snowflakes.push(createSnowflake(container));
  }
  animate();
}
document.querySelectorAll(".snowfall-container").forEach((container) => {
  animateSnowfall(container);
});
//Snow Fall Effect End
//Edit Info Function Start
document.querySelectorAll(".info-edit").forEach((button) => {
  button.addEventListener("click", function () {
    const infoItem = this.closest(".info-item");
    const currentDetail = infoItem.querySelector(".info-detail");
    const dataType = currentDetail.getAttribute("data-type");

    let inputElement;

    switch (dataType) {
      case "text":
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = currentDetail.innerText;
        break;

      case "date":
        inputElement = document.createElement("input");
        inputElement.type = "date";
        inputElement.value = currentDetail.innerText;
        break;
      case "number":
        inputElement = document.createElement("input");
        inputElement.type = "number";
        inputElement.value = currentDetail.innerText;
        break;
      case "email":
        inputElement = document.createElement("input");
        inputElement.type = "email";
        inputElement.value = currentDetail.innerText;
        break;
      case "gender":
        inputElement = document.createElement("select");
        const options = ["Male", "Female", "Other"];
        options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option;
          optionElement.text = option;
          inputElement.appendChild(optionElement);
        });
        inputElement.value = currentDetail.innerText;
        break;
      case "marital":
        inputElement = document.createElement("select");
        const options1 = ["Married", "Single", "Other"];
        options1.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option;
          optionElement.text = option;
          inputElement.appendChild(optionElement);
        });
        inputElement.value = currentDetail.innerText;
        break;

      case "textarea":
        inputElement = document.createElement("textarea");
        inputElement.value = currentDetail.innerText;
        break;

      default:
        // Handle other data types as needed
        break;
    }

    const okButton = document.createElement("button");
    okButton.innerText = "UPDATE";

    okButton.addEventListener("click", () => {
      currentDetail.innerText = inputElement.value;
      inputElement.remove();
      okButton.remove();
      editButton.style.display = "inline";
    });

    const editButton = infoItem.querySelector(".info-edit");
    editButton.style.display = "none";

    currentDetail.innerHTML = "";
    currentDetail.appendChild(inputElement);
    currentDetail.appendChild(okButton);
  });
});

//Edit Info Function End

function openPhotoModal() {
  const settingsContainer = document.getElementById("photo-upload-modal");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

function closePhotoModal() {
  const settingsContainer = document.getElementById("photo-upload-modal");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}
function openArticleModal() {
  const settingsContainer = document.getElementById("article-upload-modal");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

function closeArticleModal() {
  const settingsContainer = document.getElementById("article-upload-modal");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

function openYouTubeModal() {
  const settingsContainer = document.getElementById("video-upload-modal");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

function closeYouTubeModal() {
  const settingsContainer = document.getElementById("video-upload-modal");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

// video for youtube url

function resetForm() {
  document.getElementById("uploadVideo").reset();
  clearPreview();
}

function previewVideo() {
  const youtubeUrl = document.getElementById("youtubeurl").value;
  const videoMessage = document.getElementById("messagevideo").value;
  const videoId = extractVideoId(youtubeUrl);
  const vidPrvwComment = document.getElementById("vid-prvw-comment");
  const vidCommentP =
    vidPrvwComment.getElementsByClassName("preview-comment-p")[0];
  const vidCommentDiv =
    vidPrvwComment.getElementsByClassName("dummy-comment")[0];
  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById("video-preview").src = embedUrl;
    document.getElementById("video-preview").style.visibility = "visible";
    vidCommentP.innerHTML = videoMessage;
    vidCommentDiv.style.display = "none";
  } else {
    alert("Invalid YouTube URL. Please provide a valid URL.");
  }
}

function extractVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function clearPreview() {
  const vidPrvwComment = document.getElementById("vid-prvw-comment");
  const vidCommentP =
    vidPrvwComment.getElementsByClassName("preview-comment-p")[0];
  const vidCommentDiv =
    vidPrvwComment.getElementsByClassName("dummy-comment")[0];
  document.getElementById("video-preview").src = "";
  document.getElementById("video-preview").style.visibility = "hidden";
  vidCommentP.innerHTML = "";
  vidCommentDiv.style.display = "block";
}
function loadMoreArticle(e) {
  const articleElement = e.target.parentNode.parentNode;
  if (articleElement.classList.contains("loadMr")) {
    e.target.innerHTML = `see full article
    <span class="material-symbols-outlined ml4 fs18">
      expand_more
    </span>`;
    articleElement.classList.remove("loadMr");
  } else {
    articleElement.classList.add("loadMr");
    e.target.innerHTML = `less article
    <span class="material-symbols-outlined ml4 fs18">
      expand_less
    </span>`;
  }
}
function freezeTagListOn(e) {
  const freezeTagElement =
    e.target.parentNode.parentNode.parentNode.parentNode.querySelector(
      ".freeze-tag-block"
    );
  if (freezeTagElement.classList.contains("freezeListOn")) {
    freezeTagElement.classList.remove("freezeListOn");
  } else {
    freezeTagElement.classList.add("freezeListOn");
  }
}
function freezeclose(e) {
  const freezeTagElement = e.target.parentNode;
  if (freezeTagElement.classList.contains("freezeListOn")) {
    freezeTagElement.classList.remove("freezeListOn");
  }
}

function commentsListOn(e) {
  const freezeTagElement =
    e.target.parentNode.parentNode.parentNode.parentNode.querySelector(
      ".comment-tag"
    );
  if (freezeTagElement.classList.contains("freezeListOn")) {
    freezeTagElement.classList.remove("freezeListOn");
  } else {
    freezeTagElement.classList.add("freezeListOn");
  }
}

function openPopup(typeOfButton) {
  const settingsContainer = document.getElementById("modaopen");
  settingsContainer.classList.add(typeOfButton);
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
}

function closePopup(typeOfButton) {
  const settingsContainer = document.getElementById("modaopen");
  settingsContainer.classList.remove(typeOfButton);
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";

  const allowedClasses = ["photo-deatil-modal", "pr", "jcc", "dn"];
  const currentClasses = settingsContainer.className.split(" ");

  const classesToRemove = currentClasses.filter(function (className) {
    return allowedClasses.indexOf(className) === -1;
  });

  classesToRemove.forEach(function (classNameToRemove) {
    settingsContainer.classList.remove(classNameToRemove);
  });
}
function replyOnComment(e) {
  const replyFormElement =
    e.target.parentNode.parentNode.querySelector(".reply-form");
  console.log("object", replyFormElement);
  if (replyFormElement.classList.contains("reply-form-active")) {
    replyFormElement.classList.remove("reply-form-active");
  } else {
    replyFormElement.classList.add("reply-form-active");
  }
}
function openPopup(e) {
  const settingsContainer = document.getElementById("modaopen1");
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";

  // const imageGrp = settingsContainer.querySelector(".post-pics");
  // const imageSrc = imageGrp.querySelector("img");
  // imageSrc.src = e.target.src;
}
function closePopup1() {
  const settingsContainer = document.getElementById("modaopen1");
  const photoModal = settingsContainer.querySelector(".photo-modal");
  photoModal.className = "photo-modal wrapper bg3 br8 df jcsb pr";
  settingsContainer.style.display =
    settingsContainer.style.display === "flex" ? "none" : "flex";
  const allowedClasses = ["photo-deatil-modal", "pr", "jcc", "dn"];
  const currentClasses = settingsContainer.className.split(" ");

  const classesToRemove = currentClasses.filter(function (className) {
    return allowedClasses.indexOf(className) === -1;
  });

  classesToRemove.forEach(function (classNameToRemove) {
    settingsContainer.classList.remove(classNameToRemove);
  });
}
function freezetag(e, typeOfButton, className) {
  if (e.target.closest(".photo-modal")) {
    e.target.closest(".photo-modal").classList.add(className);
    e.target.closest(".photo-modal").classList.add(`${typeOfButton}`);
  }
}
function freezetagclose(e, typeOfButton, className) {
  if (e.target.closest(".photo-modal")) {
    e.target.closest(".photo-modal").classList.remove(className);
    e.target.closest(".photo-modal").classList.remove(`${typeOfButton}`);
  }
}
function openPopupQuick(actionName, typeAction) {
  openPopup();
  const settingsContainer = document.getElementById("modaopen1");
  settingsContainer.querySelector(".photo-modal").classList.add(actionName);
  settingsContainer.querySelector(".photo-modal").classList.add(typeAction);
}

function displayModal(event) {
  let modal = document.getElementById("breakTheIce");
  let rect = event.target.getBoundingClientRect();

  let top = rect.top + rect.height; // Position below the div
  let left = rect.left;

  // Check if modal goes out of the viewport
  if (left + 340 > window.innerWidth) {
    left = window.innerWidth - 440;
  }

  if (top + 590 > window.innerHeight) {
    top = window.innerHeight - 590;
  }

  modal.style.top = `${top}px`;
  modal.style.left = `${left}px`;
  modal.classList.add("open-break-ice");
  disableBodyScroll();
}
function closeModal() {
  document.getElementById("breakTheIce").classList.remove("open-break-ice");
  enableBodyScroll();
}
function disableBodyScroll() {
  document.body.style.overflow = "hidden";
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}

function enableBodyScroll() {
  document.body.style.removeProperty("overflow");
  if (document.body.style.length === 0) {
    document.body.removeAttribute("style");
  }
  document.body.removeEventListener("touchmove", preventDefault);
}

function preventDefault(e) {
  e.preventDefault();
}

document.addEventListener("DOMContentLoaded", function () {
  // Get reference to the "Delete Interests" button
  var deleteButton = document.querySelector(".delete-int");

  // Get reference to all close buttons
  var closeButtons = document.querySelectorAll(".intrust-close");

  // Add click event listener to the "Delete Interests" button
  deleteButton.addEventListener("click", function () {
    // Loop through all close buttons
    for (var i = 0; i < closeButtons.length; i++) {
      // Toggle display of each close button
      if (
        closeButtons[i].style.display === "none" ||
        closeButtons[i].style.display === ""
      ) {
        closeButtons[i].style.display = "block";
      } else {
        closeButtons[i].style.display = "none";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get reference to the "Add new Interests" button
  var addButton = document.querySelector(".add-int");

  // Get reference to the section to be opened
  var addSection = document.querySelector(".add-intrust-chips-box");

  // Add click event listener to the "Add new Interests" button
  addButton.addEventListener("click", function () {
    // Toggle the display of the section
    if (
      addSection.style.display === "none" ||
      addSection.style.display === ""
    ) {
      addSection.style.display = "block";
    } else {
      addSection.style.display = "none";
    }
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   // Get reference to all skill chip buttons
//   var skillChip = document.querySelectorAll(".skill-chip");

//   // Get reference to the "View All" button
//   var viewAllButton = document.querySelector(".view-int");

//   // Define the number of buttons to show initially
//   var initialButtonCount = 8;

//   // Loop through all skill chip buttons
//   for (var i = 0; i < skillChip.length; i++) {
//     // Hide buttons after initialButtonCount
//     if (i >= initialButtonCount) {
//       skillChip[i].style.display = "none";
//     }
//   }

//   // Add click event listener to the "View All" button
//   viewAllButton.addEventListener("click", function () {
//     // Show all skill chip buttons
//     for (var i = 0; i < skillChip.length; i++) {
//       skillChip[i].style.display = "block";
//     }

//     // Hide the "View All" button after clicking
//     viewAllButton.style.display = "none";
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Get reference to all skill chip buttons
  var skillChip = document.querySelectorAll(".skill-chip");

  // Get reference to the "View All" button
  var viewAllButton = document.querySelector(".view-int");

  // Define the number of buttons to show initially
  var initialButtonCount = 7;

  // Flag to track the current state
  var isViewAll = false;

  // Function to toggle the display of skill chips
  function toggleSkillChips() {
    for (var i = 0; i < skillChip.length; i++) {
      // Toggle the display based on the current state
      skillChip[i].style.display = isViewAll
        ? "block"
        : i >= initialButtonCount
        ? "none"
        : "block";
    }
  }

  // Initial display of skill chips
  toggleSkillChips();

  // Add click event listener to the "View All" button
  viewAllButton.addEventListener("click", function () {
    // Toggle the state
    isViewAll = !isViewAll;

    // Toggle the display of skill chips
    toggleSkillChips();
  });
});
