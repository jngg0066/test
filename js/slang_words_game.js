//Initial References
let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container_slang");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");
const data = [
  "breakfast",
  "cup-of-tea-or-coffee",
  "chicken",
  "sandwich",
  "Biscuit or cookie",
  "McDonalds",
  "Sunglasses"
 
];

let deviceType = "";
let initialX = 0,
  initialY = 0;
let currentElement = "";
let moveElement = false;

//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create Touch Event (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

let count = 0;

//Random value from Array
const randomValueGenerator = () => {
  return data[Math.floor(Math.random() * data.length)];
};

//Win Game Display
const stopGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
  result.innerText = `You Won!`; 
};

//Drag & Drop Functions
function dragStart(e) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    //Start movement for touch
    moveElement = true;
    currentElement = e.target;
  } else {
    //For non touch devices set data to be transfered
    e.dataTransfer.setData("text", e.target.id);
  }
}

//Events fired on the drop target
function dragOver(e) {
  e.preventDefault();
}

//For touchscreen movement
const touchMove = (e) => {
  if (moveElement) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let currentSelectedElement = document.getElementById(e.target.id);
    currentSelectedElement.parentElement.style.top =
      currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
    currentSelectedElement.parentElement.style.left =
      currentSelectedElement.parentElement.offsetLeft -
      (initialX - newX) +
      "px";
    initialX = newX;
    initialY - newY;
  }
};

const drop = (e) => {
  e.preventDefault();
  const id = isTouchDevice() ? currentElement.id : e.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const droppableElementData = e.target.getAttribute("data-id") || e.target.closest('.countries').getAttribute("data-id");

  if (id === droppableElementData) {
    const imagePath = `img/${id}.png`;
    const newImage = new Image();
    newImage.src = imagePath;
    newImage.alt = id;
    newImage.style.width = "100%";
    newImage.classList.add('dropped-img'); // Add a class for the dropped image

    const dropZone = e.target.classList.contains('countries') ? e.target : e.target.closest('.countries');
    dropZone.innerHTML = ''; 
    dropZone.appendChild(newImage);
    dropZone.classList.add("dropped");

    draggableElement.classList.add("hide");
    draggableElement.setAttribute("draggable", "false");
    count += 1;

    // If all draggable items have been placed
    if (count === draggableObjects.length) { 
      stopGame(); // Call the stopGame function to show results
    }
  }
};


//Creates flags and countries
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  let randomData = [];
  //for string random values in array
  for (let i = 1; i <= 3; i++) {
    let randomValue = randomValueGenerator();
    if (!randomData.includes(randomValue)) {
      randomData.push(randomValue);
    } else {
      //If value already exists then decrement i by 1
      i -= 1;
    }
  }
  for (let i of randomData) {
    const flagDiv = document.createElement("div");
    flagDiv.classList.add("draggable-image");
    flagDiv.setAttribute("draggable", true);
    if (isTouchDevice()) {
      flagDiv.style.position = "absolute";
    }
    flagDiv.innerHTML = `<img src="img/${i}.png" id="${i}" alt="${i}">`;

    dragContainer.appendChild(flagDiv);
  }
  //Sort the array randomly before creating country divs
  randomData = randomData.sort(() => 0.5 - Math.random());
  for (let i of randomData) {
    const countryDiv = document.createElement("div");
    countryDiv.innerHTML = `<div class='countries' data-id='${i}'>
    ${i.charAt(0).toUpperCase() + i.slice(1).replace("-", " ")}
    </div>
    `;
    dropContainer.appendChild(countryDiv);
  }
};

//Start Game
startButton.addEventListener(
  "click",
  (startGame = async () => {
    currentElement = "";
    controls.classList.add("hide");
    startButton.classList.add("hide");
    //This will wait for creator to create the images and then move forward
    await creator();
    count = 0;
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");

    //Events
    draggableObjects.forEach((element) => {
      element.addEventListener("dragstart", dragStart);
      //for touch screen
      element.addEventListener("touchstart", dragStart);
      element.addEventListener("touchend", drop);
      element.addEventListener("touchmove", touchMove);
    });
    dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
    });
  })
);