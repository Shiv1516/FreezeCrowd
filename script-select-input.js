document.addEventListener("DOMContentLoaded", function () {
  let customSelects = document.querySelectorAll(".custom-select");
  customSelects.forEach(function (selectContainer) {
    let select = selectContainer.querySelector(".selected");
    let options = selectContainer.querySelector(".options");
    let hiddenInput = selectContainer.querySelector("input[type='hidden']");
    select.addEventListener("click", function () {
      options.style.display =
        options.style.display === "block" ? "none" : "block";
    });

    options.querySelectorAll("li").forEach(function (option) {
      option.addEventListener("click", function () {
        select.textContent = option.textContent;
        hiddenInput.value = option.textContent;
        options.style.display = "none";
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var photoUploadContainer = document.getElementById("photoUploadContainer");
  var photoDropZone = document.getElementById("photoDropZone");
  var photoInput = document.getElementById("photo");
  var uploadBtn = document.getElementById("uploadBtn");
  var imagePreview = document.getElementById("imagePreview");
  var resetBtn = document.querySelector('button[type="reset"]');
  var customSelects = document.querySelectorAll(".custom-select");
  var totalImages = 0;
  var swiper;

  photoDropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    photoDropZone.classList.add("drag-over");
  });

  photoDropZone.addEventListener("dragleave", function () {
    photoDropZone.classList.remove("drag-over");
  });

  photoDropZone.addEventListener("drop", function (e) {
    e.preventDefault();
    photoDropZone.classList.remove("drag-over");
    var files = e.dataTransfer.files;
    displaySelectedFiles(files);
  });
  photoUploadContainer.addEventListener("click", function (e) {
    if (e.target === photoDropZone || e.target === uploadBtn) {
      photoInput.click();
    }
  });

  photoInput.addEventListener("change", function () {
    var files = photoInput.files;
    displaySelectedFiles(files);
  });

  function displaySelectedFiles(files) {
    imagePreview.innerHTML = "";
    totalImages = files.length;

    if (totalImages > 0) {
      var swiperContainer = document.createElement("div");
      swiperContainer.classList.add("swiper-container");

      var swiperWrapper = document.createElement("div");
      swiperWrapper.classList.add("swiper-wrapper");

      for (var i = 0; i < totalImages; i++) {
        var file = files[i];
        var swiperSlide = document.createElement("div");
        swiperSlide.classList.add("swiper-slide");

        var img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onload = function () {
          URL.revokeObjectURL(this.src);
        };

        swiperSlide.appendChild(img);

        swiperWrapper.appendChild(swiperSlide);
      }

      swiperContainer.appendChild(swiperWrapper);

      imagePreview.appendChild(swiperContainer);

      var swiper = new Swiper(swiperContainer, {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      swiper.on("slideChange", function () {
        updateImageCounter(swiper.realIndex + 1);
      });

      updateImageCounter(1);
    } else {
      var p = document.createElement("p");
      p.textContent = "No preview available";
      imagePreview.appendChild(p);
    }
  }

  function updateImageCounter(currentIndex) {
    var counterText = document.getElementById("imageCounter");
    if (counterText) {
      counterText.textContent = currentIndex + "/" + totalImages;
    }
  }

  var previewBtn = document.getElementById("previewBtn");

  previewBtn.addEventListener("click", function () {
    var formData = new FormData(document.getElementById("photoUpForm"));

    var idAlbum = document.getElementById("idAlbum");
    var idCategory = document.getElementById("idCategory");
    var idTitle = document.getElementById("title");
    var data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });
    console.log("object", data);
    idAlbum.innerHTML = data["selected-option-1"];
    idCategory.innerHTML = data["selected-option-2"];
    idTitle.innerHTML = data["title"];
  });

  resetBtn.addEventListener("click", function () {
    document.getElementById("photoUpForm").reset();
    imagePreview.innerHTML =
      '<p class="npv-text box-center">No Photo available...</p>';
    idAlbum.innerHTML = "select album";
    idCategory.innerHTML = "select category";
    idTitle.innerHTML = "title goes here...";
    customSelects.forEach(function (select) {
      var selectedOption = select.querySelector(".selected");
      var hiddenInput = select.querySelector('input[type="hidden"]');
      selectedOption.textContent = "Choose an option";
      hiddenInput.value = "";
    });

    updateImageCounter(0);

    if (swiper) {
      swiper.destroy();
    }
    const prvArea = document.querySelector(".photo-preview-area");
    if (prvArea.classList.contains("prv-on")) {
      prvArea.classList.remove("prv-on");
    }
  });
});

var previewBtn = document.getElementById("previewBtn");
previewBtn.addEventListener("click", function () {
  var postBtn = document.getElementById("postBtn");
  if (postBtn) {
    postBtn.disabled = false;
  }
  const prvArea = document.querySelector(".photo-preview-area");
  if (prvArea.classList.contains("prv-on")) {
    prvArea.classList.remove("prv-on");
  } else {
    prvArea.classList.add("prv-on");
  }
});

var postBtn = document.getElementById("postBtn");
var totalImages = 0;
postBtn.addEventListener("click", function () {
  document.getElementById("postedData").style.display = "block";
  var formData = new FormData(document.getElementById("photoUpForm"));
  var data = {};
  var files = document.getElementById("photo").files;
  formData.forEach(function (value, key) {
    data[key] = value;
  });
  totalImages = files.length;

  var postData = "";
  var idAlbum = document.getElementById("postNewAlbum");
  var idCategory = document.getElementById("postNewCat");
  var idPics = document.getElementById("postNewPics");

  var idTitle = document.getElementById("postNewTitle");

  idAlbum.innerHTML = data["selected-option-1"];
  idCategory.innerHTML = data["selected-option-2"];

  idTitle.innerHTML = data["title"];

  if (totalImages > 0) {
    for (var i = 0; i < totalImages; i++) {
      var file = files[i];

      postData += '<img src="' + URL.createObjectURL(file) + '" alt="Preview">';
    }
  }

  idPics.innerHTML = postData;
});

function toggleText(element) {
  var addButton = element.querySelector(".addButton");
  if (addButton.textContent === "Add") {
    addButton.textContent = "Requested";
    addButton.classList.add("requested");
  } else {
    addButton.textContent = "Add";
    addButton.classList.remove("requested");
  }
}

var toMeContent = document.getElementById("toMeContent");
var byMeContent = document.getElementById("byMeContent");

function showContent(option) {
  if (option === "toMe") {
    toMeContent.style.display = "block";
    byMeContent.style.display = "none";
  } else if (option === "byMe") {
    byMeContent.style.display = "block";
    toMeContent.style.display = "none";
  }
}

const addSmiley = document.querySelector(".add-smiley");
const crushProfile = document.querySelector(".crush-profile");
const puzzleGame = document.querySelector(".puzzle-game");
const arrowIcon = document.querySelector(".trangle-icon");
const QNA = document.querySelector(".q-n-a");
const sendFutureMessage = document.querySelector(".send-future-message");
const sendVMessage = document.querySelector(".send-v-message");

// Function to rotate the arrow-icon
function rotateArrow(deg) {
  arrowIcon.style.transform = `rotate(${deg}deg)`;
}

// Event listeners for hover effects
addSmiley.addEventListener("mouseenter", () => {
  rotateArrow(90); // Rotate 90 degrees when hovering over add-smiley
});

crushProfile.addEventListener("mouseenter", () => {
  rotateArrow(75); // Rotate 75 degrees when hovering over crush-profile
});
puzzleGame.addEventListener("mouseenter", () => {
  rotateArrow(45); // Rotate 75 degrees when hovering over crush-profile
});
sendVMessage.addEventListener("mouseenter", () => {
  rotateArrow(0); // Rotate 75 degrees when hovering over crush-profile
});
QNA.addEventListener("mouseenter", () => {
  rotateArrow(-50); // Rotate 75 degrees when hovering over crush-profile
});
sendFutureMessage.addEventListener("mouseenter", () => {
  rotateArrow(-90); // Rotate 75 degrees when hovering over crush-profile
});

// Reset rotation on mouseleave
addSmiley.addEventListener("mouseleave", () => {
  rotateArrow(0); // Reset rotation when mouse leaves add-smiley
});

crushProfile.addEventListener("mouseleave", () => {
  rotateArrow(0); // Reset rotation when mouse leaves crush-profile
});
puzzleGame.addEventListener("mouseleave", () => {
  rotateArrow(0); // Reset rotation when mouse leaves crush-profile
});
QNA.addEventListener("mouseleave", () => {
  rotateArrow(0); // Reset rotation when mouse leaves crush-profile
});
sendVMessage.addEventListener("mouseleave", () => {
  rotateArrow(0); // Reset rotation when mouse leaves crush-profile
});
sendFutureMessage.addEventListener("mouseleave", () => {
  rotateArrow(0); // Reset rotation when mouse leaves crush-profile
});

const optionIcons = document.querySelectorAll(".option-icon");

// Add event listener to each option-icon
optionIcons.forEach(function (optionIcon) {
  optionIcon.addEventListener("click", function () {
    // Get the corresponding popup based on data-popup attribute
    const popupId = optionIcon.getAttribute("data-popup");
    const popup = document.getElementById(popupId);

    // Toggle the display of the popup
    if (popup.style.display === "none" || !popup.style.display) {
      popup.style.display = "block";
    } else {
      popup.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var sendFutureMessage = document.getElementById("sendFutureMessage");
  var formMessage = document.getElementById("formMessage");
  var closeModal = document.getElementById("closeModal");

  sendFutureMessage.addEventListener("click", function () {
    formMessage.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    formMessage.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the reset button element
  var resetButton = document.getElementById("resetButton");

  // Add an event listener to the reset button
  resetButton.addEventListener("click", function () {
    // Get all form input elements within the form-modal
    var formInputs = document.querySelectorAll(
      "#formMessage input, #formMessage textarea"
    );

    // Iterate over each input element and reset its value
    formInputs.forEach(function (input) {
      input.value = ""; // Set input value to empty string
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var sendQUAMessage = document.getElementById("sendQUAMessage");
  var qna = document.getElementById("qna");
  var closeModal = document.getElementById("closeModal1");

  sendQUAMessage.addEventListener("click", function () {
    qna.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    qna.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sendQUAMessage = document.getElementById("crushProfile");
  var qna = document.getElementById("cpm");
  var closeModal = document.getElementById("closeModal2");

  sendQUAMessage.addEventListener("click", function () {
    qna.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    qna.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sendsmilyMessage = document.getElementById("addSmiley");
  var smily = document.getElementById("smily");
  var closeModal = document.getElementById("closeModal3");

  sendsmilyMessage.addEventListener("click", function () {
    smily.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    smily.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sendsmilyMessage = document.getElementById("PuzzleGame");
  var smily = document.getElementById("puzzel");
  var closeModal = document.getElementById("closeModal4");

  sendsmilyMessage.addEventListener("click", function () {
    smily.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    smily.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sendsmilyMessage = document.getElementById("SendVideoMessage");
  var smily = document.getElementById("video-upload-modals");
  var closeModal = document.getElementById("closeModal5");

  sendsmilyMessage.addEventListener("click", function () {
    smily.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    smily.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sendsmilyMessage = document.getElementById("AskQuestion");
  var smily = document.getElementById("askque");
  var closeModal = document.getElementById("closeModalx");

  sendsmilyMessage.addEventListener("click", function () {
    smily.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    smily.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var sendsmilyMessage = document.getElementById("sendQuestionMessage");
  var smily = document.getElementById("sendquesans");
  var closeModal = document.getElementById("closeModal7");

  sendsmilyMessage.addEventListener("click", function () {
    smily.style.display = "flex";
  });

  closeModal.addEventListener("click", function () {
    smily.style.display = "none";
  });
});

function closePopup() {
  var profilePopup = document.getElementById("profilePopup");
  profilePopup.style.display = "none";
}

function bindCloseButton(modalId) {
  var closeButton = document.querySelector(modalId + " .form-submit");

  closeButton.addEventListener("click", function () {
    var modal = document.querySelector(modalId);
    modal.style.display = "none";
  });
}

bindCloseButton("#cpm");
bindCloseButton("#smily");
bindCloseButton("#puzzel");

document.addEventListener("DOMContentLoaded", function () {
  const respondBtn = document.getElementById("respond-btn");
  const responceMessage = document.querySelector(".responce-message");

  respondBtn.addEventListener("click", function () {
    responceMessage.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var ignored = false;

  function toggleIgnore(button) {
    if (ignored) {
      button.textContent = "Ignore";
      button.style.color = "#000"; // Default color
    } else {
      button.textContent = "Ignored";
      button.style.color = "#888"; // New color when ignored
    }
    ignored = !ignored; // Toggle the ignored state
  }

  // First set of buttons and response messages
  var respondButton = document.getElementById("respond-btn");
  var respondLaterButton = document.getElementById("respond-later-btn");
  var responseMessage = document.querySelector(".responce-message");
  var responseLaterMessage = document.querySelector(".responce-later-message");

  respondButton.addEventListener("click", function () {
    if (responseLaterMessage.style.display === "block") {
      responseLaterMessage.style.display = "none";
    }
    responseMessage.style.display =
      responseMessage.style.display === "none" ? "block" : "none";
  });

  respondLaterButton.addEventListener("click", function () {
    if (responseMessage.style.display === "block") {
      responseMessage.style.display = "none";
    }
    responseLaterMessage.style.display =
      responseLaterMessage.style.display === "none" ? "block" : "none";
  });

  var ignoreButton = document.getElementById("ignore-btn");
  ignoreButton.addEventListener("click", function () {
    toggleIgnore(this);
  });

  // Second set of buttons and response messages
  var respondButton1 = document.getElementById("respond-btn1");
  var respondLaterButton1 = document.getElementById("respond-later-btn1");
  var responseMessage1 = document.querySelector(".responce-message1");
  var responseLaterMessage1 = document.querySelector(
    ".responce-later-message1"
  );

  respondButton1.addEventListener("click", function () {
    if (responseLaterMessage1.style.display === "block") {
      responseLaterMessage1.style.display = "none";
    }
    responseMessage1.style.display =
      responseMessage1.style.display === "none" ? "block" : "none";
  });

  respondLaterButton1.addEventListener("click", function () {
    if (responseMessage1.style.display === "block") {
      responseMessage1.style.display = "none";
    }
    responseLaterMessage1.style.display =
      responseLaterMessage1.style.display === "none" ? "block" : "none";
  });

  var ignoreButton1 = document.getElementById("ignore-btn1");
  ignoreButton1.addEventListener("click", function () {
    toggleIgnore(this);
  });

  // Third set of buttons and response messages
  var respondButton2 = document.getElementById("respond-btn2");
  var respondLaterButton2 = document.getElementById("respond-later-btn2");
  var responseMessage2 = document.querySelector(".responce-message2");
  var responseLaterMessage2 = document.querySelector(
    ".responce-later-message2"
  );

  respondButton2.addEventListener("click", function () {
    if (responseLaterMessage2.style.display === "block") {
      responseLaterMessage2.style.display = "none";
    }
    responseMessage2.style.display =
      responseMessage2.style.display === "none" ? "block" : "none";
  });

  respondLaterButton2.addEventListener("click", function () {
    if (responseMessage2.style.display === "block") {
      responseMessage2.style.display = "none";
    }
    responseLaterMessage2.style.display =
      responseLaterMessage2.style.display === "none" ? "block" : "none";
  });

  var ignoreButton2 = document.getElementById("ignore-btn2");
  ignoreButton2.addEventListener("click", function () {
    toggleIgnore(this);
  });
});
