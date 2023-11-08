document.addEventListener("DOMContentLoaded", function () {
  const noteNameInput = document.getElementById("noteName");
  const noteInput = document.getElementById("noteInput");
  const saveButton = document.getElementById("saveButton");
  const addNoteButton = document.getElementById("addNoteButton");
  const focusModeButton = document.getElementById("focusModeButton");
  const shareButton = document.getElementById("shareButton");
  const zin= document.getElementById("zoom-in");
  const zout= document.getElementById("zoom-out");

   // save notes to local storage
   
   if (localStorage.getItem('noteName')) {
    noteNameInput.value = localStorage.getItem('noteName');
  }

  if (localStorage.getItem('noteText')) {
    noteInput.value = localStorage.getItem('noteText');
  }

  saveButton.addEventListener("click", function () {
      unsavedChanges = false;
      const noteName = noteNameInput.value || "Untitled";
      const noteText = noteInput.value;
      const combinedText = `Note Name: ${noteName}\n\n${noteText}`;
      const blob = new Blob([combinedText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", `${noteName}.txt`);
      a.click();

      URL.revokeObjectURL(url);
      localStorage.setItem('noteName', noteName);
      localStorage.setItem('noteText', noteText);
  });


  //Random motivational quote generator
  
  fetch('https://api.quotable.io/random?maxLength=100')
  .then(data => data.json())
  .then(quoteData => {
      const quoteText = quoteData.content;
      const quote = document.getElementById('quote')

      quote.innerHTML = quoteText;
      setTimeout(() => {
            quote.remove();
        }, 10000);
  })
  addNoteButton.addEventListener("click", function () {
      // Get the values from the input fields
      const noteName = noteNameInput.value || "Untitled";
      const noteText = noteInput.value;
      // Save the note to storage later
      
      // Clear the input fields
      noteNameInput.value = "";
      noteInput.value = "";
  });

  focusModeButton.addEventListener("click", function () {
    const popupContainer = document.querySelector(".popup-container");

    if (focusModeButton.textContent === "Enable Focus Mode") {
        focusModeButton.textContent = "Disable Focus Mode";
        popupContainer.classList.add("focus-mode"); // Add the focus-mode class
    } else {
        focusModeButton.textContent = "Enable Focus Mode";
        popupContainer.classList.remove("focus-mode"); // Remove the focus-mode class
    }
});

//Share the notes
shareButton.addEventListener("click", function () {
    const noteName = noteNameInput.value || "Untitled";
    const noteText = noteInput.value;
    const combinedText = `Note Name: ${noteName}\n\n${noteText}`;
  
    if (navigator.share) {
      navigator.share({
        title: noteName,
        text: combinedText,
      })
      .then(() => console.log('Sharing successful'))
      .catch(console.error);
    } else {
      // Fallback to copying the note text to clipboard
      navigator.clipboard.writeText(combinedText);
      alert('Note copied to clipboard.');
    }
  });
  //Zoom in and out
    zin.addEventListener("click", function () {
        document.body.style.zoom = "125%";
    });
    zout.addEventListener("click", function () {
        document.body.style.zoom = "100%";
    });

    //Drag search
    let selectedText = "";
let dragStartX = 0;
let isDragging = false;

document.addEventListener("mouseup", function () {
  selectedText = window.getSelection().toString().trim();
});

document.addEventListener("mousedown", function (e) {
  dragStartX = e.clientX;
  isDragging = false;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    return; 
  }

  const dragThreshold = 100; 

  if (selectedText && Math.abs(e.clientX - dragStartX) >= dragThreshold) {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selectedText)}`;
    window.open(searchUrl, "_blank");
    isDragging = true; 
  }
});


  
});