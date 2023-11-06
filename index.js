document.addEventListener("DOMContentLoaded", function () {
  const noteNameInput = document.getElementById("noteName");
  const noteInput = document.getElementById("noteInput");
  const saveButton = document.getElementById("saveButton");
  const addNoteButton = document.getElementById("addNoteButton");
  const focusModeButton = document.getElementById("focusModeButton");

  let unsavedChanges = false;

  chrome.storage.sync.get(["noteName", "noteText"], function (result) {
      noteNameInput.value = result.noteName || "";
      noteInput.value = result.noteText || "";
  });

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
  });

  //Random motivational quote generator
  
  fetch('https://api.quotable.io/random?maxLength=100')
  .then(data => data.json())
  .then(quoteData => {
      const quoteText = quoteData.content;
      const quote = document.getElementById('quote')

      quote.innerHTML = quoteText;
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

});
