const addBtn = document.getElementById("addBtn");
const activityList = document.getElementById("activityList");

addBtn.addEventListener("click", () => {

  const li = document.createElement("li");

  li.textContent = "New activity added at " + new Date().toLocaleTimeString();

  activityList.prepend(li);

});