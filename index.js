document.addEventListener("DOMContentLoaded", function () {
    const noteNameInput = document.getElementById("noteName");
    const noteInput = document.getElementById("noteInput");
    const saveButton = document.getElementById("saveButton");
    chrome.storage.sync.get(["noteName", "noteText"], function (result) {
        noteNameInput.value = result.noteName || "";
        noteInput.value = result.noteText || "";
      });
  
    // Flag
    let unsavedChanges = false;
  
    // Check for changes
    noteNameInput.addEventListener("input", function () {
      unsavedChanges = true;
    });
  
    noteInput.addEventListener("input", function () {
      unsavedChanges = true;
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
      a.setAttribute("download", `${noteName}.txt`); // Set the 'download' attribute
      a.click();
  
      URL.revokeObjectURL(url);
    });
  
    window.addEventListener("beforeunload", function (e) {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    });
    
  });
  