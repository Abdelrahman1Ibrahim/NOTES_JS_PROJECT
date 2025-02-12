let buttonPlus = document.querySelector(".plus"),
  titel = document.querySelector("#title"),
  dic = document.querySelector("#description"),
  date = document.querySelector(".date"),
  puppel = document.querySelector(".puppel"),
  collect = document.querySelector(".collect"),
  addInput = document.querySelector(".addInput"),
  cancel = document.querySelector(".cancel"),
  cardsData = document.querySelector(".cardsData"),
  titelPupper = document.querySelector(".header p"),
  state = "add";
console.log(titelPupper);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

audio = new Audio("./audios_suc.mp3");

let dataLocal = JSON.parse(localStorage.getItem("data")) || [];
// console.log(dataLocal);
console.log(collect);
window.onload = updateCards;
buttonPlus.addEventListener("click", function () {
  puppel.classList.add("appear");
  state = "add";
});
cancel.addEventListener("click", function () {
  puppel.classList.remove("appear");
  titel.value = "";
  dic.value = "";
});
titel.onclick = () => addInput.classList.remove("appear");
dic.onclick = () => addInput.classList.remove("appear");
collect.addEventListener("click", collectData);

/**
 * Handles the collection of data from input fields, creates a data object,
 * and stores it in local storage. Updates the UI accordingly.
 * If the inputs are valid, it adds the data to the local storage and updates the card display.
 * If the inputs are invalid, it shows an error message.
 *
 * @param {Event} e - The event object from a form submission.
 * @fires updateCards
 */
function collectData(e) {
  e.preventDefault();
  // Get the current date and format it as a string
  let getDate = new Date();
  let dateVal = "";
  // If the state is "add", set the title and button text to default values
  if (state == "add") {
    titelPupper.innerHTML = "أضف ملاحظة جديدة";
    collect.innerHTML = "أضف";
    // Format the date as a string
    dateVal = `${
      months[getDate.getMonth()]
    } ${getDate.getDay()} ${getDate.getFullYear()}`;
  } else {
    // If the state is "edit", set the title and button text to default values
    state = "add";
    titelPupper.innerHTML = "أضف ملاحظة جديدة";
    collect.innerHTML = "أضف";
    // Format the date as a string
    dateVal = `تم تعديله في ${
      months[getDate.getMonth()]
    } ${getDate.getDay()} ${getDate.getFullYear()}`;
  }

  // Get the values from the input fields
  let titelVal = titel.value.trim();
  let dicVal = dic.value.trim();

  // Check if the inputs are valid
  if (titelVal && dicVal) {
    // Create a data object and add it to the dataLocal array
    let dataObj = {
      titel: titelVal,
      dic: dicVal,
      date: dateVal
    };
    dataLocal.push(dataObj);
    // console.log(dataLocal);
    // console.log(dataObj);
    // Store the dataLocal array in local storage
    localStorage.setItem("data", JSON.stringify(dataLocal));

    // Hide the puppel and clear the input fields
    puppel.classList.remove("appear");
    addInput.classList.remove("appear");
    titel.value = "";
    dic.value = "";
    audio.play();
    // Update the card display
    updateCards();
  } else {
    // Show an error message if the inputs are invalid
    addInput.classList.add("appear");
  }
}
/**
 * Updates the display of cards based on the data stored in local storage.
 * It loops over the array of data objects and creates a card for each one.
 * Each card displays the title, description, and date, and includes edit and delete buttons.
 * If the data array is empty, it displays nothing.
 */
function updateCards() {
  // Clear the current content of cardsData
  cardsData.innerHTML = "";

  // Retrieve the data from local storage and parse it into an array
  dataLocal = JSON.parse(localStorage.getItem("data")) || [];

  // Loop over the data array to create and display each card
  for (let i = 0; i < dataLocal.length; i++) {
    // Append a new card element to cardsData for each data object
    cardsData.innerHTML += `<div class="card">
                              <p class="title">
                                ${dataLocal[i].titel}
                              </p>
                              <p class="dic">
                                ${dataLocal[i].dic}
                              </p>
                              <div class="info">
                                <span class="date">
                                  ${dataLocal[i].date}
                                </span>
                                <div>
                                  <!-- Button to show more options (edit/delete) -->
                                  <i class="fa-solid fa-ellipsis-vertical" onmouseenter="appearItem(this.nextElementSibling)" ></i>
                                  <div>
                                    <!-- Edit button -->
                                    <li class="Edit" onclick="editEle(${i},this.parentElement)">تعديل</li>
                                    <!-- Delete button -->
                                    <li class="Delete" onclick="deleteEle(${i},this.parentElement)">مسح</li>
                                    <!-- Button to close the options menu -->
                                    <i class="fa-solid fa-xmark can" onclick="clearItem(this.parentElement)"></i>
                                  </div>
                                </div>
                              </div>
                            </div>`;
  }
}

/**
 * Adds the class "appear" to the given element, making it visible.
 * Used to make the edit and delete buttons appear when the user
 * hovers over the vertical ellipsis icon.
 * @param {Element} Ele - The element to add the class to.
 */
function appearItem(Ele) {
  console.log(Ele);
  Ele.classList.add("appear");
}
function clearItem(Ele) {
  //   console.log(Ele);

  Ele.classList.remove("appear");
}
/**
 * Edit the note at the given index in the dataLocal array.
 * Removes the edit and delete buttons, and populates the form
 * with the note's data, and changes the state to "edit".
 * @param {number} idx - The index of the note to edit.
 * @param {Element} Ele - The element that was clicked on.
 */
function editEle(idx, Ele) {
  //   console.log(idx);
  Ele.classList.remove("appear");
  puppel.classList.add("appear");
  dataLocal = JSON.parse(localStorage.getItem("data")) || [];

  let objData = dataLocal[idx];
  //   console.log(titel);

  titel.value = objData.titel;
  dic.value = objData.dic;
  console.log(objData.date);
  date = document.querySelectorAll(".date");
  console.log(date);
  date[idx].innerHTML = objData.date;
  //   console.log(date);

  dataLocal.splice(idx, 1);
  state = "edit";

  titelPupper.innerHTML = `تعديل الملاحظة`;
  collect.innerHTML = "تعديل";
}
function deleteEle(idx, ELe) {
  //   console.log();
  ELe.classList.remove("appear");
  dataLocal = JSON.parse(localStorage.getItem("data")) || [];
  dataLocal.splice(idx, 1);
  localStorage.setItem("data", JSON.stringify(dataLocal));

  updateCards();
}
