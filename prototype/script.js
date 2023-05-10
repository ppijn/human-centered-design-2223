// Get the elements
const scrolBovenKnop = document.querySelector(".scrol-boven-knop");
const scrolOnderKnop = document.querySelector(".scrol-onder-knop");
const kopieerKnop = document.querySelector(".kopieer-knop");
const plakKnop = document.querySelector(".plak-knop");
const tekstInput = document.querySelector(".input-text");



// ---- SCROLLING FUNCTIONS ----

let scrollInterval;

scrolBovenKnop.addEventListener("mousedown", function () {
  scrollInterval = setInterval(function () {
    window.scrollBy(0, -50);
  }, 50);
});

scrolBovenKnop.addEventListener("mouseup", function () {
  clearInterval(scrollInterval);
});

scrolOnderKnop.addEventListener("mousedown", function () {
  scrollInterval = setInterval(function () {
    window.scrollBy(0, 50);
  }, 50);
});

scrolOnderKnop.addEventListener("mouseup", function () {
  clearInterval(scrollInterval);
});

// ---- START AND STOP SELECTING FUNCTIONS ---

const text = document.querySelector('.text-area');
const playBtn = document.querySelector('.selecteer-knop');
const stopBtn = document.querySelector('.stop-knop');
let isPlaying = false;
let intervalId = null;
let selectionStart = null;
let selectionEnd = null;

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopPlaying();
  } else {
    selectionStart = text.selectionStart;
    const nextSpace = text.value.indexOf(" ", selectionStart);
    selectionEnd = (nextSpace !== -1) ? nextSpace : text.value.length;
    startPlaying();
  }
});

stopBtn.addEventListener("click", () => {
  stopPlaying();
  saveSelection();
});

function startPlaying() {
  isPlaying = true;
  intervalId = setInterval(() => {
    selectionEnd++;
    const nextSpace = text.value.indexOf(" ", selectionEnd);
    if (nextSpace === -1) {
      stopPlaying();
      return;
    }
    text.setSelectionRange(selectionStart, nextSpace);
  }, 150);
}

function stopPlaying() {
  isPlaying = false;
  clearInterval(intervalId);
  intervalId = null;
}

function saveSelection() {
  const selectedText = text.value.substring(selectionStart, selectionEnd);
  if (selectedText) {
    localStorage.setItem("selectedText", selectedText);
  }
  return selectedText;
}


// ---- COPY ADN PASTE TEXT FUNCTIONS ----

// Add event listeners
kopieerKnop.addEventListener("click", kopieerTekst);
plakKnop.addEventListener("click", plakTekst);

// Function to copy text to localStorage
function kopieerTekst() {
  const selectedText = saveSelection();
  if (selectedText) {
    localStorage.setItem("gekopieerdeTekst", selectedText);
    alert(`"${selectedText}" is gekopieerd!`);
  }
}



// Function to paste text from localStorage
function plakTekst() {
  const gekopieerdeTekst = localStorage.getItem("gekopieerdeTekst");
  if (gekopieerdeTekst) {
    tekstInput.value = gekopieerdeTekst;
    localStorage.removeItem("gekopieerdeTekst"); // clear the key
  } else {
    alert("Er is geen tekst om te plakken!");
  }
}



// ---- VUUUUUR ----

const vulkaanKnop = document.querySelector(".vulkaan-knop");
vulkaanKnop.addEventListener("click", () => {
  const fireEmojis = document.createElement("div");
  fireEmojis.innerHTML = "🔥🔥🔥🔥🔥🔥🔥🔥";
  fireEmojis.style.position = "fixed";
  fireEmojis.style.bottom = "0";
  fireEmojis.style.left = "0";
  fireEmojis.style.fontSize = "60px";
  document.body.appendChild(fireEmojis);

  let pos = -200;
  const fireInterval = setInterval(() => {
    fireEmojis.style.transform = `translate(${pos}px, ${pos}px) rotate(${
      pos / 2
    }deg)`;
    pos += 5;
    if (pos > 100) {
      clearInterval(fireInterval);
      document.body.removeChild(fireEmojis);
    }
  }, 30);
});
