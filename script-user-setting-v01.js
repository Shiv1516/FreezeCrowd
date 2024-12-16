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
